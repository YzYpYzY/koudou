using System;
using System.Linq;
using System.Linq.Expressions;
using koudouApi.Business.Exceptions;
using koudouApi.Data;
using koudouApi.Data.Entities;
using koudouApi.Models.Base;
using koudouApi.Models.NewsletterSubscribers;
using KoudouApi.Business;
using Microsoft.EntityFrameworkCore;

namespace koudouApi.Business
{
    public class NewsletterSubscribersLogic : LogicBase
    {
        public NewsletterSubscribersLogic(KoudouContext context) : base(context){ }

        public PagedResponse<NewsletterSubscriberDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<NewsletterSubscriber, bool>> filter = null)
        {
            var response = new PagedResponse<NewsletterSubscriberDTO>() { Options = options };

            response.Values = Context.NewsletterSubscribers
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ComputeTotalCount(response)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<NewsletterSubscriber, NewsletterSubscriberDTO>()
                                     .ToList();

            return response;
        }
 
    }
}