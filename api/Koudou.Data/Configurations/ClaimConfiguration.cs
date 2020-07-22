using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class ClaimConfiguration : EntityBaseConfiguration<Claim>
    {
        public override void Configure(EntityTypeBuilder<Claim> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Name)
                   .IsRequired()
                   .HasMaxLength(50);
            
            builder.Property(e => e.Key)
                   .IsRequired()
                   .HasMaxLength(50);
        }
    }
}