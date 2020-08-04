using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class PersonConfiguration : EntityBaseConfiguration<Person>
    {
        public override void Configure(EntityTypeBuilder<Person> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.LastName)
                   .HasMaxLength(50);           

            builder.Property(e => e.FirstName)
                   .HasMaxLength(50);

            builder.Property(e => e.Email)
                   .HasMaxLength(50);

            builder.Property(e => e.Comment)
                   .HasMaxLength(250);

            builder.Property(p => p.Sex)
                .HasDefaultValue('U');
        }
    }
}