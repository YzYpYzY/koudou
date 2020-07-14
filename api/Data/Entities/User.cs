using System.Collections.Generic;
namespace koudouApi.Data.Entities
{
    public class User : BaseEntity
    {
        public int OldId { get; set; }
        public string Pseudo { get; set; }
        public string Password { get; set; }
        public string UtilityToken { get; set; }
        public bool IsAcceptedCondition { get; set; }

        public int? personId { get; set; }
        public Person person { get; set; }

        public ICollection<Album> Albums { get; set; }

        public User() : base(){}
        public User(string pseudo, string password, bool isAcceptedCondition = false) : base()
        {
            this.Pseudo = pseudo;
            this.Password = password;
            this.IsAcceptedCondition = isAcceptedCondition;
        }
    }
}