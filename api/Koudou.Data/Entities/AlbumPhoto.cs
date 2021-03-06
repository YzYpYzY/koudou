using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class AlbumPhoto : EntityBase, ISoftDeletableEntity
    {
        public int Order { get; set; }
        
        public int AlbumId { get; set; }
        public Album Album { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
        
        public AlbumPhoto() : base(){}
        public AlbumPhoto(int order, int albumId, int photoId) : base()
        {
            this.Order = order;
            this.AlbumId = albumId;
            this.PhotoId = photoId;
        }
    }
}