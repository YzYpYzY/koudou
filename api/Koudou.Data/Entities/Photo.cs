using System.Collections.Generic;
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class Photo : EntityBase, ISoftDeletableEntity
    {
        public int OldId { get; set; }

        public string FileName { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public ICollection<AlbumPhoto> AlbumPhotos { get; set; }
        public Photo() : base(){}
        public Photo(string fileName, User user) : base()
        {
            this.FileName = fileName;
            if(user != null){
                this.UserId = user.Id;
                this.User = user;
            }
        }
    }
}