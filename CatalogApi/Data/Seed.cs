using System.Linq;
using CatalogApi.Domain.Models;
using CatalogApi.Infrastructure.Constant;

namespace CatalogApi.Data
{
    public static class Seed
    {
        public static void SeedCategory(AppDbContext context)
        {
            if (context == null)
                return;

            // seeding Category
            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new Category { Id = 1, Name = "Basas" },
                    new Category { Id = 2, Name = "Vintas" },
                    new Category { Id = 3, Name = "Urbas" },
                    new Category { Id = 4, Name = "Creas" }
                );
                context.SaveChanges();
            }

        }

        public static void SeedColor(AppDbContext context)
        {
            // Seeding Color
            if (!context.Colors.Any())
            {
                context.Colors.AddRange(
                    new Color { Id = 1, HexCode = "#000" },
                    new Color { Id = 2, HexCode = "#fff" }
                );
                context.SaveChanges();

            }

        }

        public static void SeedSize(AppDbContext context)
        {

            // Seeding Size
            if (!context.Sizes.Any())
            {
                for (int i = 25; i <= 44; i++)
                {
                    context.Sizes.Add(new Size { Id = i, SizeValue = i.ToString() });
                }
                context.SaveChanges();
            }
        }

        public static void SeedStyle(AppDbContext context)
        {

            // Seeding Style
            if (!context.Styles.Any())
            {
                context.Styles.AddRange(
                    new Style { Id = 1, Name = "Low Top" },
                    new Style { Id = 2, Name = "High Top" },
                    new Style { Id = 3, Name = "Slip-on" }
                );
                context.SaveChanges();
            }
        }


        public static void SeedProduct(AppDbContext context)
        {

            // Seeding product
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Product
                    {
                        Id = 1,
                        CategoryId = 1,
                        StyleId = 2,
                        Name = "Basas New Familiar",
                        Price = 700000,
                        Status = ProductStatus.New,
                        Description = @"Mang ý nghĩa là một “người bạn thân” có thể đồng hành cùng bạn trên khắp các nẻo đường,
                        “The Familiar” không mang đến những sản phẩm cầu kì phức tạp hay đủ phá cách để bạn phấn khích và 
                        mang khoe nó với nhiều người. Nó chỉ đơn giản là mang đến cho bạn một sự lựa chọn an toàn, 
                        đa-zi-năng cho một ngày học tập, làm việc, vui chơi bình dị.".ToString()
                    },
                    new Product
                    {
                        Id = 2,
                        CategoryId = 1,
                        StyleId = 1,
                        Name = "Basas Black Lace",
                        Price = 800000,
                        Status = ProductStatus.Hot,
                        Description = @"Vẫn sử dụng những màu sắc cơ bản của Basas, 
                        Basas Black Lace Pack trở nên mạnh mẻ, ấn tượng hơn khi sử dụng dây giày màu đen làm điểm nhấn cho bản 
                        phối màu trắng-đen-xám tưởng chừng quá quen thuộc. Dáng giày low top cổ điển, đây sẽ là một lựa chọn an toàn
                         nhưng không nhàm chán".ToString()
                    }
                );
                context.SaveChanges();
            }

            // seeding ProductDetail
            if (!context.SpecificProducts.Any())
            {
                context.SpecificProducts.AddRange(
                    new SpecificProduct
                    {
                        Id = "P1C1S25",
                        ProductId = 1,
                        ColorId = 1,
                        SizeId = 25,
                        Stock = 50
                    },
                    new SpecificProduct
                    {
                        Id = "P1C1S26",
                        ProductId = 1,
                        ColorId = 1,
                        SizeId = 26,
                        Stock = 50
                    },
                    new SpecificProduct
                    {
                        Id = "P1C2S25",
                        ProductId = 1,
                        ColorId = 2,
                        SizeId = 25,
                        Stock = 30
                    },
                    new SpecificProduct
                    {
                        Id = "P2C1S25",
                        ProductId = 2,
                        ColorId = 1,
                        SizeId = 25,
                        Stock = 40
                    },
                    new SpecificProduct
                    {
                        Id = "P2C2S26",
                        ProductId = 2,
                        ColorId = 2,
                        SizeId = 26,
                        Stock = 50
                    });

                context.SaveChanges();
            }

            // seeding image
            if (!context.Images.Any())
            {
                context.Images.AddRange(
                    new Image
                    {
                        ProductId = 1,
                        ColorId = 1,
                        IsDefault = false,
                        Url = "/seed-images/P1C1_ramdom1.jpg"
                    },
                    new Image
                    {
                        ProductId = 1,
                        ColorId = 1,
                        IsDefault = false,
                        Url = "/seed-images/P1C1_ramdom2.jpg"
                    },
                    new Image
                    {
                        ProductId = 1,
                        ColorId = 2,
                        IsDefault = true,
                        Url = "/seed-images/P1C2_ramdom3.jpg"
                    },
                    new Image
                    {
                        ProductId = 2,
                        ColorId = 1,
                        IsDefault = true,
                        Url = "/seed-images/P2C1_ramdom4.jpg"
                    },
                    new Image
                    {
                        ProductId = 2,
                        ColorId = 2,
                        IsDefault = true,
                        Url = "/seed-images/P2C2_ramdom5.jpg"
                    }
                );
                context.SaveChanges();
            }

        }

    }
}