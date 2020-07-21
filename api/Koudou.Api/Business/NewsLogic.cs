using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Albums;
using Koudou.Models.Base;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;

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
 
    }
}