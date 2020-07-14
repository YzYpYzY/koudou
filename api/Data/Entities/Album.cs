using System;
using System.Collections.Generic;

namespace koudouApi.Data.Entities
{
    public class Album : BaseEntity
    {
        public int OldId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ActivityDate { get; set; }
        public string Author { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public int? SectionId { get; set; }
        public Section Section { get; set; }
        public ICollection<AlbumPhoto> AlbumPhotos { get; set; }

        public Album() : base() { }
        public Album(string title, string description, DateTime activityDate, string author)
        {
            this.Title = title;
            this.Description = description;
            this.ActivityDate = activityDate;
            this.Author = author;
        }
    }
}