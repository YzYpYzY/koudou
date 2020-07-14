using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using koudouApi.Data;
using koudouApi.Data.Entities;
using api.Controllers;
using System.Linq.Expressions;
using koudouApi.Models.Base;
using LinqKit;
using koudouApi.Models.NewsletterSubscribers;
using koudouApi.Business;

namespace koudouApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsletterSubscriberController : BaseController<Member>
    {
        private readonly NewsletterSubscribersLogic _newsletterSubscribersLogic;

        public NewsletterSubscriberController(NewsletterSubscribersLogic newsletterSubscribersLogic) : base(){
            this._newsletterSubscribersLogic = newsletterSubscribersLogic;
        }

        [HttpGet]
        public PagedResponse<NewsletterSubscriberDTO> Get([FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<NewsletterSubscriber, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = PredicateBuilder.New<NewsletterSubscriber>();
                predicate = predicate.Or(n => n.Email.ToUpper().Contains(f));
                predicate = predicate.Or(n => n.Name.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(NewsletterSubscriber.Email);
            }

            var result = _newsletterSubscribersLogic.GetAllPaged(options, predicate);

            return result;
        }
    }
}