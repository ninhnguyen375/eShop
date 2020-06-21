using System;
using IdentityServer.Infrastructure.Constant;

namespace IdentityServer.DTO.Request
{
    public class CustomerRegisterDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
    }
}