using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer.DTO.Request;
using IdentityServer.DTO.Response;
using IdentityServer.Infrastructure;
using IdentityServer.Infrastructure.Constant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static IdentityServer4.IdentityServerConstants;

namespace IdentityServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(LocalApi.PolicyName)]
    public class StaffsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IMapper _mapper;

        public StaffsController(
            UserManager<IdentityUser> userManager,
            IMapper mapper,
            SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<ActionResult> GetStaffsAsync([FromQuery] Pagination pagination, [FromQuery] SearchUser search)
        {
            List<IdentityUser> staffs = new List<IdentityUser>();

            if (User.IsInRole(Roles.Seller))
            {
                var staffShipper = await _userManager.GetUsersInRoleAsync(Roles.Shipper);
                staffs.AddRange(staffShipper);
            }
            else
            {
                List<IdentityUser> staffSeller = (List<IdentityUser>)await _userManager.GetUsersInRoleAsync(Roles.Seller);
                List<IdentityUser> staffShipper = (List<IdentityUser>)await _userManager.GetUsersInRoleAsync(Roles.Shipper);
                List<IdentityUser> manager = (List<IdentityUser>)await _userManager.GetUsersInRoleAsync(Roles.Manager);
                staffs.AddRange(staffShipper);
                staffs.AddRange(staffSeller);
                staffs.AddRange(manager);
            }

            var queryableStaffs = staffs.AsQueryable();

            // Search by Email:
            if (search.Email != "")
            {
                queryableStaffs = queryableStaffs.Where(a =>
                    a.Email.ToLower().Contains(search.Email.ToLower()));
            }

            // Sort Asc:
            if (search.sortAsc.ToLower() == "email")
            {
                queryableStaffs = queryableStaffs.OrderBy(a => a.Email);
            }

            // Sort Desc:
            // sort by any input field: 
            // a => a.GetType().GetProperty(search.sortDesc).GetValue(a) !!not work
            if (search.sortDesc.ToLower() != "email")
            {
                queryableStaffs = queryableStaffs.OrderByDescending(a => a.Email);
            }

            var result = queryableStaffs.ToList();

            var paginatedList = PaginatedList<IdentityUser>.Create(
                result,
                pagination.current,
                pagination.pageSize
            );

            // Mapping data
            IList<StaffResponseDTO> response = new List<StaffResponseDTO>();
            for (int i = 0; i < paginatedList.Data.Count(); i++)
            {
                IdentityUser item = (IdentityUser)paginatedList.Data.ElementAt(i);
                var claims = await _userManager.GetClaimsAsync(item);
                var roles = await _userManager.GetRolesAsync(item);
                var mapped = _mapper.Map<IdentityUser, StaffResponseDTO>(
                    source: item,
                    opts: opt =>
                    {
                        opt.Items["claims"] = claims;
                        opt.Items["roles"] = roles;
                    }
                );
                response.Add(mapped);
            }

            return Ok(PaginatedList<object>.ApplyWithSource(response, paginatedList));
        }



        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStaffById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var claims = await _userManager.GetClaimsAsync(user);
                var roles = await _userManager.GetRolesAsync(user);
                var response = _mapper.Map<IdentityUser, StaffResponseDTO>(
                    source: user,
                    opts: opt =>
                    {
                        opt.Items["claims"] = claims;
                        opt.Items["roles"] = roles;
                    }
                );
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpPost]
        [Authorize(Roles = Roles.Manager)]
        public async Task<IActionResult> CreateStaff([FromForm] CreateStaffDTO createStaffDTO)
        {
            var duplicatedUser = await _userManager.FindByEmailAsync(createStaffDTO.Email);

            if (duplicatedUser != null)
            {
                return BadRequest(new { Email = "This Email already exist" });
            }

            var user = new IdentityUser
            {
                UserName = createStaffDTO.Email,
                Email = createStaffDTO.Email,
                PhoneNumber = createStaffDTO.PhoneNumber,
            };

            var defaultPassword = "eshop123456";
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.DateOfBirth, createStaffDTO.Birthday),
                new Claim(ClaimTypes.Name, createStaffDTO.Name),
                new Claim(ClaimTypes.NameIdentifier, createStaffDTO.Identifier),
                new Claim(ClaimTypes.StreetAddress, createStaffDTO.Address),
                new Claim(ClaimTypes.Gender, createStaffDTO.Gender),
            };

            await _userManager.CreateAsync(user, defaultPassword);
            await _userManager.AddToRoleAsync(user, createStaffDTO.Role);
            await _userManager.AddClaimsAsync(user, claims);

            return CreatedAtAction(nameof(GetStaffById), new { id = user.Id }, null);
        }


        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateStaff(string id, [FromForm] SaveStaffDTO saveStaffDTO)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return BadRequest("Invalid User");
            }
            var userClaims = await _userManager.GetClaimsAsync(user);
            if (!string.IsNullOrEmpty(saveStaffDTO.PhoneNumber))
            {
                user.PhoneNumber = saveStaffDTO.PhoneNumber;
            }
            if (!string.IsNullOrEmpty(saveStaffDTO.Password))
            {
                var changePassword = await _userManager.ChangePasswordAsync(
                    user,
                    saveStaffDTO.CurrentPassword,
                    saveStaffDTO.Password);
                if (!changePassword.Succeeded)
                {
                    return BadRequest(changePassword.Errors.SingleOrDefault().Description);
                }
            }
            if (!string.IsNullOrEmpty(saveStaffDTO.Name))
            {
                // check for existing claim and remove it
                var claim = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.Name);
                if (claim != null)
                {
                    await _userManager.RemoveClaimAsync(user, claim);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Name, saveStaffDTO.Name));
            }
            if (!string.IsNullOrEmpty(saveStaffDTO.Birthday))
            {
                // check for existing claim and remove it
                var claim = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.DateOfBirth);
                if (claim != null)
                {
                    await _userManager.RemoveClaimAsync(user, claim);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.DateOfBirth, saveStaffDTO.Birthday));
            }
            if (!string.IsNullOrEmpty(saveStaffDTO.Gender))
            {
                // check for existing claim and remove it
                var claim = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.Gender);
                if (claim != null)
                {
                    await _userManager.RemoveClaimAsync(user, claim);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Gender, saveStaffDTO.Gender));
            }
            if (!string.IsNullOrEmpty(saveStaffDTO.Identifier))
            {
                // check for existing claim and remove it
                var claim = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (claim != null)
                {
                    await _userManager.RemoveClaimAsync(user, claim);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.NameIdentifier, saveStaffDTO.Identifier));
            }
            if (!string.IsNullOrEmpty(saveStaffDTO.Address))
            {
                // check for existing claim and remove it
                var claim = userClaims.SingleOrDefault(c => c.Type == ClaimTypes.StreetAddress);
                if (claim != null)
                {
                    await _userManager.RemoveClaimAsync(user, claim);
                }
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.StreetAddress, saveStaffDTO.Address));
            }
            await _userManager.UpdateAsync(user);
            return Ok();
        }
    }
}