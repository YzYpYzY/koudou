using System.Linq;
using koudouApi.Models.Base;
using koudouApi.Data.Entities;

namespace koudouApi.Models.Members
{
    public class MemberDTO : BaseDTO<Member, MemberDTO>
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Section { get; set; }
        public string Role { get; set; }

        public override MemberDTO FromEntity(Member entity)
        {
            Id = entity.Id;
            LastName = entity.Person.LastName;
            FirstName = entity.Person.FirstName;
            Section = entity.SectionMembers.FirstOrDefault()?.Section.Name;
            Role = entity.Person.PersonRoles.FirstOrDefault()?.Role.Name;
            return this;
        }
    }

}
