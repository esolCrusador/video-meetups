namespace VideoMeetups.Models.Account
{
    public class ApplicationUserModel
    {
        public long UserId { get; set; }
        public string Username { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
