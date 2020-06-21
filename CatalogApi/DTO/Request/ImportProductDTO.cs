using System.Collections.Generic;
using CatalogApi.Domain.Models;
using CatalogApi.Infrastructure.Constant;
using Microsoft.AspNetCore.Http;

namespace CatalogApi.DTO.Request
{
    public class ImportSpecificProductDTO
    {
        public int Id { get; set; }
        public int Stock { get; set; }
    }
}