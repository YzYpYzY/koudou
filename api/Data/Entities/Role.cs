using System.Collections.Generic;

namespace koudouApi.Data.Entities
{
    public class Role : BaseEntity
    {
        public int OldId { get; set; }
        public string Name { get; set; }

        public ICollection<PersonRole> PersonRoles { get; set; }

        public Role() : base() {}
        public Role(string name) : base()
        {
            this.Name = name;
        }
    }
}