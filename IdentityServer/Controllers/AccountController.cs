using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer.Infrastructure.Constant;
using IdentityServer.ViewModels;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;

namespace IdentityServer.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly ILogger<AccountController> _logger;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            ILogger<AccountController> logger,
            IIdentityServerInteractionService interactionService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _interaction = interactionService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Login(string returnUrl)
        {
            var loginViewModel = new LoginViewModel
            {
                ReturnUrl = returnUrl
            };

            return View(loginViewModel);
        }
        [HttpGet]
        public IActionResult Register(string queryString)
        {
            return View(new RegisterViewModel { QueryString = queryString });
        }
        [HttpGet]
        public IActionResult RegisterSuccess()
        {
            return View(new RegisterSuccessViewModel());
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel vm)
        {
            if (vm.Password != vm.RePassword)
            {
                ModelState.AddModelError(string.Empty, "Re password is incorrect");
            }
            var u = await _userManager.FindByEmailAsync(vm.Email);

            if (u != null)
            {
                ModelState.AddModelError(string.Empty, "This Email already in use");
                return View(vm);
            }
            if (ModelState.IsValid)
            {

                var user = new IdentityUser
                {
                    UserName = vm.Email,
                    Email = vm.Email,
                    PhoneNumber = vm.PhoneNumber
                };

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, vm.Name),
                };

                if (!string.IsNullOrEmpty(vm.Address))
                {
                    claims.Add(new Claim(ClaimTypes.StreetAddress, vm.Address));
                }
                if (!string.IsNullOrEmpty(vm.Gender))
                {
                    claims.Add(new Claim(ClaimTypes.Gender, vm.Gender));
                }

                await _userManager.CreateAsync(user, vm.Password);
                await _userManager.AddToRoleAsync(user, Roles.Customer);
                await _userManager.AddClaimsAsync(user, claims);

                return Redirect("/Account/RegisterSuccess" + vm.QueryString);
            }
            return View(vm);
        }


        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel vm)
        {
            if (_signInManager.IsSignedIn(HttpContext.User))
            {
                return Redirect("/Account/SignedIn");
            }
            if (String.IsNullOrEmpty(vm.Email) || String.IsNullOrEmpty(vm.Password))
            {
                return View(vm);
            }
            var user = await _userManager.FindByEmailAsync(vm.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "User or password incorrect");
                return View(vm);
            }

            var result = await _signInManager.PasswordSignInAsync(user, vm.Password, true, false);
            if (result.Succeeded)
            {
                if (string.IsNullOrEmpty(vm.ReturnUrl))
                {
                    return Redirect("/Account/SignedIn");
                }
                return Redirect(vm.ReturnUrl);
            }

            ModelState.AddModelError(string.Empty, "User or password incorrect");
            return View(vm);
        }

        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            await _signInManager.SignOutAsync();
            // get context information (client name, post logout redirect URI and iframe for federated signout)
            var logout = await _interaction.GetLogoutContextAsync(logoutId);
            var postLogoutRedirectUri = logout?.PostLogoutRedirectUri;
            if (string.IsNullOrEmpty(postLogoutRedirectUri))
            {
                return Redirect("/Account/LoggedOut");
            }
            return Redirect(postLogoutRedirectUri);
        }

        [HttpGet]
        public IActionResult LoggedOut()
        {
            return View(new LoggedOutViewModel());
        }

        [HttpGet]
        public IActionResult SignedIn()
        {
            return View(new SignedInViewModel());
        }
    }
}
