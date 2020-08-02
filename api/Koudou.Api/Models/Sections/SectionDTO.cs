using System.Linq;
using Koudou.Data.Entities;
using Koudou.Models.Base;

namespace Koudou.Models.Sections
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
            RowVersion = entity.xmin;

            Name = entity.Name;
            MemberCount = entity.SectionMembers.Count();
            ParentSection = entity.ParentSection?.Name;
            return this;
        }
    }

}
