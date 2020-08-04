using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class UserConfiguration : EntityBaseConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);
            
            builder.Property(e => e.Pseudo)
                   .IsRequired()
                   .HasMaxLength(50);
                   
            builder.Property(e => e.Password)
                   .IsRequired()
                   .HasMaxLength(250);

            builder.Property(e => e.UtilityToken)
                   .HasMaxLength(100);

            builder.Property(e => e.IsAcceptedCondition)
                   .IsRequired()
                   .HasDefaultValue(false);
                 
        }
    }
}