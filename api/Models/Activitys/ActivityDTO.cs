using System.Linq;
using koudouApi.Data.Entities;
using koudouApi.Helpers;
using koudouApi.Models.Base;

namespace koudouApi.Models.Activitys
{
    public class ActivityDTO : BaseDTO<Activity, ActivityDTO>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Section { get; set; }

        public override ActivityDTO FromEntity(Activity entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            Date = DateHelper.DateTimeToString(entity.Date);
            Section = entity.Section?.Name;
            return this;
        }
    }

}
