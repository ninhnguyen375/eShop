using System.Threading.Tasks;
using CatalogApi.Domain.Models;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;
using CatalogApi.Infrastructure.Constant;
using Microsoft.AspNetCore.Mvc;

namespace CatalogApi.Domain.Services
{
    public interface ICategoryService
    {
        Task<PagedList<Category>> ListAsync(Pagination pagination, SearchCategory search);
        Task<Category> FindByIdAsync(int id);
        Task CreateAsync(Category category);
        Task EditAsync(int id, EditCategoryDTO editCategoryDTO);
        Task DeleteAsync();
    }
}