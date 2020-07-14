using System.Linq;
using koudouApi.Data.Entities;
using koudouApi.Helpers;
using koudouApi.Models.Base;

namespace koudouApi.Models.Albums
{
    public class NewsDTO : BaseDTO<News, NewsDTO>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Creator { get; set; }
        public string Content { get; set; }

        public override NewsDTO FromEntity(News entity)
        {
            Id = entity.Id;
            Title = entity.Title;
            Date = DateHelper.DateTimeToString(entity.ModificationDate);
            Creator = entity.User.Pseudo;
            Content = entity.Content;

            return this;
        }
    }

}
