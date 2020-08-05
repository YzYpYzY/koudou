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
    public class RoleController : ControllerBase<Role, RoleController>
    {
        private readonly RolesLogic _rolesLogic;

        public RoleController(ILogger<RoleController> logger, RolesLogic rolesLogic) : base(logger){
            this._rolesLogic = rolesLogic;
        }

        [HttpGet]
        [Route("Options")]
        [HasAccess(ClaimTypes.ReadRole)]
        public List<OptionDTO> GetAllAsOption()
        {
            var result = _rolesLogic.GetAllAsOptions();
            return result;
        }
    }
}