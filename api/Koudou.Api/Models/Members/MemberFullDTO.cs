namespace Koudou.Models.Members
{
    public class MemberFullDTO
    {
        public int Id { get; set; }

        public string Totem { get; set; }
        public string TotemJungle { get; set; }
        public string Quali { get; set; }
        public string SectionId { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Birthdate { get; set; }
        public char Sex { get; set; }
        public string Comment { get; set; }
        public string RoleId { get; set; }
        public int? FamilyId { get; set; }
        public int? Family2Id { get; set; }

        public string Street { get; set; }
        public string Number { get; set; }
        public string Box { get; set; }
        public string PostalCode { get; set; }  
        public string City { get; set; }
    }
}
