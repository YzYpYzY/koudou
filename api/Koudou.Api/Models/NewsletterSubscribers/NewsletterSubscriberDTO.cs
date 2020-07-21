using System.Linq;
using Koudou.Data.Entities;
using Koudou.Models.Base;

namespace Koudou.Models.NewsletterSubscribers
{
    public class NewsletterSubscriberDTO : BaseDTO<NewsletterSubscriber, NewsletterSubscriberDTO>
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public override NewsletterSubscriberDTO FromEntity(NewsletterSubscriber entity)
        {
            Id = entity.Id;
            Email = entity.Email;
            Name = entity.Name;
            return this;
        }
    }

}
