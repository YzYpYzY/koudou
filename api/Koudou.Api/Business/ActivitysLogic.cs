using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Base;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;
using Koudou.Models.Activities;
using Koudou.Api.Business.Exceptions;
using Koudou.Helpers;

namespace Koudou.Api.Business
{
    public class ActivitysLogic : LogicBase
    {
        public ActivitysLogic(KoudouContext context) : base(context){ }

        public PagedResponse<ActivityDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<Activity, bool>> filter = null)
        {
            var response = new PagedResponse<ActivityDTO>() { Options = options };

            response.Values = Context.Activities
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
 
        public ActivityFullDTO GetOne(int id)
        {
            var activity = Context.Activities
                                .SingleOrDefault(a => a.Id == id);

            if (activity == null)
            {
                throw new IdNotFoundRequestException(nameof(Activity), id);
            }

            return new ActivityFullDTO().FromEntity(activity);
        }

        public ActivityFullDTO Create(ActivityFullDTO dto)
        {
            var section = Context.Sections.SingleOrDefault(s => s.Id == dto.SectionId);
            if(section == null){
                throw new IdNotFoundRequestException(nameof(Section), dto.SectionId?.ToString());
            }
            var newActivity = new Activity(dto.Name, DateHelper.StringToDateTime(dto.Date), dto.Description, section);
            Context.Add(newActivity);
            Context.SaveChanges();

            return new ActivityFullDTO().FromEntity(newActivity);
        }

        public ActivityFullDTO Update(int id, ActivityFullDTO dto)
        {
            var activity = Context.Activities
                                .SingleOrDefault(a => a.Id == id);
            if (activity == null)
            {
                throw new IdNotFoundRequestException(nameof(Activity), id);
            }

            var section = Context.Sections
                                .SingleOrDefault(s => s.Id == id);
            if (section == null)
            {
                throw new IdNotFoundRequestException(nameof(Section), id);
            }

            Context.Entry(activity).OriginalValues["xmin"] = dto.RowVersion;
            activity.Name = dto.Name;
            activity.Date = DateHelper.StringToDateTime(dto.Date);
            activity.Description = dto.Description;
            activity.Section = section;
            Context.SaveChanges();

            var updatedDTO = new ActivityFullDTO().FromEntity(activity);

            return updatedDTO;
        }

        public void Delete(int id)
        {
            var activity = Context.Activities.SingleOrDefault(a => a.Id == id);
            if (activity == null)
            {
                throw new IdNotFoundRequestException(nameof(Activity), id);
            }

            Context.SoftDeleteEntity(activity);
            Context.SaveChanges();
        }
    }
}