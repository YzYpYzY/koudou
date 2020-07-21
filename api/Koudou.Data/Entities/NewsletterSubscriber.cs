using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class NewsletterSubscriber : EntityBase, ISoftDeletableEntity
    {
        public string Email { get; set; }
        public string Name { get; set; }

        public NewsletterSubscriber() : base(){}
        public NewsletterSubscriber(string name, string email) : base()
        {
            this.Email = email;
            this.Name = name;
        }
    }
}