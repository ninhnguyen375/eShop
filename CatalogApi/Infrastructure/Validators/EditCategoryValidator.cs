using CatalogApi.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class EditCategoryValidator : AbstractValidator<EditCategoryDTO>
    {
        public EditCategoryValidator()
        {
            RuleFor(c => c.Name).NotEmpty();
        }
    }
}