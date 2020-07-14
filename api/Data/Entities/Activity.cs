using System;

namespace koudouApi.Data.Entities
{
    public class Activity : BaseEntity
    {
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }

        public int? SectionId { get; set; }
        public Section Section { get; set; }

        public Activity() :base(){}
        public Activity(string name, DateTime date, string description, Section section): base(){
            this.Name = name;
            this.Date = date;
            this.Description = description;
            this.Section = section;
        }
    }
}