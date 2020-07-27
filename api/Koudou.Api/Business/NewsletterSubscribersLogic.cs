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
 
        public NewsletterSubscriberDTO GetOne(int id)
        {
            var newsletterSubscriber = Context.NewsletterSubscribers
                                .SingleOrDefault(n => n.Id == id);

            if (newsletterSubscriber == null)
            {
                throw new IdNotFoundRequestException(nameof(NewsletterSubscriber), id);
            }

            return new NewsletterSubscriberDTO().FromEntity(newsletterSubscriber);
        }

        public NewsletterSubscriberDTO Create(NewsletterSubscriberDTO dto)
        {
            var newNewsletterSubscriber = new NewsletterSubscriber(dto.Name, dto.Email);
            Context.Add(newNewsletterSubscriber);
            Context.SaveChanges();

            return new NewsletterSubscriberDTO().FromEntity(newNewsletterSubscriber);
        }

        public NewsletterSubscriberDTO Update(int id, NewsletterSubscriberDTO dto)
        {
            var newsletterSubscriber = Context.NewsletterSubscribers
                                .SingleOrDefault(n => n.Id == id);
            if (newsletterSubscriber == null)
            {
                throw new IdNotFoundRequestException(nameof(NewsletterSubscriber), id);
            }

            newsletterSubscriber.Name = dto.Name;
            newsletterSubscriber.Email = dto.Email;

            Context.SaveChanges();

            var updatedDTO = new NewsletterSubscriberDTO().FromEntity(newsletterSubscriber);

            return updatedDTO;
        }

        public void Delete(int id)
        {
            var newsletterSubscriber = Context.NewsletterSubscribers.SingleOrDefault(n => n.Id == id);
            if (newsletterSubscriber == null)
            {
                throw new IdNotFoundRequestException(nameof(NewsletterSubscriber), id);
            }

            Context.SoftDeleteEntity(newsletterSubscriber);
            Context.SaveChanges();
        }
    }
}