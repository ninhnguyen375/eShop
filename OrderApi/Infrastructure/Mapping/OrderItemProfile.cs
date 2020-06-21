using AutoMapper;
using OrderApi.Domain.Models;
using OrderApi.DTO.Request;
using OrderApi.DTO.Response;

namespace OrderApi.Infrastructure.Mapping
{
    public class OrderItemProfile : Profile
    {
        public OrderItemProfile()
        {
            CreateMap<CreateOrderItemDTO, OrderItem>();
            CreateMap<OrderItem, OrderItemDTO>();
            CreateMap<OrderItemDTO, OrderItem>();
        }
    }
}