namespace IdentityServer.DTO.Request
{
    public class SearchUser
    {
        public string Email { get; set; } = "";
        public string Role { get; set; } = "";
        public string sortAsc { get; set; } = "";
        public string sortDesc { get; set; } = "";
    }
}