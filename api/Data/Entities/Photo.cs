using System.Collections.Generic;

namespace koudouApi.Data.Entities
{
    public class Photo : BaseEntity
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