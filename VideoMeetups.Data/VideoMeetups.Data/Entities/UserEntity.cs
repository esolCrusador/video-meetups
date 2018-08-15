using Nest;
using System;
using VideoMeetups.Data.Mappings;

namespace VideoMeetups.Data.Entities
{
    [ElasticsearchType(Name = "user_entity", IdProperty = nameof(UserId))]
    public class UserEntity
    {
        [ElasticsearchProperty(FieldType.Long)]
        public long UserId { get; set; }
        public string Username { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string PasswordHash { get; set; }
    }
}
