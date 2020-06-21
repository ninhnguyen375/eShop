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
using MassTransit;
using MessageTypes;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace CatalogApi.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IBus _bus;
        public ProductService(AppDbContext context, IBus bus, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _bus = bus;
        }
        public async Task<PagedList<Product>> ListAsync(Pagination pagination, SearchProduct search)
        {
            var queryable = _context.Products.AsQueryable();

            if (!String.IsNullOrEmpty(search.Name))
            {
                queryable = queryable.Where(c => c.Name.ToLower().Trim().Contains(search.Name.ToLower().Trim()));
            }

            return await PagedList<Product>.ToPagedListAsync(queryable, pagination.PageNumber, pagination.PageSize);
        }
        public async Task<PagedList<SpecificProduct>> ListSpecificProductAsync(Pagination pagination, SearchSpecificProduct search)
        {
            var queryable = _context.SpecificProducts.Include(x => x.Product).AsQueryable();

            if (!String.IsNullOrEmpty(search.Id))
            {
                queryable = queryable.Where(c => c.Id == search.Id);
            }
            if (!String.IsNullOrEmpty(search.Name))
            {
                queryable = queryable.Where(c => c.Product.Name.ToLower().Trim().Contains(search.Name.ToLower().Trim()));
            }
            if (search.CategoryId != 0)
            {
                queryable = queryable.Where(c => c.Product.CategoryId == search.CategoryId);
            }
            if (search.StyleId != 0)
            {
                queryable = queryable.Where(c => c.Product.StyleId == search.StyleId);
            }
            if (search.ColorId != 0)
            {
                queryable = queryable.Where(c => c.ColorId == search.ColorId);
            }
            if (search.SizeId != 0)
            {
                queryable = queryable.Where(c => c.SizeId == search.SizeId);
            }

            var list = await queryable.ToListAsync();

            var dataList = list.GroupBy(spc =>
                new { spc.ProductId, spc.ColorId },
                (key, group) => group.First());

            return PagedList<SpecificProduct>.ToPagedList(dataList, pagination.PageNumber, pagination.PageSize);
        }

        public async Task<Product> FindByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product;
        }

        public async Task<SpecificProduct> FindSpecificProductByIdAsync(string id)
        {
            var specificProduct = await _context.SpecificProducts.FindAsync(id);
            return specificProduct;
        }

        public async Task<List<ColorOfSpecificProductDTO>> GetColorsByProductId(int id)
        {
            var specificProducts = await _context.SpecificProducts
                .Where(spc => spc.ProductId == id)
                .ToListAsync();
            var data = specificProducts
                .GroupBy(spc => spc.ColorId)
                .Select(group => new ColorOfSpecificProductDTO
                {
                    Id = group.First().ColorId,
                    HexCode = group.First().Color.HexCode,
                    SpecificProductId = group.First().Id
                })
                .OrderBy(x => x.Id)
                .ToList();

            return data;
        }
        public async Task<List<SizeOfSpecificProductDTO>> GetSizes(int productId, int colorId)
        {
            var specificProducts = await _context.SpecificProducts
                .Where(spc => spc.ColorId == colorId)
                .Where(spc => spc.ProductId == productId)
                .ToListAsync();
            var data = specificProducts
                .GroupBy(spc => spc.SizeId)
                .Select(group => new SizeOfSpecificProductDTO
                {
                    Id = group.First().SizeId,
                    SizeValue = group.First().Size.SizeValue,
                    SpecificProductId = group.First().Id,
                    Stock = group.First().Stock
                })
                .OrderBy(x => x.SizeValue)
                .ToList();
            return data;
        }

        public async Task<List<SpecificProduct>> GetSpecificProductsByProductId(int id)
        {
            var specificProduct = await _context.Products
                .Include(x => x.SpecificProducts)
                .Where(x => x.Id == id)
                .Select(x => x.SpecificProducts)
                .SingleOrDefaultAsync();

            return specificProduct;
        }

        public async Task<ProductDTO> CreateAsync(CreateProductDTO createProductDTO)
        {
            var product = _mapper.Map<Product>(createProductDTO);

            await _context.AddAsync(product);
            await _context.SaveChangesAsync();

            return _mapper.Map<ProductDTO>(product);
        }


        public async Task CreateSpecificProduct(int productId, CreateSpecificProductDTO createSpecificProductDTO)
        {
            List<IFormFile> images = createSpecificProductDTO.Images;
            List<Image> imagesToAdd = new List<Image>();
            List<SpecificProduct> specificProductsToAdd = new List<SpecificProduct>();
            var product = await FindByIdAsync(productId);

            // Create directory if not Exists
            if (!Directory.Exists(Folder.RootImagePath))
            {
                Directory.CreateDirectory(Folder.RootImagePath);
            }

            for (var i = 0; i < createSpecificProductDTO.sizeIds.Count(); i += 1)
            {
                var sizeId = createSpecificProductDTO.sizeIds[i];
                string specificProductId = $"P{productId}C{createSpecificProductDTO.ColorId}S{sizeId}".ToString();

                var specificProduct = new SpecificProduct
                {
                    Id = specificProductId,
                    ProductId = productId,
                    ColorId = createSpecificProductDTO.ColorId,
                    SizeId = sizeId
                };

                await _bus.Publish(new CreateSpecificProductMessage
                {
                    Id = specificProductId,
                    Price = product.Price
                });

                specificProductsToAdd.Add(specificProduct);
            }

            // Save specific product
            await _context.SpecificProducts.AddRangeAsync(specificProductsToAdd);
            await _context.SaveChangesAsync();

            // Ko lưu image vô server nếu tạo specific product xảy ra lỗi.
            // Save db thành công thì lưu image vô server.
            for (int i = 0; i < images.Count(); i++)
            {
                var image = images[i];
                string fileName = Path.GetRandomFileName() + image.FileName;
                string publicPath = Path.Combine("/images", fileName);
                string filePath = Path.Combine(Folder.RootImagePath, fileName);

                using (var stream = System.IO.File.Create(filePath))
                {
                    await image.CopyToAsync(stream);
                }

                await _context.Images.AddAsync(
                    new Image
                    {
                        IsDefault = i == 0,
                        ProductId = productId,
                        Url = publicPath,
                        ColorId = createSpecificProductDTO.ColorId
                    }
                );
            }

            // Save images
            // await _context.Images.AddRangeAsync(imagesToAdd);
            await _context.SaveChangesAsync();
        }

        public async Task ImportSpecificProductsAsync(ImportSpecificProductsDTO import)
        {
            for (int i = 0; i < import.Items.Count(); i++)
            {
                var item = import.Items[i];
                var existing = await _context.SpecificProducts.FindAsync(item.SpecificProductId);
                var newStock = existing.Stock + item.Quantity;
                existing.Stock = newStock;

                await _bus.Publish(new ImportSpecificProductMessage
                {
                    SpecificProductId = existing.Id,
                    Stock = newStock
                });
            }

            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product, UpdateProductDTO update)
        {
            _mapper.Map<UpdateProductDTO, Product>(update, product);

            await _context.SaveChangesAsync();
        }
    }
}