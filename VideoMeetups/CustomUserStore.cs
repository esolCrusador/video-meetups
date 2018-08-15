using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using VideoMeetups.Logic;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Account;
using VideoMeetups.Models.Account;

namespace VideoMeetups
{
    public class CustomUserStore : IUserStore<ApplicationUserModel>, IUserLoginStore<ApplicationUserModel>
    {
        private readonly IUserService _userService;
        private readonly ILogger<CustomUserStore> _logger;

        public CustomUserStore(IUserService userService, ILogger<CustomUserStore> logger)
        {
            _logger = logger;
            _userService = userService;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUserModel user, CancellationToken cancellationToken)
        {
            try
            {
                user.NormalizedUserName = await GetNormalizedUserNameAsync(user, cancellationToken);
                await _userService.CreateUser(Map(user), cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.ToString() });
            }
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationUserModel user, CancellationToken cancellationToken)
        {
            try
            {
                await _userService.DeleteUser(Map(user), cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.ToString() });
            }
        }

        public async Task<ApplicationUserModel> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            var user = await _userService.FindById(long.Parse(userId), cancellationToken);

            return Map(user);
        }

        public async Task<ApplicationUserModel> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            var user = await _userService.FindByName(normalizedUserName, cancellationToken);

            return Map(user);
        }

        public Task<string> GetNormalizedUserNameAsync(ApplicationUserModel user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username.ToUpperInvariant());
        }

        public Task<string> GetUserIdAsync(ApplicationUserModel user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.UserId.ToString());
        }

        public Task<string> GetUserNameAsync(ApplicationUserModel user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task SetNormalizedUserNameAsync(ApplicationUserModel user, string normalizedName, CancellationToken cancellationToken)
        {
            return Task.FromResult(true);
        }

        public async Task SetUserNameAsync(ApplicationUserModel user, string userName, CancellationToken cancellationToken)
        {
            await _userService.SetUserName( user.UserId, userName, cancellationToken);
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUserModel user, CancellationToken cancellationToken)
        {
            try
            {
                user.NormalizedUserName = await GetNormalizedUserNameAsync(user, cancellationToken);
                await _userService.UpdateUser(Map(user), cancellationToken);
                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.ToString() });
            }
        }

        public void Map(ApplicationUserModel userModel, ApplicationUser user)
        {
            user.UserId = userModel.UserId;
            user.Username = userModel.Username;
            user.NormalizedUserName = userModel.NormalizedUserName;
            user.Email = userModel.Email;
            user.FullName = userModel.FullName;
        }

        public void Map(ApplicationUser user, ApplicationUserModel userModel)
        {
            userModel.UserId = user.UserId;
            userModel.Username = user.Username;
            userModel.NormalizedUserName = user.NormalizedUserName;
            userModel.Email = user.Email;
            userModel.FullName = user.FullName;
        }

        public ApplicationUserModel Map(ApplicationUser user)
        {
            if (user == null)
                return null;

            var userModel = new ApplicationUserModel();
            Map(user, userModel);

            return userModel;
        }

        public ApplicationUser Map(ApplicationUserModel userModel)
        {
            if (userModel == null)
                return null;

            var user = new ApplicationUser();
            Map(userModel, user);

            return user;
        }

        public void Dispose()
        {
        }

        public Task AddLoginAsync(ApplicationUserModel user, UserLoginInfo login, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task RemoveLoginAsync(ApplicationUserModel user, string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IList<UserLoginInfo>> GetLoginsAsync(ApplicationUserModel user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ApplicationUserModel> FindByLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken)
        {
            if(loginProvider == "Facebook")
            {
                return await FindByIdAsync(providerKey, cancellationToken);
            }

            throw new NotSupportedException($"The login provider {loginProvider} is not supported");
        }
    }
}
