namespace koudouApi.Data.Entities
{
    public class NewsletterSubscriber : BaseEntity
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