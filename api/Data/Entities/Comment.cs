namespace koudouApi.Data.Entities
{
    public class Comment : BaseEntity
    {
        public string Content { get; set; }
        
        public int? PhotoId { get; set; }
        public Photo Photo { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        
        public Comment() : base(){}
        public Comment(string content, Photo photo, User user) : base()
        {
            this.Content = content;
            this.Photo = photo;
            this.User = user;
        }
    }
}