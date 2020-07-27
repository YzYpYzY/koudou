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

namespace Koudou.Api.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/{v:apiVersion}/[controller]")]
    [ApiController]
    public class SectionController : ControllerBase<Section, SectionController>
    {
        private readonly SectionsLogic _sectionsLogic;

        public SectionController(ILogger<SectionController> logger, SectionsLogic sectionsLogic) : base(logger){
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

        [HttpGet("{id:int}")]
        public SectionFullDTO GetOne(int id)
        {
            return _sectionsLogic.GetOne(id);
        }

        [HttpPost]
        public SectionFullDTO Create(SectionFullDTO dto)
        {
            ValidateDTO(dto);
            return _sectionsLogic.Create(dto);
        }

        [HttpPut("{id:int}")]
        public SectionFullDTO Update(int id, SectionFullDTO dto)
        {
            ValidateDTO(dto);
            return _sectionsLogic.Update(id, dto);
        }

        [HttpGet]
        [Route("Options")]
        public List<OptionDTO> GetAllAsOption()
        {
            var result = _sectionsLogic.GetAllAsOptions();
            return result;
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _sectionsLogic.Delete(id);
            return Ok();
        }
    }
}