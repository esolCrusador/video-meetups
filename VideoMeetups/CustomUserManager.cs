using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoMeetups.Models.Account;

namespace VideoMeetups
{
    /// <summary>
    /// Provides the APIs for managing user in a persistence store.
    /// </summary>
    public class CustomUserManager : UserManager<ApplicationUserModel>
    {
        public CustomUserManager(
            IUserStore<ApplicationUserModel> store, 
            IOptions<IdentityOptions> optionsAccessor, 
            IPasswordHasher<ApplicationUserModel> passwordHasher, 
            IEnumerable<IUserValidator<ApplicationUserModel>> userValidators,
            IEnumerable<IPasswordValidator<ApplicationUserModel>> passwordValidators, 
            ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors, 
            IServiceProvider services,
            ILogger<UserManager<ApplicationUserModel>> logger) 
            : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }
    }
}
