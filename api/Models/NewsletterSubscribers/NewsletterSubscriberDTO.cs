using System.Linq;
using koudouApi.Data.Entities;
using koudouApi.Models.Base;

namespace koudouApi.Models.NewsletterSubscribers
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
