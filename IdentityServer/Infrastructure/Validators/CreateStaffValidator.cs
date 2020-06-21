using IdentityServer.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class CreateStaffValidator : AbstractValidator<CreateStaffDTO>
    {
        public CreateStaffValidator()
        {
            RuleFor(s => s.Name).NotEmpty();
            RuleFor(s => s.Email).EmailAddress().NotEmpty();
            RuleFor(s => s.PhoneNumber).NotEmpty();
            RuleFor(s => s.Birthday).NotEmpty();
            RuleFor(s => s.Identifier).NotEmpty();
            RuleFor(s => s.Gender).NotEmpty();
            RuleFor(s => s.Role).NotEmpty();
            RuleFor(s => s.Address).NotEmpty();
        }
    }
}