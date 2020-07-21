using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class Adress : EntityBase
    {
        public string Street { get; set; }
        public string Number { get; set; }
        public string Box { get; set; }
        public string PostalCode { get; set; }  
        public string City { get; set; }

        public int OldId { get; set; }

        public Adress() :base(){}
        public Adress(string street, string number, string box, string postalCode, string city): base(){
            this.Street = street;
            this.Number = number;
            this.Box = box;
            this.PostalCode = postalCode;
            this.City = city;
        }
    }
}