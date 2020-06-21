using CatalogApi.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class CreateStyleValidator : AbstractValidator<CreateStyleDTO>
    {
        public CreateStyleValidator()
        {
            RuleFor(s => s.Name).NotEmpty();
        }
    }
}