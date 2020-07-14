using System.Linq;
using koudouApi.Data.Entities;
using koudouApi.Helpers;
using koudouApi.Models.Base;

namespace koudouApi.Models.Albums
{
    public class AlbumDTO : BaseDTO<Album, AlbumDTO>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public int PhotoCount { get; set; }
        public string Creator { get; set; }

        public override AlbumDTO FromEntity(Album entity)
        {
            Id = entity.Id;
            Title = entity.Title;
            Date = DateHelper.DateTimeToString(entity.ActivityDate);
            PhotoCount = entity.AlbumPhotos.Count();
            Creator = entity.Author;
            return this;
        }
    }

}
