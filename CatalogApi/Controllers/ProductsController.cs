using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CatalogApi.Data;
using CatalogApi.Domain.Models;
using CatalogApi.Domain.Services;
using CatalogApi.DTO.Request;
using CatalogApi.DTO.Response;
using CatalogApi.Infrastructure.Constant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace CatalogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IColorService _colorService;
        private readonly ISizeService _sizeService;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(
            IProductService productService,
            IColorService colorService,
            ISizeService sizeService,
            AppDbContext context,
            IMapper mapper)
        {
            _productService = productService;
            _colorService = colorService;
            _sizeService = sizeService;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync([FromQuery] Pagination pagination, [FromQuery] SearchProduct search)
        {
            var products = await _productService.ListAsync(pagination, search);
            var data = _mapper.Map<List<ProductDTO>>(products);

            var listResponseDTO = new ListResponseDTO
            {
                Data = data,
                CurrentPage = products.CurrentPage,
                PageSize = products.PageSize,
                Count = products.Count,
                TotalCount = products.TotalCount,
                TotalPage = products.TotalPages
            };

            return Ok(listResponseDTO);
        }

        [HttpGet("specificProducts")]
        public async Task<IActionResult> GetSpecificProductsAsync([FromQuery] Pagination pagination, [FromQuery] SearchSpecificProduct search)
        {
            var specificProducts = await _productService.ListSpecificProductAsync(pagination, search);
            var data = _mapper.Map<List<SpecificProductDTO>>(specificProducts);

            for (var i = 0; i < data.Count(); i += 1)
            {
                var images = data[i].Color.Images;
                data[i].Color.Images = null;
                data[i].Images = images
                    .Where(img => img.ProductId == data[i].ProductId)
                    .ToList();
            }

            var listResponseDTO = new ListResponseDTO
            {
                Data = data,
                CurrentPage = specificProducts.CurrentPage,
                PageSize = specificProducts.PageSize,
                Count = specificProducts.Count,
                TotalCount = specificProducts.TotalCount,
                TotalPage = specificProducts.TotalPages
            };

            return Ok(listResponseDTO);
        }

        [HttpGet("specificProducts/{id}")]
        public async Task<IActionResult> GetSpecificProductAsync(string id)
        {
            var specificProduct = await _productService.FindSpecificProductByIdAsync(id);
            if (specificProduct == null)
            {
                return NotFound();
            }

            var colors = await _productService.GetColorsByProductId(specificProduct.ProductId);
            var sizes = await _productService.GetSizes(specificProduct.ProductId, specificProduct.ColorId);

            var mapSpecificProduct = _mapper.Map<SpecificProductDTO>(specificProduct);
            var images = mapSpecificProduct.Color.Images;
            mapSpecificProduct.Color.Images = null;
            mapSpecificProduct.Images = images
                .Where(img => img.ProductId == mapSpecificProduct.ProductId)
                .ToList();

            return Ok(new
            {
                specificProduct = mapSpecificProduct,
                colors,
                sizes
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductAsync(int id)
        {
            var product = await _productService.FindByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProductDTO>(product));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateProduct([FromForm] CreateProductDTO createProductDTO)
        {
            var productDTO = await _productService.CreateAsync(createProductDTO);

            return Ok(productDTO);
        }

        [HttpPost("{id}/SpecificProducts")]
        public async Task<ActionResult> CreateSpecificProduct(int id, [FromForm] CreateSpecificProductDTO createSpecificProductDTO)
        {
            if (createSpecificProductDTO.sizeIds == null)
            {
                return BadRequest(new { SizeIds = "Invalid sizeIds" });
            }
            for (var i = 0; i < createSpecificProductDTO.sizeIds.Count(); i += 1)
            {
                var sizeId = createSpecificProductDTO.sizeIds[i];

                string specificProductId = $"P{id}C{createSpecificProductDTO.ColorId}S{sizeId}".ToString();

                // Check exist product
                var existingProduct = await _productService.FindByIdAsync(id);
                if (existingProduct == null)
                {
                    return BadRequest(new { ProductId = $"Product {id} not found".ToString() });
                }

                // Check exist specific product
                var existingSpecificProduct = await _productService.FindSpecificProductByIdAsync(specificProductId);
                if (existingSpecificProduct != null)
                {
                    return BadRequest(new
                    {
                        ColorId = "Specific product with this color and this size allready exist(choose another color or size)",
                        SizeId = "Specific product with this color and this size allready exist(choose another color or size)"
                    });
                }

                // Check is valid color
                var validColor = await _colorService.FindByIdAsync(createSpecificProductDTO.ColorId);
                if (validColor == null)
                {
                    return BadRequest(new
                    {
                        ColorId = "Color not found"
                    });
                }

                // Check is valid size
                var validSize = await _sizeService.FindByIdAsync(sizeId);
                if (validSize == null)
                {
                    return BadRequest(new
                    {
                        SizeId = $"Size ID {sizeId} not found".ToString()
                    });
                }
            }

            await _productService.CreateSpecificProduct(id, createSpecificProductDTO);
            return NoContent();
        }

        [HttpPost("ImportSpecificProducts")]
        public async Task<ActionResult> ImportSpecificProducts([FromBody] ImportSpecificProductsDTO import)
        {
            var errors = new List<string>();
            for (int i = 0; i < import.Items.Count(); i++)
            {
                var item = import.Items[i];
                var existingId = await _productService.FindSpecificProductByIdAsync(item.SpecificProductId);
                if (existingId == null)
                {
                    errors.Add($"Row {i + 2}. Specific product with ID {item.SpecificProductId} not exist");
                }
                if (item.Quantity < 1)
                {
                    errors.Add($"Row {i + 2}. Invalid quantity");
                }
            }

            if (errors.Count() == 0)
            {
                await _productService.ImportSpecificProductsAsync(import);
            }
            else
            {
                return BadRequest(errors);
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int Id, [FromForm] UpdateProductDTO update)
        {
            var existingProduct = await _productService.FindByIdAsync(Id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            await _productService.UpdateProductAsync(existingProduct, update);
            return NoContent();
        }

    }
}