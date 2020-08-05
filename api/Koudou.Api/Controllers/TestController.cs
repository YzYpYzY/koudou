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
using Koudou.Models.Albums;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Koudou.Api.Helpers;

namespace Koudou.Api.Controllers
{
    [ApiVersion("1.0")] 
    [Route("api/{v:apiVersion}/[controller]")]
    [ApiController]
    [HasAccess]
    public class TestController : ControllerBase<TestController>
    {
        public TestController(ILogger<TestController> logger) : base(logger)
        {
        }

        [HttpGet("GetTokenInfo")]
        public string GetTokenInfo()
        {
            var claims = this.HttpContext.User.Claims.ToList();
            var result = "claims : ";
            foreach(var claim in claims){
                result += claim.Value.ToString() + " ";
            }
            return result;
        }
    }
}