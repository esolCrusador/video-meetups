using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.DomainModels.Account;

namespace VideoMeetups.Logic.Repositories
{
    public interface IUserRepository
    {
        Task CreateUser(ApplicationUser applicationUser, CancellationToken cancellationToken);
        Task DeleteUser(long userId, CancellationToken cancellationToken);
        Task<ApplicationUser> FindById(long userId, CancellationToken cancellationToken);
        Task<ApplicationUser> FindByName(string normalizedUserName, CancellationToken cancellationToken);
        Task UpdateUser(ApplicationUser applicationUser, CancellationToken cancellationToken);
    }
}
