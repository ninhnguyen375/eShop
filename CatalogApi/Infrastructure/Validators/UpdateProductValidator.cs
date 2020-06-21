using CatalogApi.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class UpdateProductValidator : AbstractValidator<UpdateProductDTO>
    {
        public UpdateProductValidator()
        {
            RuleFor(x => x.Name).NotNull();
            RuleFor(x => x.CategoryId).NotNull();
            RuleFor(x => x.StyleId).NotNull();
            RuleFor(x => x.Price).NotNull();
            RuleFor(x => x.Status).NotNull();
        }
    }
}