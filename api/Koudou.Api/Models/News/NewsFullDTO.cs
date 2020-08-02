using System.Linq;
using Koudou.Data.Entities;
using Koudou.Helpers;
using Koudou.Models.Base;

namespace Koudou.Models.Newss
{
    public class NewsFullDTO : BaseDTO<News, NewsFullDTO>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Creator { get; set; }
        public string Content { get; set; }

        public override NewsFullDTO FromEntity(News entity)
        {
            Id = entity.Id;
            RowVersion = entity.xmin;

            Title = entity.Title;
            Date = DateHelper.DateTimeToString(entity.ModificationDate);
            Creator = entity.User.Pseudo;
            Content = entity.Content;
            return this;
        }

        public override void Validate(){
            ValidateStringNotEmpty(nameof(Title), this.Title);
            ValidateStringNotEmpty(nameof(Content), this.Content);
        }
    }

}
