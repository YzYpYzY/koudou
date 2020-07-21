using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class SectionMember : EntityBase, ISoftDeletableEntity
    {
        public int? RoleId { get; set; }
        public Role Role { get; set; }

        public int SectionId { get; set; }
        public Section Section { get; set; }

        public int MemberId { get; set; }
        public Member Member { get; set; }

        public SectionMember() : base(){}
        public SectionMember(int roleId, Role role, int sectionId, Section section, int memberId, Member member) : base()
        {
            this.RoleId = roleId;
            this.Role = role;
            this.SectionId = sectionId;
            this.Section = section;
            this.MemberId = memberId;
            this.Member = member;
        }
    }
}