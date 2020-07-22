using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class FamilyConfiguration : EntityBaseConfiguration<Family>
    {
        public override void Configure(EntityTypeBuilder<Family> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Name)
                   .IsRequired()
                   .HasMaxLength(50);
            
        }
    }
}