using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class PhoneConfiguration : EntityBaseConfiguration<Phone>
    {
        public override void Configure(EntityTypeBuilder<Phone> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Numer)
                   .IsRequired()
                   .HasMaxLength(30);           
        }
    }
}