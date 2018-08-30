using System;
using System.Diagnostics;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Account;
using VideoMeetups.Models;

namespace VideoMeetups.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUserContextContainer _userContextContainer;
        private readonly BarrierOptions _barrierOptions;
        public HomeController(IUserContextContainer userContextContainer, IOptions<BarrierOptions> barrier)
        {
            _userContextContainer = userContextContainer;
            _barrierOptions = barrier.Value;
        }

        public async Task<IActionResult> Index(CancellationToken cancellationToken, [FromQuery]bool prerender = true)
        {
            dynamic model = new ExpandoObject();
            var user  = await _userContextContainer.GetUser(cancellationToken);
            if (user != null) {
                model.User = user;
                var token = new JwtSecurityToken(
                    issuer: _barrierOptions.Issuer,
                    audience: null,
                    claims: User.Identities.SelectMany(i => i.Claims),
                    expires: DateTime.UtcNow + _barrierOptions.Expirations,
                    notBefore: null,
                    signingCredentials: new SigningCredentials(_barrierOptions.SecurityKey, _barrierOptions.SecurityAlgorithm)
                    );
                model.Token = new JwtSecurityTokenHandler().WriteToken(token);
            }
            model.Prerender = prerender;

            return View(model);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
