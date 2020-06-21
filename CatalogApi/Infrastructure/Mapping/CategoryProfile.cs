using AutoMapper;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;

namespace CatalogApi.Infrastructure.Mapping
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CreateCategoryDTO, Category>();
            CreateMap<EditCategoryDTO, Category>();
            CreateMap<Category, CategoryDTO>();
        }
    }
}