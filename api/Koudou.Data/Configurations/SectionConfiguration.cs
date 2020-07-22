using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class SectionConfiguration : EntityBaseConfiguration<Section>
    {
        public override void Configure(EntityTypeBuilder<Section> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Name)
                   .IsRequired()
                   .HasMaxLength(50);           
            builder.Property(e => e.Cry)
                   .HasMaxLength(100);           
            builder.Property(e => e.Sex)
                   .IsRequired()
                   .HasDefaultValue('U');         
            builder.Property(e => e.Ages)
                   .HasMaxLength(50);           
        }
    }
}