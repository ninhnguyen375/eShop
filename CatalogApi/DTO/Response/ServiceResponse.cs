namespace CatalogApi.DTO.Response
{
    public class ServiceResponse
    {
        public bool Succeeded { get; set; }
        public object Error { get; set; }
        public object Result { get; set; }
    }
}