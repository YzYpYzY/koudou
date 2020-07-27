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
using Koudou.Models.Albums;
using Koudou.Models.Activities;
using Microsoft.Extensions.Logging;

namespace Koudou.Api.Controllers
{
    [ApiVersion("1.0")] 
    [Route("api/{v:apiVersion}/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase<Activity,ActivityController>
    {
        private readonly ActivitysLogic _activitysLogic;

        public ActivityController(ILogger<ActivityController> logger, ActivitysLogic activitysLogic) : base(logger){
            this._activitysLogic = activitysLogic;
        }

        [HttpGet]
        public PagedResponse<ActivityDTO> Get([FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<Activity, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = PredicateBuilder.New<Activity>();
                predicate = predicate.Or(a => a.Name.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(Activity.Name);
            }

            var result = _activitysLogic.GetAllPaged(options, predicate);

            return result;
        }

        [HttpGet("{id:int}")]
        public ActivityFullDTO GetOne(int id)
        {
            return _activitysLogic.GetOne(id);
        }

        [HttpPost]
        public ActivityFullDTO Create(ActivityFullDTO dto)
        {
            ValidateDTO(dto);
            return _activitysLogic.Create(dto);
        }

        [HttpPut("{id:int}")]
        public ActivityFullDTO Update(int id, ActivityFullDTO dto)
        {
            ValidateDTO(dto);
            return _activitysLogic.Update(id, dto);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _activitysLogic.Delete(id);
            return Ok();
        }
    }
}