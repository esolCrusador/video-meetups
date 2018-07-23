using Nest;
using VideoMeetups.Data.Mappings;

namespace VideoMeetups.Data.Entities
{
    [ElasticsearchType(Name = "user_entity", IdProperty = nameof(UserId))]
    public class UserEntity
    {
        [ElasticsearchProperty(FieldType.Text)]
        public string UserId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
    }
}
