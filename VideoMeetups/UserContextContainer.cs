using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Account;

namespace VideoMeetups
{
    public class UserContextContainer : IUserContextContainer
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserService _userService;

        public UserContextContainer(IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            _httpContextAccessor = httpContextAccessor;
            _userService = userService;
        }

        public long? UserId
        {
            get
            {
                var applicationUserInfo = GetOrCreateApplicationUserInfo();

                return applicationUserInfo.UserId;
            }
        }

        public async Task<ApplicationUser> GetUser(CancellationToken cancellationToken)
        {
            var applicationUserInfo = GetOrCreateApplicationUserInfo();

            if (applicationUserInfo.UserId == null)
                return null;

            if (applicationUserInfo.User == null)
            {
                applicationUserInfo.User = await _userService.FindById(applicationUserInfo.UserId.Value, cancellationToken);
            }

            return applicationUserInfo.User;
        }

        private ApplicationUserInfo GetOrCreateApplicationUserInfo()
        {
            var httpContext = _httpContextAccessor.HttpContext;

            var applicationUserInfo = (ApplicationUserInfo)httpContext.Items[nameof(ApplicationUserInfo)];

            if (applicationUserInfo == null)
            {
                long? userId = null;
                if (httpContext.User.Identity.IsAuthenticated)
                {
                    var userIdentity = httpContext.User.Identities.First();
                    var userIdString = userIdentity.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

                    userId = long.Parse(userIdString);
                }

                httpContext.Items[nameof(ApplicationUserInfo)] = applicationUserInfo = new ApplicationUserInfo { UserId = userId };
            }

            return applicationUserInfo;
        }

        private class ApplicationUserInfo
        {
            public long? UserId { get; set; }
            public ApplicationUser User { get; set; }
        }
    }
}
