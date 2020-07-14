namespace koudouApi.Data.Entities
{
    public class Family : BaseEntity
    {
        public int OldId { get; set; }
        public string Name { get; set; }

        public int? AdressId { get; set; }
        public Adress Adress { get; set; }
        
        public Family() : base(){}
        public Family(string name) : base()
        {
            this.Name = name;
        }
    }
}