using System;
using IdentityServer.Infrastructure.Constant;

namespace IdentityServer.DTO.Request
{
    public class CreateStaffDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Birthday { get; set; }
        public string Gender { get; set; }
        public string Identifier { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
    }
}