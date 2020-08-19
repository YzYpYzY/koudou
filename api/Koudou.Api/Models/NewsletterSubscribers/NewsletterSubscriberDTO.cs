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
            RowVersion = entity.xmin;

            Email = entity.Email;
            Name = entity.Name;
            return this;
        }

        public override void Validate()
        {
            ValidateStringIsEmail(nameof(Email), this.Email);
            ValidateStringNotEmpty(nameof(Name), this.Name);
        }
    }

}
