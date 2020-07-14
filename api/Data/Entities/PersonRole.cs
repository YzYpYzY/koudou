namespace koudouApi.Data.Entities
{
    public class PersonRole : BaseEntity
    {
        public int PersonId { get; set; }
        public Person Person { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public PersonRole() : base() {}
    }
}