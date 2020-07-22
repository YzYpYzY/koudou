using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class MemberConfiguration : EntityBaseConfiguration<Member>
    {
        public override void Configure(EntityTypeBuilder<Member> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Totem)
                   .HasMaxLength(100);
                   
            builder.Property(e => e.TotemJungle)
                   .HasMaxLength(100);

            builder.Property(e => e.Quali)
                   .HasMaxLength(100);
            
        }
    }
}