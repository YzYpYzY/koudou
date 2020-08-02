using System;
using System.ComponentModel.DataAnnotations;

namespace Koudou.Data.Entities.Bases
{
    public class EntityBase
    {
        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }

        // Row version postgresql
        public uint xmin { get; set; }
        public EntityBase() {
        }

    }
}