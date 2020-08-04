using System.Collections.Generic;
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class Role : EntityBase
    {
        public int OldId { get; set; }
        public string Name { get; set; }

        public ICollection<PersonRole> PersonRoles { get; set; }
        public ICollection<ClaimRole> ClaimRoles { get; set; }

        public Role() : base() {}
        public Role(string name) : base()
        {
            this.Name = name;
        }
    }
}