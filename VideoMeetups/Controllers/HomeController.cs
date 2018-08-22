using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Account;

namespace VideoMeetups.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUserContextContainer _userContextContainer;
        public HomeController(IUserContextContainer userContextContainer)
        {
            _userContextContainer = userContextContainer;
        }

        public async Task<IActionResult> Index(CancellationToken cancellationToken)
        {
            dynamic model = new ExpandoObject();
            model.User = await _userContextContainer.GetUser(cancellationToken);

            return View(model);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
