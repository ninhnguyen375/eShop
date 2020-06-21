using AutoMapper;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;

namespace CatalogApi.Infrastructure.Mapping
{
    public class ColorProfile : Profile
    {
        public ColorProfile()
        {
            CreateMap<CreateColorDTO, Color>();
            CreateMap<Color, ColorDTO>();
            CreateMap<Color, ColorWithImagesDTO>();
            CreateMap<Color, ColorOfSpecificProductDTO>();
            CreateMap<EditColorDTO, Color>();
        }
    }
}