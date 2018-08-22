using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Account;

namespace VideoMeetups
{
    public class CustomUserStore : IUserStore<ApplicationUser>, IUserLoginStore<ApplicationUser>
    {
        private readonly IUserService _userService;
        private readonly ILogger<CustomUserStore> _logger;

        public CustomUserStore(IUserService userService, ILogger<CustomUserStore> logger)
        {
            _logger = logger;
            _userService = userService;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            try
            {
                user.NormalizedUserName = await GetNormalizedUserNameAsync(user, cancellationToken);
                await _userService.CreateUser(user, cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.ToString() });
            }
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            try
            {
                await _userService.DeleteUser(user, cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.ToString() });
            }
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            var user = await _userService.FindById(long.Parse(userId), cancellationToken);

            return user;
        }

        public async Task<ApplicationUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            var user = await _userService.FindByName(normalizedUserName, cancellationToken);

            return user;
        }

        public Task<string> GetNormalizedUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username.ToUpperInvariant());
        }

        public Task<string> GetUserIdAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.UserId.ToString());
        }

        public Task<string> GetUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task SetNormalizedUserNameAsync(ApplicationUser user, string normalizedName, CancellationToken cancellationToken)
        {
            return Task.FromResult(true);
        }

        public async Task SetUserNameAsync(ApplicationUser user, string userName, CancellationToken cancellationToken)
        {
            await _userService.SetUserName( user.UserId, userName, cancellationToken);
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            try
            {
                user.NormalizedUserName = await GetNormalizedUserNameAsync(user, cancellationToken);
                await _userService.UpdateUser(user, cancellationToken);
                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.ToString() });
            }
        }

        public Task AddLoginAsync(ApplicationUser user, UserLoginInfo login, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task RemoveLoginAsync(ApplicationUser user, string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IList<UserLoginInfo>> GetLoginsAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ApplicationUser> FindByLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            if(loginProvider == "Facebook")
            {
                return await FindByIdAsync(providerKey, cancellationToken);
            }

            throw new NotSupportedException($"The login provider {loginProvider} is not supported");
        }

        public void Dispose()
        {
        }
    }
}
