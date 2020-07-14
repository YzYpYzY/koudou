using System;
using System.Linq;
using System.Linq.Expressions;
using koudouApi.Business.Exceptions;
using koudouApi.Data;
using koudouApi.Data.Entities;
using koudouApi.Models.Albums;
using koudouApi.Models.Base;
using KoudouApi.Business;
using Microsoft.EntityFrameworkCore;

namespace koudouApi.Business
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