using AutoMapper;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;

namespace CatalogApi.Infrastructure.Mapping
{
    public class StyleProfile : Profile
    {
        public StyleProfile()
        {
            CreateMap<CreateStyleDTO, Style>();
            CreateMap<EditStyleDTO, Style>();
            CreateMap<Style, StyleDTO>();
        }
    }
}