using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer.DTO.Response;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using static IdentityServer4.IdentityServerConstants;

namespace IdentityServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(LocalApi.PolicyName)]
    public class PaymentController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IMapper _mapper;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            ILogger<PaymentController> logger,
            IMapper mapper,
            IIdentityServerInteractionService interactionService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _interaction = interactionService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreatePaymentIntent(string id, [FromForm] PaymentRequest values)
        {
            StripeConfiguration.ApiKey = "sk_test_9lbV8iZ2EjD5TiOzTAFURm7H00TCPFae4M";
            // Create new order here

            var options = new PaymentIntentCreateOptions
            {
                Amount = values.Amount,
                Currency = "vnd",
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);

            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var claims = await _userManager.GetClaimsAsync(user);
                var customer = _mapper.Map<IdentityUser, CustomerResponseDTO>(
                    source: user,
                    opts: opt => opt.Items["claims"] = claims
                );

                return Ok(new { clientSecret = paymentIntent.ClientSecret });
            }
            else
            {
                return NotFound();
            }
        }

    }
    public class PaymentRequest
    {
        public long Amount { get; set; }
    }
}