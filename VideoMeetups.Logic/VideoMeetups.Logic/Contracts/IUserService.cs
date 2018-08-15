using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.DomainModels.Account;

namespace VideoMeetups.Logic.Contracts
{
    public interface IUserService
    {
        Task CreateUser(ApplicationUser applicationUser, CancellationToken cancellationToken);
        Task DeleteUser(ApplicationUser applicationUser, CancellationToken cancellationToken);
        Task<ApplicationUser> FindById(long userId, CancellationToken cancellationToken);
        Task<ApplicationUser> FindByName(string normalizedUserName, CancellationToken cancellationToken);
        Task SetUserName(long userId, string userName, CancellationToken cancellationToken);
        Task UpdateUser(ApplicationUser applicationUser, CancellationToken cancellationToken);
    }
}
