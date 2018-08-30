using Microsoft.IdentityModel.Tokens;
using System;

namespace VideoMeetups.Models
{
    public class BarrierOptions
    {
        public SymmetricSecurityKey SecurityKey { get; set; }
        public string SecurityAlgorithm { get; set; }
        public string Issuer { get; internal set; }
        public TimeSpan Expirations { get; set; }
    }
}
