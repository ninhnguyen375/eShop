using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using IdentityServer.DTO.Response;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile () {
            // Mapping Customer
            CreateMap<IdentityUser, CustomerResponseDTO>()
                .ForMember(a => a.Name, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.Name))
                .ForMember(a => a.Address, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.StreetAddress))
                .ForMember(a => a.Gender, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.Gender));
            // Mapping Staff
            CreateMap<IdentityUser, StaffResponseDTO>()
                .ForMember(a => a.Name, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.Name))
                .ForMember(a => a.Address, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.StreetAddress))
                .ForMember(a => a.Birthday, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.DateOfBirth))
                .ForMember(a => a.Gender, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.Gender))
                .ForMember(a => a.Role, b => b.MapFrom<ResolveRole>())
                .ForMember(a => a.Identifier, b => b.MapFrom<ResolveClaims, string>(src => ClaimTypes.NameIdentifier));
        }
    }
    public class ResolveClaims : IMemberValueResolver<object, object, string, string>
    {
        public string Resolve(object src, object des, string srcMember, string desMember, ResolutionContext context)
        {
            var claims = (IList<Claim>)context.Items["claims"];
            if (claims == null) {
                return null;
            }

            var claim = claims.SingleOrDefault(c => c.Type == srcMember);
            if (claim == null)
                return null;
            return claim.Value;
        }
    }
    public class ResolveRole : IValueResolver<object, object, string>
    {
        
        public string Resolve(object src, object des, string srcMember, ResolutionContext context)
        {
            IList<string> roles = (IList<string>)context.Items["roles"];
            if (roles == null) {
                return null;
            }

            var role = roles.First();
            return role;
        }
    }
}