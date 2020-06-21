using CatalogApi.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class CreateCategoryValidator : AbstractValidator<CreateCategoryDTO>
    {
        public CreateCategoryValidator()
        {
            RuleFor(c => c.Name).NotEmpty();
        }
    }
}