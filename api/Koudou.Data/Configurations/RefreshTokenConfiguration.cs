using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class RefreshTokenConfiguration : EntityBaseConfiguration<RefreshToken>
    {
        public override void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            base.Configure(builder);
            
            builder.Property(e => e.Token)
                   .IsRequired()
                   .HasMaxLength(250);
                   
            builder.Property(e => e.Expires)
                   .IsRequired();

            builder.Property(e => e.CreatedByIp)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(e => e.RevokedByIp)
                   .HasMaxLength(250);

            builder.Property(e => e.ReplacedByToken)
                   .HasMaxLength(250);


        }
    }
}