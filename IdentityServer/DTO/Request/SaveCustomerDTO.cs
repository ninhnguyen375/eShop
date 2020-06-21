namespace IdentityServer.DTO.Request
{
    public class SaveCustomerDTO
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string CurrentPassword { get; set; }
        public string Password { get; set; }
    }
}