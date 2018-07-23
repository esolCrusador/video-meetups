using System.Collections.Generic;
using VideoMeetups.Data.Entities;
using VideoMeetups.Logic;

namespace VideoMeetups.Data.Init
{
    public class InitializeUsers : DataInitializer<UserEntity>
    {
        private readonly PasswordManager _passwordManager;

        public InitializeUsers(PasswordManager passwordManager)
        {
            _passwordManager = passwordManager;
        }

        public override IEnumerable<UserEntity> GetInitialEntities()
        {
            yield return new UserEntity
            {
                Username = "esolCrusador",
                PasswordHash = _passwordManager.GenerateHash("Passw0rd!")
            };
        }
    }
}
