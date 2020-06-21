using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer.Data;
using IdentityServer.DTO.Request;
using IdentityServer.DTO.Response;
using IdentityServer.Infrastructure;
using IdentityServer.Infrastructure.Constant;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static IdentityServer4.IdentityServerConstants;

namespace IdentityServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(LocalApi.PolicyName)]
    public class CustomersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IMapper _mapper;

        public CustomersController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = Roles.Manager)]
        public async Task<ActionResult> GetCustomersAsync([FromQuery] Pagination pagination, [FromQuery] SearchUser search)
        {
            var customers = await _userManager.GetUsersInRoleAsync(Roles.Customer);

            var queryableCustomers = customers.AsQueryable();

            // Search by Email:
            if (search.Email != "")
            {
                queryableCustomers = queryableCustomers.Where(a =>
                    a.Email.ToLower().Contains(search.Email.ToLower()));
            }

            // Sort Asc:
            if (search.sortAsc.ToLower() == "email")
            {
                queryableCustomers = queryableCustomers.OrderBy(a => a.Email);
            }

            // Sort Desc:
            // sort by any input field: 
            // a => a.GetType().GetProperty(search.sortDesc).GetValue(a) !!not work
            if (search.sortDesc.ToLower() != "email")
            {
                queryableCustomers = queryableCustomers.OrderByDescending(a => a.Email);
            }

            var result = queryableCustomers.ToList();

            var paginatedList = PaginatedList<IdentityUser>.Create(
                result,
                pagination.current,
                pagination.pageSize
            );

            // Mapping data
            IList<CustomerResponseDTO> response = new List<CustomerResponseDTO>();
            for (int i = 0; i < paginatedList.Data.Count(); i++)
            {
                IdentityUser item = (IdentityUser)paginatedList.Data.ElementAt(i);
                var claims = await _userManager.GetClaimsAsync(item);
                var mapped = _mapper.Map<IdentityUser, CustomerResponseDTO>(
                    source: item,
                    opts: opt => opt.Items["claims"] = claims
                );
                response.Add(mapped);
            }

            return Ok(PaginatedList<object>.ApplyWithSource(response, paginatedList));
        }


        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCustomerById(string id)
        {
            //Todo create customer service only get customer
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var claims = await _userManager.GetClaimsAsync(user); //loi ko lay dc claim
                var response = _mapper.Map<IdentityUser, CustomerResponseDTO>(
                    source: user,
                    opts: opt => opt.Items["claims"] = claims
                );

                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateCustomer([FromForm] CustomerRegisterDTO customerRegisterDTO)
        {
            var u = await _userManager.FindByEmailAsync(customerRegisterDTO.Email);

            if (u != null)
            {
                return BadRequest(new { Email = "This Email already exist" });
            }

            var user = new IdentityUser
            {
                UserName = customerRegisterDTO.Email,
                Email = customerRegisterDTO.Email,
                PhoneNumber = customerRegisterDTO.PhoneNumber
            };

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, customerRegisterDTO.Name),
            };

            // Add no required claim if exist
            if (!string.IsNullOrEmpty(customerRegisterDTO.Address))
            {
                claims.Add(new Claim(ClaimTypes.StreetAddress, customerRegisterDTO.Address));
            }
            if (!string.IsNullOrEmpty(customerRegisterDTO.Gender))
            {
                claims.Add(new Claim(ClaimTypes.Gender, customerRegisterDTO.Gender));
            }

            await _userManager.CreateAsync(user, customerRegisterDTO.Password);
            await _userManager.AddToRoleAsync(user, Roles.Customer);
            await _userManager.AddClaimsAsync(user, claims);

            return CreatedAtAction(nameof(GetCustomerById), new { id = user.Id }, null);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateCustomer(string id, [FromForm] SaveCustomerDTO saveCustomerDTO) {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null) {
                return BadRequest("Invalid User");
            }
            var userClaims = await _userManager.GetClaimsAsync(user);
            if (!string.IsNullOrEmpty(saveCustomerDTO.PhoneNumber)) {
                user.PhoneNumber = saveCustomerDTO.PhoneNumber;
            }
            if (!string.IsNullOrEmpty(saveCustomerDTO.Password)) {
                await _userManager.ChangePasswordAsync(user, saveCustomerDTO.CurrentPassword, saveCustomerDTO.Password);
            }
            if (!string.IsNullOrEmpty(saveCustomerDTO.Name)) {
                // check for existing claim and remove it
                var name = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.Name);
                if (name != null) {
                    await _userManager.RemoveClaimAsync(user, name);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Name, saveCustomerDTO.Name));
            }
            if (!string.IsNullOrEmpty(saveCustomerDTO.Address)) {
                // check for existing claim and remove it
                var address = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.StreetAddress);
                if (address != null) {
                    await _userManager.RemoveClaimAsync(user, address);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.StreetAddress, saveCustomerDTO.Address));
            }
            if (!string.IsNullOrEmpty(saveCustomerDTO.Gender)) {
                // check for existing claim and remove it
                var gender = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.Gender);
                if (gender != null) {
                    await _userManager.RemoveClaimAsync(user, gender);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Gender, saveCustomerDTO.Gender));
            }
            await _userManager.UpdateAsync(user);
            return Ok();
        }
    }
}