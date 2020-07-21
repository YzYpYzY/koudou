using Koudou.Data.Entities;
using Koudou.Data.Enums;
using Koudou.Data.Helpers;
using Koudou.Models.Base;

namespace Koudou.Models.Sections
{
    public class SectionFullDTO : BaseDTO<Section, SectionFullDTO>
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int? ParentSectionId { get; set; }
        public string Cry { get; set; }
        public string Ages { get; set; }
        public SexTypes Sex { get; set; }


        public override SectionFullDTO FromEntity(Section entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            ParentSectionId = entity.ParentSectionId;
            Cry = entity.Cry;
            Ages = entity.Ages;
            Sex = SexTypesConverter.FromData(entity.Sex);
            return this;
        }

    }

}
