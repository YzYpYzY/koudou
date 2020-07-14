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
using koudouApi.Models.Sections;
using koudouApi.Business;
using koudouApi.Models.Albums;

namespace koudouApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : BaseController<Section>
    {
        private readonly NewsLogic _newsLogic;

        public NewsController(NewsLogic newsLogic) : base(){
            this._newsLogic = newsLogic;
        }

        [HttpGet]
        public PagedResponse<NewsDTO> Get([FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<News, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = PredicateBuilder.New<News>();
                predicate = predicate.Or(a => a.Title.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(News.CreationDate);
                options.SortDirection = SortDirection.DESC;
            }

            var result = _newsLogic.GetAllPaged(options, predicate);

            return result;
        }
    }
}