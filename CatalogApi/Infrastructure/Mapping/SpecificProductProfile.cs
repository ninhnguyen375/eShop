using System;
using AutoMapper;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;

namespace CatalogApi.Infrastructure.Mapping
{
    public class ProductDetailProfile : Profile
    {
        public ProductDetailProfile()
        {
            CreateMap<CreateSpecificProductDTO, SpecificProduct>();
            CreateMap<SpecificProduct, SpecificProductDTO>();
            CreateMap<SpecificProductDTO, SpecificProduct>();
        }
    }
}