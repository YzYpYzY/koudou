using System.Linq;
using Koudou.Models.Base;
using Koudou.Data.Entities;

namespace Koudou.Models.Members
{
    public class SectionMemberDTO : BaseDTO<SectionMember, SectionMemberDTO>
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Role { get; set; }

        public override SectionMemberDTO FromEntity(SectionMember entity)
        {
            Id = entity.Member.Id;
            RowVersion = entity.Member.xmin;
            LastName = entity.Member.Person.LastName;
            FirstName = entity.Member.Person.FirstName;
            Role = entity.Role?.Name;
            return this;
        }
    }

}
