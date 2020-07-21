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
using Koudou.Api.Business;
using Koudou.Models.Members;
using Microsoft.Extensions.Logging;

namespace Koudou.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase<Member, ControllerBase>
    {
        private readonly MembersLogic _membersLogic;

        public MemberController(ILogger<MemberController> logger, MembersLogic membersLogic) : base(logger){
            this._membersLogic = membersLogic;
        }

        [HttpGet]
        public PagedResponse<MemberDTO> Get([FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<Member, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = PredicateBuilder.New<Member>();
                predicate = predicate.Or(m => m.Person.LastName.ToUpper().Contains(f));
                predicate = predicate.Or(m => m.Person.FirstName.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(Member.Id);
            }

            var result = _membersLogic.GetAllPaged(options, predicate);

            return result;
        }
    }
}