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
using Microsoft.Extensions.Logging;

namespace CatalogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StylesController : ControllerBase
    {
        private readonly IStyleService _styleService;
        private readonly IMapper _mapper;
        private readonly ILogger<StylesController> _logger;
        public StylesController(IStyleService styleService, IMapper mapper, ILogger<StylesController> logger)
        {
            _styleService = styleService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> ListStylesAsync()
        {
            var styles = await _styleService.ListAsync();
            var data = _mapper.Map<List<StyleDTO>>(styles);
            var listResponse = new ListResponseDTO
            {
                Data = data,
            };

            return Ok(listResponse);
        }


        [HttpPost]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<IActionResult> CreateColor([FromForm] CreateStyleDTO createStyleDTO)
        {
            var duplicateStyle = _styleService.FindByNameAsync(createStyleDTO.Name);

            if (duplicateStyle.Result != null)
            {
                return BadRequest(new { Name = "This style name already exists" });
            }
            var style = _mapper.Map<Style>(createStyleDTO);
            await _styleService.CreateAsync(style);

            return NoContent();
        }

        // [HttpPut("{id}")]
        // [Authorize(Roles = Roles.ManagerOrSeller)]
        // public async Task<IActionResult> EditCategory(int id, [FromForm] EditCategoryDTO editCategoryDTO)
        // {
        // }

    }
}
