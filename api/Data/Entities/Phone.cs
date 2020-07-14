namespace koudouApi.Data.Entities
{
    public class Phone : BaseEntity
    {
        public string Numer { get; set; }
        public PhoneType Type { get; set; }

        public int? PersonId { get; set; }
        public Person Person { get; set; }
        public int? FamilyId { get; set; }
        public Family Family { get; set; }

        public Phone(){}
        public Phone(string numer, PhoneType type) : base()
        {
            this.Numer = numer;
            this.Type = type;
        }
    }

    public enum PhoneType
    {
        Personal,
        Mother,
        Father,
        Unknow
    }
}