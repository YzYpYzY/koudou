using System;

namespace Koudou.Data.Entities.Bases
{
    public class EntityBase
    {
        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }

        public EntityBase() {
        }

    }
}