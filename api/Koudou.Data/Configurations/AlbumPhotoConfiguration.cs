using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Configurations
{
    public class AlbumPhotoConfiguration : EntityBaseConfiguration<AlbumPhoto>
    {
        public override void Configure(EntityTypeBuilder<AlbumPhoto> builder)
        {
            base.Configure(builder);
        }
    }
}