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
using Koudou.Security;
using Koudou.Api.Helpers;
using Koudou.Models.Members;

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
        [HasAccess(ClaimTypes.ReadSection)]
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
        [HasAccess(ClaimTypes.ReadSection)]
        public SectionFullDTO GetOne(int id)
        {
            return _sectionsLogic.GetOne(id);
        }

        [HttpGet("{id:int}/Members")]
        [HasAccess(ClaimTypes.ReadSection)]
        public PagedResponse<SectionMemberDTO> GetMembers(int id, [FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<SectionMember, bool>> predicate = null;
            predicate = PredicateBuilder.New<SectionMember>();
            predicate = predicate.Or(sm => sm.SectionId == id);
            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = predicate.Or(sm => sm.Member.Person.LastName.ToUpper().Contains(f));
                predicate = predicate.Or(sm => sm.Member.Person.FirstName.ToUpper().Contains(f));
                predicate = predicate.Or(sm => sm.Role.Name.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(SectionMember.Id);
            }

            var result = _sectionsLogic.GetAllMembersPaged(id, options, predicate);

            return result;
        }

        [HttpPost]
        [HasAccess(ClaimTypes.CreateSection)]
        public SectionFullDTO Create(SectionFullDTO dto)
        {
            ValidateDTO(dto);
            return _sectionsLogic.Create(dto);
        }

        [HttpPut("{id:int}")]
        [HasAccess(ClaimTypes.UpdateSection)]
        public SectionFullDTO Update(int id, SectionFullDTO dto)
        {
            ValidateDTO(dto);
            return _sectionsLogic.Update(id, dto);
        }

        [HttpGet]
        [Route("Options")]
        [HasAccess(ClaimTypes.ReadSection)]
        public List<OptionDTO> GetAllAsOption()
        {
            var result = _sectionsLogic.GetAllAsOptions();
            return result;
        }

        [HttpDelete("{id:int}")]
        [HasAccess(ClaimTypes.DeleteSection)]
        public IActionResult Delete(int id)
        {
            _sectionsLogic.Delete(id);
            return Ok();
        }
    }
}