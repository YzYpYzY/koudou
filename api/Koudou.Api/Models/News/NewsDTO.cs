using Koudou.Helpers;
using Koudou.Models.Base;
using Koudou.Data.Entities;

namespace Koudou.Models.Newss
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
            RowVersion = entity.xmin;

            Title = entity.Title;
            Date = DateHelper.DateTimeToString(entity.ModificationDate);
            Creator = entity.User.Pseudo;
            Content = entity.Content;
            return this;
        }
    }

}
