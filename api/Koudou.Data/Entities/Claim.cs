using System.Collections.Generic;
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class Claim : EntityBase
    {
        public string Name { get; set; }
        public string Key { get; set; }
        public ICollection<ClaimRole> ClaimRoles { get; set; }

        public Claim() : base() {}
        public Claim(string name, string key) : base()
        {
            this.Name = name;
            this.Key = key;
        }
    }
}