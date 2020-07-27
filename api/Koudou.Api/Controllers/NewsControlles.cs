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
using Koudou.Models.Sections;
using Koudou.Api.Business;
using Microsoft.Extensions.Logging;
using Koudou.Models.Newss;

namespace Koudou.Api.Controllers
{
    [ApiVersion("1.0")] 
    [Route("api/{v:apiVersion}/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase<News, NewsController>
    {
        private readonly NewsLogic _newsLogic;

        public NewsController(ILogger<NewsController> logger, NewsLogic newsLogic) : base(logger){
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

        [HttpGet("{id:int}")]
        public NewsFullDTO GetOne(int id)
        {
            return _newsLogic.GetOne(id);
        }

        [HttpPost]
        public NewsFullDTO Create(NewsFullDTO dto)
        {
            ValidateDTO(dto);
            return _newsLogic.Create(dto);
        }

        [HttpPut("{id:int}")]
        public NewsFullDTO Update(int id, NewsFullDTO dto)
        {
            ValidateDTO(dto);
            return _newsLogic.Update(id, dto);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _newsLogic.Delete(id);
            return Ok();
        }
    }
}