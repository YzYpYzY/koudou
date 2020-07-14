namespace koudouApi.Data.Entities
{
    public class Claim : BaseEntity
    {
        public string Name { get; set; }
        public string Key { get; set; }

        public Claim() : base() {}
        public Claim(string name, string key) : base()
        {
            this.Name = name;
            this.Key = key;
        }
    }
}