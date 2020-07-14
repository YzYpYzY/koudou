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
using koudouApi.Business;
using koudouApi.Models.Members;

namespace koudouApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : BaseController<Member>
    {
        private readonly MembersLogic _membersLogic;

        public MemberController(MembersLogic membersLogic) : base(){
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