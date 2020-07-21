using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Base;
using Koudou.Models.NewsletterSubscribers;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;

namespace Koudou.Api.Business
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