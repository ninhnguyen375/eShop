using AutoMapper;
using OrderApi.Domain.Models;
using OrderApi.DTO.Request;
using OrderApi.DTO.Response;

namespace OrderApi.Infrastructure.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductDTO, Product>();
        }
    }
}