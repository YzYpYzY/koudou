using System;

namespace koudouApi.Data.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public bool Disabled { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }

        public BaseEntity() {
            this.Disabled = false;
        }

    }
}