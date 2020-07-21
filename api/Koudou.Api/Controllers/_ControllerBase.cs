using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Koudou.Models.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{    
    public abstract class ControllerBase<TEntity, TController> : ControllerBase<TController>
        where TEntity : EntityBase
    {
        protected ControllerBase(ILogger<TController> logger) : base(logger)
        {

        }

        protected void ValidateDTO<TDTO>(BaseDTO<TEntity, TDTO> dto) where TDTO : class
        {
            if (!dto.IsValid())
            {
                string json = JsonSerializer.Serialize(dto.ValidationErrors);
                throw new RequestException(StatusCodes.Status400BadRequest, json);
            }
        }
    }

    [ApiController, Route("api/[controller]")]
    public abstract class ControllerBase<TController> : ControllerBase
    {
        protected readonly ILogger<TController> _logger;
        protected ControllerBase(ILogger<TController> logger) : base()
        {
            _logger = logger;
        }
    }
}