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

namespace Koudou.Api.Controllers
{
    [ApiVersion("1.0")] 
    [Route("api/{v:apiVersion}/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase<Album, AlbumController>
    {
        private readonly AlbumsLogic _albumsLogic;

        public AlbumController(ILogger<AlbumController> logger, AlbumsLogic albumsLogic) : base(logger){
            this._albumsLogic = albumsLogic;
        }

        [HttpGet]
        public PagedResponse<AlbumDTO> Get([FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<Album, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = PredicateBuilder.New<Album>();
                predicate = predicate.Or(a => a.Title.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(Album.ActivityDate);
            }

            var result = _albumsLogic.GetAllPaged(options, predicate);

            return result;
        }
    }
}