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
    public class SizesController : ControllerBase
    {
        private readonly ISizeService _sizeService;
        private readonly IMapper _mapper;
        private readonly ILogger<SizesController> _logger;
        public SizesController(ISizeService sizeService, IMapper mapper, ILogger<SizesController> logger)
        {
            _sizeService = sizeService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> ListSizesAsync()
        {
            var sizes = await _sizeService.ListAsync();
            var data = _mapper.Map<List<SizeDTO>>(sizes);
            var listResponse = new ListResponseDTO
            {
                Data = data,
            };

            return Ok(listResponse);
        }

        [HttpPost]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<IActionResult> CreateSize([FromForm] CreateSizeDTO createSizeDTO)
        {
            var duplicateSize = await _sizeService.FindByValueAsync(createSizeDTO.SizeValue);
            if (duplicateSize != null)
            {
                return BadRequest(new { Name = "This size already exists" });
            }
            var size = _mapper.Map<Size>(createSizeDTO);
            await _sizeService.CreateAsync(size);

            return NoContent();
        }
    }
}
