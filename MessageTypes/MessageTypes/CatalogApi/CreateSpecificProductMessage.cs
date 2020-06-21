namespace MessageTypes
{
    public class CreateSpecificProductMessage
    {
        public string Id { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
    }
}