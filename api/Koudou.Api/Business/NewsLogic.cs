using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Base;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;
using Koudou.Models.Newss;

namespace Koudou.Api.Business
{
    public class NewsLogic : LogicBase
    {
        public NewsLogic(KoudouContext context) : base(context){ }

        public PagedResponse<NewsDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<News, bool>> filter = null)
        {
            var response = new PagedResponse<NewsDTO>() { Options = options };

            response.Values = Context.News
                                     .Include(a => a.User)
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ComputeTotalCount(response)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<News, NewsDTO>()
                                     .ToList();

            return response;
        }
 
        public NewsFullDTO GetOne(int id)
        {
            var news = Context.News
                .Include(n => n.User)
                .SingleOrDefault(n => n.Id == id);

            if (news == null)
            {
                throw new IdNotFoundRequestException(nameof(News), id);
            }

            return new NewsFullDTO().FromEntity(news);
        }

        public NewsFullDTO Create(NewsFullDTO dto, int userId)
        {
            var user = Context.Users.FirstOrDefault(u => u.Id == userId);
            if(user == null){
                throw new IdNotFoundRequestException(nameof(User), userId);
            }
            var newNews = new News(dto.Title, dto.Content, user);
            Context.Add(newNews);
            Context.SaveChanges();

            return new NewsFullDTO().FromEntity(newNews);
        }

        public NewsFullDTO Update(int id, NewsFullDTO dto)
        {
            var news = Context.News
                                .Include(n => n.User)
                                .ThenInclude(u => u.Person)
                                .SingleOrDefault(s => s.Id == id);
            if (news == null)
            {
                throw new IdNotFoundRequestException(nameof(News), id);
            }

            Context.Entry(news).OriginalValues["xmin"] = dto.RowVersion;
            news.Title = dto.Title;
            news.Content = dto.Content;

            Context.SaveChanges();

            var updatedDTO = new NewsFullDTO().FromEntity(news);

            return updatedDTO;
        }

        public void Delete(int id)
        {
            var news = Context.News.SingleOrDefault(s => s.Id == id);
            if (news == null)
            {
                throw new IdNotFoundRequestException(nameof(News), id);
            }

            Context.SoftDeleteEntity(news);
            Context.SaveChanges();
        }
    }
}