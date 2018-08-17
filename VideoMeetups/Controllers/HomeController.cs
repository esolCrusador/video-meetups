using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VideoMeetups.Models.Account;

namespace VideoMeetups.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUserModel> _userManager;
        public HomeController(UserManager<ApplicationUserModel> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            dynamic model = new ExpandoObject();
            if (User.Identity.IsAuthenticated) {
                var userIdentity = User.Identities.First();
                var userId = userIdentity.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

                var user = await _userManager.FindByIdAsync(userId);

                model.User = user;
            }
            return View(model);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
