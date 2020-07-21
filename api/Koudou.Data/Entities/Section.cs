using System.Collections.Generic;
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class Section : EntityBase, ISoftDeletableEntity
    {
        public int OldId { get; set; }

        public string Name { get; set; }
        public string Cry { get; set; }
        public char Sex { get; set; }
        public string Ages { get; set; }
        public int? Ordre { get; set; }

        public int SectionId { get; set; }
        public int? ParentSectionId { get; set; }
        public Section ParentSection { get; set; }

        public ICollection<SectionMember> SectionMembers { get; set; }
        public ICollection<Activity> Activitys { get; set; }

        public Section() : base(){}
        public Section(string name, string cry, char sex, string ages, int? ordre) : base()
        {
            this.Name = name;
            this.Cry = cry;
            this.Sex = sex;
            this.Ages = ages;
            this.Ordre = ordre;
        }
    }
}