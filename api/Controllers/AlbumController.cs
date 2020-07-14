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
using koudouApi.Models.Albums;

namespace koudouApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : BaseController<Section>
    {
        private readonly AlbumsLogic _albumsLogic;

        public AlbumController(AlbumsLogic albumsLogic) : base(){
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