using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class AdressConfiguration : EntityBaseConfiguration<Adress>
    {
        public override void Configure(EntityTypeBuilder<Adress> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Street)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(e => e.Number)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.Property(e => e.Box)
                   .HasMaxLength(20);
            
            builder.Property(e => e.PostalCode)
                   .IsRequired()
                   .HasMaxLength(20);
            
            builder.Property(e => e.City)
                   .IsRequired()
                   .HasMaxLength(50);
        }
    }
}