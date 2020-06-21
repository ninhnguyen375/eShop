namespace MessageTypes
{
    public class ProductUpdateStockMessage
    {
        public string SpecificProductId { get; set; }
        public int Stock { get; set; }
    }
}