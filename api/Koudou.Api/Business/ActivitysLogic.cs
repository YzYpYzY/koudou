using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Activitys;
using Koudou.Models.Base;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;

namespace Koudou.Api.Business
{
    public class ActivitysLogic : LogicBase
    {
        public ActivitysLogic(KoudouContext context) : base(context){ }

        public PagedResponse<ActivityDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<Activity, bool>> filter = null)
        {
            var response = new PagedResponse<ActivityDTO>() { Options = options };

            response.Values = Context.Activitys
                                     .Include(a => a.Section)
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ComputeTotalCount(response)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<Activity, ActivityDTO>()
                                     .ToList();

            return response;
        }
 
    }
}