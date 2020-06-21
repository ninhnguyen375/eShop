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
    public class ColorsController : ControllerBase
    {
        private readonly IColorService _colorService;
        private readonly IMapper _mapper;
        private readonly ILogger<ColorsController> _logger;
        public ColorsController(IColorService colorService, IMapper mapper, ILogger<ColorsController> logger)
        {
            _colorService = colorService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> ListColorsAsync()
        {
            var colors = await _colorService.ListAsync();
            var data = _mapper.Map<List<ColorDTO>>(colors);
            var listResponse = new ListResponseDTO
            {
                Data = data,
            };

            return Ok(listResponse);
        }


        [HttpPost]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<IActionResult> CreateColor([FromForm] CreateColorDTO createColorDTO)
        {
            var duplicateColor = _colorService.FindByHexCodeAsync(createColorDTO.HexCode);
            if (duplicateColor.Result != null)
            {
                return BadRequest(new { HexCode = "This color code already exists" });
            }
            var color = _mapper.Map<Color>(createColorDTO);
            await _colorService.CreateAsync(color);

            return NoContent();
        }

        // [HttpPut("{id}")]
        // [Authorize(Roles = Roles.ManagerOrSeller)]
        // public async Task<IActionResult> EditCategory(int id, [FromForm] EditCategoryDTO editCategoryDTO)
        // {
        // }

    }
}
