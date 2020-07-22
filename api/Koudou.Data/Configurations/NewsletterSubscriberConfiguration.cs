using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class NewsletterSubscriberConfiguration : EntityBaseConfiguration<NewsletterSubscriber>
    {
        public override void Configure(EntityTypeBuilder<NewsletterSubscriber> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Email)
                   .IsRequired()
                   .HasMaxLength(50);
                   
            builder.Property(e => e.Name)
                   .HasMaxLength(50);
            
        }
    }
}