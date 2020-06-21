using AutoMapper;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;

namespace CatalogApi.Infrastructure.Mapping
{
    public class SizeProfile : Profile
    {
        public SizeProfile()
        {
            CreateMap<SizeDTO, Size>();
            CreateMap<Size, SizeDTO>();
            CreateMap<CreateSizeDTO, Size>();
        }
    }
}