using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Koudou.Data;
using Koudou.Data.Entities;
using api.Controllers;
using System.Linq.Expressions;
using Koudou.Models.Base;
using LinqKit;
using Koudou.Models.NewsletterSubscribers;
using Koudou.Api.Business;
using Microsoft.Extensions.Logging;

namespace Koudou.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsletterSubscriberController : ControllerBase<NewsletterSubscriber, NewsletterSubscriberController>
    {
        private readonly NewsletterSubscribersLogic _newsletterSubscribersLogic;

        public NewsletterSubscriberController(ILogger<NewsletterSubscriberController> logger, NewsletterSubscribersLogic newsletterSubscribersLogic) : base(logger){
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