using CatalogApi.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class CreateProductValidator : AbstractValidator<CreateProductDTO>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name).NotEmpty();
        }
    }
}