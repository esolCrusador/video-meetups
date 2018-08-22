using System.Threading;
using System.Threading.Tasks;
using VideoMeetups.Logic.DomainModels.Account;

namespace VideoMeetups.Logic.Contracts
{
    public interface IUserContextContainer
    {
        long? UserId { get; }

        Task<ApplicationUser> GetUser(CancellationToken cancellationToken);
    }
}
