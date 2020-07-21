using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Albums;
using Koudou.Models.Base;
using Koudou.Models.Sections;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;

namespace Koudou.Api.Business
{
    public class AlbumsLogic : LogicBase
    {
        public AlbumsLogic(KoudouContext context) : base(context){ }

        public PagedResponse<AlbumDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<Album, bool>> filter = null)
        {
            var response = new PagedResponse<AlbumDTO>() { Options = options };

            response.Values = Context.Albums
                                     .Include(a => a.AlbumPhotos)
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ComputeTotalCount(response)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<Album, AlbumDTO>()
                                     .ToList();

            return response;
        }
 
    }
}