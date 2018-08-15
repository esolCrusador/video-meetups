using System;
using System.Collections.Generic;
using System.Text;

namespace VideoMeetups.Logic.DomainModels.Account
{
    public class ApplicationUser
    {
        public long UserId { get; set; }
        public string Username { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
