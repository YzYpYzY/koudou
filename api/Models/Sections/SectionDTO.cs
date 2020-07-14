using System.Linq;
using koudouApi.Data.Entities;
using koudouApi.Models.Base;

namespace koudouApi.Models.Sections
{
    public class SectionDTO : BaseDTO<Section, SectionDTO>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MemberCount { get; set; }
        public string ParentSection { get; set; }

        public override SectionDTO FromEntity(Section entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            MemberCount = entity.SectionMembers.Count();
            ParentSection = entity.ParentSection?.Name;
            return this;
        }
    }

}
