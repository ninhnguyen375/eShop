using AutoMapper;
using OrderApi.Domain.Models;
using OrderApi.DTO.Request;
using OrderApi.DTO.Response;

namespace OrderApi.Infrastructure.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<CreateOrderDTO, Order>();
            CreateMap<EditOrderDTO, Order>();
            CreateMap<Order, OrderDTO>();
        }
    }
}