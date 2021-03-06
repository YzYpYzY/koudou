
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class News : EntityBase, ISoftDeletableEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public News(){}
        public News(string title, string content, User user) : base()
        {
            this.Title = title;
            this.Content = content;
            if(user != null){
                this.UserId = user.Id;
                this.User = user;
            }
        }
    }
}