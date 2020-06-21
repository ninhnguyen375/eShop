using System.Collections.Generic;
using System.Threading.Tasks;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;
using CatalogApi.Infrastructure.Constant;

namespace CatalogApi.Domain.Services
{
    public interface IProductService
    {
        // Product
        Task<PagedList<Product>> ListAsync(Pagination pagination, SearchProduct search);
        Task<Product> FindByIdAsync(int id);
        Task<ProductDTO> CreateAsync(CreateProductDTO createProductDTO);
        Task<PagedList<SpecificProduct>> ListSpecificProductAsync(Pagination pagination, SearchSpecificProduct search);
        Task UpdateProductAsync(Product product, UpdateProductDTO update);

         // Specific Product
         Task<SpecificProduct> FindSpecificProductByIdAsync(string id);
        Task<List<ColorOfSpecificProductDTO>> GetColorsByProductId(int id);
        Task<List<SizeOfSpecificProductDTO>> GetSizes(int productId, int colorId);
        Task<List<SpecificProduct>> GetSpecificProductsByProductId(int id);
        Task CreateSpecificProduct(int productId, CreateSpecificProductDTO createSpecificProductDTO);
        Task ImportSpecificProductsAsync(ImportSpecificProductsDTO import);
    }
}