using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class NewsConfiguration : EntityBaseConfiguration<News>
    {
        public override void Configure(EntityTypeBuilder<News> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Title)
                   .IsRequired()
                   .HasMaxLength(50);
                   
            builder.Property(e => e.Content)
                   .IsRequired()
                   .HasMaxLength(500);
            
        }
    }
}