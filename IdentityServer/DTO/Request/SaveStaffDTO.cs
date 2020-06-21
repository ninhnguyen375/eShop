using System;
using IdentityServer.Infrastructure.Constant;

namespace IdentityServer.DTO.Request
{
    public class SaveStaffDTO
    {
        public string Name { get; set; }
        public string Birthday { get; set; }
        public string Gender { get; set; }
        public string Identifier { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string CurrentPassword { get; set; }
    }
}