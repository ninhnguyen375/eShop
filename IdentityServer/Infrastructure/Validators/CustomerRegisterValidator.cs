using IdentityServer.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class CustomerRegisterValidator : AbstractValidator<CustomerRegisterDTO>
    {
        public CustomerRegisterValidator()
        {
            RuleFor(s => s.Name).NotEmpty();
            RuleFor(s => s.Email).EmailAddress().NotEmpty();
            RuleFor(s => s.Password).Length(6, 30).NotEmpty();
        }
    }
}