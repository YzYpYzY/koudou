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

namespace koudouApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : BaseController<Section>
    {
        private readonly SectionsLogic _sectionsLogic;

        public SectionController(SectionsLogic sectionsLogic) : base(){
            this._sectionsLogic = sectionsLogic;
        }

        [HttpGet]
        public PagedResponse<SectionDTO> Get([FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<Section, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = PredicateBuilder.New<Section>();
                predicate = predicate.Or(s => s.Name.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(Section.Name);
            }

            var result = _sectionsLogic.GetAllPaged(options, predicate);

            return result;
        }

        [HttpGet]
        [Route("Options")]
        public List<OptionDTO> GetAllAsOption()
        {
            var result = _sectionsLogic.GetAllAsOptions();
            return result;
        }
    }
}