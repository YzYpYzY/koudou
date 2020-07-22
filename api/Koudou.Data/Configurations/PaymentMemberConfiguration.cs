using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class PaymentMemberConfiguration : EntityBaseConfiguration<PaymentMember>
    {
        public override void Configure(EntityTypeBuilder<PaymentMember> builder)
        {
            base.Configure(builder);       
        }
    }
}