using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class ClaimRoleConfiguration : EntityBaseConfiguration<ClaimRole>
    {
        public override void Configure(EntityTypeBuilder<ClaimRole> builder)
        {
            base.Configure(builder);
        }
    }
}