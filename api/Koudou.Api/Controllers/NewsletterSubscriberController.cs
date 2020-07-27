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
    [ApiVersion("1.0")] 
    [Route("api/{v:apiVersion}/[controller]")]
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

        [HttpGet("{id:int}")]
        public NewsletterSubscriberDTO GetOne(int id)
        {
            return _newsletterSubscribersLogic.GetOne(id);
        }

        [HttpPost]
        public NewsletterSubscriberDTO Create(NewsletterSubscriberDTO dto)
        {
            ValidateDTO(dto);
            return _newsletterSubscribersLogic.Create(dto);
        }

        [HttpPut("{id:int}")]
        public NewsletterSubscriberDTO Update(int id, NewsletterSubscriberDTO dto)
        {
            ValidateDTO(dto);
            return _newsletterSubscribersLogic.Update(id, dto);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _newsletterSubscribersLogic.Delete(id);
            return Ok();
        }
    }
}