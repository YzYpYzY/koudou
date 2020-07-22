using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class SectionMemberConfiguration : EntityBaseConfiguration<SectionMember>
    {
        public override void Configure(EntityTypeBuilder<SectionMember> builder)
        {
            base.Configure(builder);          
        }
    }
}