using CatalogApi.DTO.Request;
using FluentValidation;

namespace CatalogApi.Infrastructure.Validators
{
    public class CreateColorValidator : AbstractValidator<CreateColorDTO>
    {
        public CreateColorValidator()
        {
            RuleFor(c => c.HexCode).Length(7).NotEmpty();
        }
    }
}