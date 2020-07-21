using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class PersonRole : EntityBase, ISoftDeletableEntity
    {
        public int PersonId { get; set; }
        public Person Person { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public PersonRole() : base() {}
    }
}