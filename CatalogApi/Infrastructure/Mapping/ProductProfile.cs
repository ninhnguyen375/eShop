using System;
using AutoMapper;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;

namespace CatalogApi.Infrastructure.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductDTO, Product>();
            CreateMap<Product, ProductDTO>();
            CreateMap<CreateProductDTO, Product>();
            CreateMap<UpdateProductDTO, Product>();
        }
    }
}