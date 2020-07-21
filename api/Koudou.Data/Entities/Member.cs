using System.Collections.Generic;
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class Member : EntityBase, ISoftDeletableEntity
    {
        public int OldId { get; set; }

        public string Totem { get; set; }
        public string TotemJungle { get; set; }
        public string Quali { get; set; }

        public int PersonId { get; set; }
        public Person Person { get; set; }
        
        public ICollection<SectionMember> SectionMembers { get; set; }

        public Member() : base(){}
        public Member(string totem, string totemJungle, string quali): base()
        {
            this.Totem = totem;
            this.TotemJungle = totemJungle;
            this.Quali = quali;
        }
        public Member(int oldId, string totem, string totemJungle, string quali, int personId, Person person)
        {
            this.OldId = oldId;
            this.Totem = totem;
            this.TotemJungle = totemJungle;
            this.Quali = quali;
            this.PersonId = personId;
            this.Person = person;

        }
    }
}
