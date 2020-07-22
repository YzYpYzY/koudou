using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class PersonRoleConfiguration : EntityBaseConfiguration<PersonRole>
    {
        public override void Configure(EntityTypeBuilder<PersonRole> builder)
        {
            base.Configure(builder);
        }
    }
}