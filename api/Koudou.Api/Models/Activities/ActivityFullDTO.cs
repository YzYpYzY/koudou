using System.Linq;
using Koudou.Data.Entities;
using Koudou.Helpers;
using Koudou.Models.Base;

namespace Koudou.Models.Activities
{
    public class ActivityFullDTO : BaseDTO<Activity, ActivityFullDTO>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
        public int? SectionId { get; set; }

        public override ActivityFullDTO FromEntity(Activity entity)
        {
            Id = entity.Id;
            RowVersion = entity.xmin;
            
            Name = entity.Name;
            Date = DateHelper.DateTimeToString(entity.Date);
            Description = entity.Description;
            SectionId = entity.SectionId;
            return this;
        }

        public override void Validate(){
            ValidateStringNotEmpty(nameof(Name), this.Name);
            ValidateNotNull(nameof(Date), this.Date);
            ValidateStringNotEmpty(nameof(Description), this.Description);
        }
    }

}
