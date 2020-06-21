using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CatalogApi.Domain.Models;
using CatalogApi.Domain.Services;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;
using CatalogApi.Infrastructure.Constant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CatalogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        public CategoriesController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryAsync(int id)
        {
            var category = await _categoryService.FindByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CategoryDTO>(category));
        }


        [HttpGet]
        public async Task<IActionResult> ListCategoriesAsync([FromQuery] Pagination pagination, [FromQuery] SearchCategory search)
        {
            var categories = await _categoryService.ListAsync(pagination, search);
            // Mapping before to return
            var data = _mapper.Map<List<CategoryDTO>>(categories);
            var ListResponseDTO = new ListResponseDTO
            {
                Data = data,
                CurrentPage = categories.CurrentPage,
                PageSize = categories.PageSize,
                Count = categories.Count,
                TotalCount = categories.TotalCount,
                TotalPage = categories.TotalPages
            };

            return Ok(ListResponseDTO);
        }


        [HttpPost]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<IActionResult> CreateCategory([FromForm] CreateCategoryDTO createCategoryDTO)
        {
            var category = _mapper.Map<Category>(createCategoryDTO);
            await _categoryService.CreateAsync(category);

            return Ok(category);
        }

        /// Api Error
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<IActionResult> EditCategory(int id, [FromForm] EditCategoryDTO editCategoryDTO)
        {
            await _categoryService.EditAsync(id, editCategoryDTO);
            return NoContent();
        }

    }
}
