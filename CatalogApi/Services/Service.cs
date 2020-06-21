using CatalogApi.DTO.Response;

namespace CatalogApi.Services
{
    public abstract class Service
    {
        protected ServiceResponse ServiceError(object error)
        {
            return new ServiceResponse
            {
                Succeeded = false,
                Error = error
            };
        }

        protected ServiceResponse ServiceSuccess(object result = null)
        {
            return new ServiceResponse
            {
                Succeeded = true,
                Result = result,
            };
        }
    }
}