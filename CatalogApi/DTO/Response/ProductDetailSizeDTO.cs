namespace CatalogApi.DTO.Response
{
    public class ProductDetailSizeDTO
    {
        public string ProductDetailId { get; set; }
        public int SizeId { get; set; }

        public virtual SizeDTO Size { get; set; }
    }
}