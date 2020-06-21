using OrderApi.DTO.Request;
using FluentValidation;

namespace OrderApi.Infrastructure.Validators
{
    public class CreateOrderValidator : AbstractValidator<CreateOrderDTO>
    {
        public CreateOrderValidator()
        {
            
        }
    }
}