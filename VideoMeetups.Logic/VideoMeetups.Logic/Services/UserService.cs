using System;
using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.Contracts;
using VideoMeetups.Logic.DomainModels.Account;
using VideoMeetups.Logic.Repositories;

namespace VideoMeetups.Logic.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task CreateUser(ApplicationUser applicationUser, CancellationToken cancellationToken)
        {
            await _userRepository.CreateUser(applicationUser, cancellationToken);
        }

        public async Task DeleteUser(ApplicationUser applicationUser, CancellationToken cancellationToken)
        {
            await _userRepository.DeleteUser(applicationUser.UserId, cancellationToken);
        }

        public async Task<ApplicationUser> FindById(long userId, CancellationToken cancellationToken)
        {
            return await _userRepository.FindById(userId, cancellationToken);
        }

        public async Task<ApplicationUser> FindByName(string normalizedUserName, CancellationToken cancellationToken)
        {
            return await _userRepository.FindByName(normalizedUserName, cancellationToken);
        }

        public async Task SetUserName(long userId, string userName, CancellationToken cancellationToken)
        {
            var user = await FindById(userId, cancellationToken);
            user.Username = userName;

            await UpdateUser(user, cancellationToken);
        }

        public async Task UpdateUser(ApplicationUser applicationUser, CancellationToken cancellationToken)
        {
            await _userRepository.UpdateUser(applicationUser, cancellationToken);
        }
    }
}
