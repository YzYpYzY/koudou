using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using koudouApi.Business.Exceptions;
using koudouApi.Data;
using koudouApi.Data.Entities;
using koudouApi.Models.Base;
using koudouApi.Models.Sections;
using KoudouApi.Business;
using Microsoft.EntityFrameworkCore;

namespace koudouApi.Business
{
    public class SectionsLogic : LogicBase
    {
        public SectionsLogic(KoudouContext context) : base(context){ }

        public PagedResponse<SectionDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<Section, bool>> filter = null)
        {
            var response = new PagedResponse<SectionDTO>() { Options = options };

            response.Values = Context.Sections
                                     .ComputeTotalCount(response)
                                     .Include(s => s.SectionMembers)
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<Section, SectionDTO>()
                                     .ToList();

            return response;
        }
        
        public List<OptionDTO> GetAllAsOptions()
        {
            var response = Context.Sections
                                     .AsQueryable()
                                     .ApplySort(nameof(Section.Name), SortDirection.ASC)
                                     .Select(s => new OptionDTO(){
                                         Label = s.Name,
                                         Value = s.Id.ToString()
                                     })
                                     .ToList();
            return response;
        }
    }
}