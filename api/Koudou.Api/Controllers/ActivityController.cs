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
using Koudou.Models.Activitys;
using Microsoft.Extensions.Logging;

namespace Koudou.Api.Controllers
{
    [Route("api/[controller]")]
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
    }
}