using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using VideoMeetups.Models.Account;

namespace VideoMeetups.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUserModel> _userManager;
        private readonly SignInManager<ApplicationUserModel> _signInManager;

        public AccountController(UserManager<ApplicationUserModel> userManager, SignInManager<ApplicationUserModel> signInManager)
        {

            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IActionResult ExternalLogin(string returnUrl)
        {
            const string provider = "Facebook";

            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);

            return Challenge(properties, provider);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                throw new System.Exception(remoteError);
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(ExternalLogin));
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (!result.Succeeded)
            {
                var identity = info.Principal.Identities.First();
                var email = identity.Claims.First(c => c.Type == ClaimTypes.Email).Value;

                var newUser = new ApplicationUserModel
                {
                    UserId = long.Parse(info.ProviderKey),
                    FullName = info.Principal.Identity.Name,
                    Username = email,
                    Email = email
                };

                await _userManager.CreateAsync(newUser);

                result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
                if (!result.Succeeded)
                {
#if DEBUG
                    throw new System.Exception($"Can't login Provider: {info.ProviderKey}, Id: {info.ProviderKey}, Name: {info.Principal.Identity.Name}");
#endif
                }
            }

            return RedirectToLocal(returnUrl);
        }

        [HttpPost]
        public async Task<IActionResult> Logout(string returnUrl = null)
        {
            await _signInManager.SignOutAsync();

            return RedirectToLocal(returnUrl);
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }
    }
}
