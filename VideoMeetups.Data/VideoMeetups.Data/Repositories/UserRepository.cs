using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Data.Entities;
using VideoMeetups.Logic.DomainModels.Account;
using VideoMeetups.Logic.Repositories;

namespace VideoMeetups.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ElasticProvider _elasticProvider;

        public UserRepository(ElasticProvider elasticProvider)
        {
            _elasticProvider = elasticProvider;
        }

        public async Task CreateUser(ApplicationUser applicationUser, CancellationToken cancellationToken)
        {
            await _elasticProvider.Create(Map(applicationUser), cancellationToken);
        }

        public async Task DeleteUser(long userId, CancellationToken cancellationToken)
        {
            await _elasticProvider.DeleteById<UserEntity>(userId, cancellationToken);
        }

        public async Task<ApplicationUser> FindById(long userId, CancellationToken cancellationToken)
        {
            var userEntity = await _elasticProvider.FindById<UserEntity>(userId, cancellationToken);

            return Map(userEntity);
        }

        public async Task<ApplicationUser> FindByName(string normalizedUserName, CancellationToken cancellationToken)
        {
            var userEntity = await _elasticProvider.FindByPredicate<UserEntity>(u => u.Username == normalizedUserName, cancellationToken);

            return userEntity == null ? null : Map(userEntity);
        }

        public async Task UpdateUser(ApplicationUser applicationUser, CancellationToken cancellationToken)
        {
            await _elasticProvider.Update(applicationUser, cancellationToken);
        }

        private void Map(ApplicationUser user, UserEntity userEntity)
        {
            userEntity.UserId = user.UserId;
            userEntity.Username = user.Username;
            userEntity.NormalizedUserName = user.NormalizedUserName;
            userEntity.Email = user.Email;
            userEntity.FullName = user.FullName;
        }

        private void Map(UserEntity userEntitity, ApplicationUser user)
        {
            user.UserId = userEntitity.UserId;
            user.Username = userEntitity.Username;
            user.NormalizedUserName = userEntitity.NormalizedUserName;
            user.Email = userEntitity.Email;
            user.FullName = userEntitity.FullName;
        }

        public UserEntity Map(ApplicationUser user)
        {
            if (user == null)
                return null;

            var userEntity = new UserEntity();
            Map(user, userEntity);

            return userEntity;
        }

        public ApplicationUser Map(UserEntity userEntity)
        {
            if (userEntity == null)
                return null;

            var user = new ApplicationUser();
            Map(userEntity, user);

            return user;
        }
    }
}
