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
using koudouApi.Models.Activitys;

namespace koudouApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : BaseController<Section>
    {
        private readonly ActivitysLogic _activitysLogic;

        public ActivityController(ActivitysLogic activitysLogic) : base(){
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