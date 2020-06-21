using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CatalogApi.Data;
using CatalogApi.Domain.Models;
using CatalogApi.Domain.Services;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;
using CatalogApi.Infrastructure.Constant;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CatalogApi.Services
{
    public class CategoryService : ControllerBase, ICategoryService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedList<Category>> ListAsync(Pagination pagination, SearchCategory search)
        {
            var queryable = _context.Categories.AsQueryable();

            if (!String.IsNullOrEmpty(search.Name))
            {
                queryable = queryable.Where(c => c.Name.Contains(search.Name));
            }

            queryable = queryable.OrderBy(c => c.Id);

            var pagedList = await PagedList<Category>.ToPagedListAsync(queryable, pagination.PageNumber, pagination.PageSize);
            return pagedList;
        }

        public async Task<Category> FindByIdAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            return category;
        }

        public async Task CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task EditAsync(int id, EditCategoryDTO editCategoryDTO)
        {
            var existingCategory = await _context.Categories.FindAsync(id);
            if (existingCategory != null)
            {
                _mapper.Map<EditCategoryDTO, Category>(editCategoryDTO, existingCategory);
                await _context.SaveChangesAsync();
            }
        }

        public Task DeleteAsync()
        {
            throw new System.NotImplementedException();
        }

    }
}