using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class AlbumConfiguration : EntityBaseConfiguration<Album>
    {
        public override void Configure(EntityTypeBuilder<Album> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Title)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(e => e.Description)
                   .IsRequired()
                   .HasMaxLength(250);

            builder.Property(e => e.Author)
                   .IsRequired()
                   .HasMaxLength(50);
        }
    }
}