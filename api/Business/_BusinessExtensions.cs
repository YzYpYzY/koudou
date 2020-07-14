using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using koudouApi.Business.Exceptions;
using koudouApi.Data;
using koudouApi.Data.Entities;
using koudouApi.Models.Base;
using koudouApi.Utils;
using LinqKit;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace koudouApi.Business
{
    public static class BusinessExtensions
    {
        public static IQueryable<TEntity> ApplyFilter<TEntity>(this IQueryable<TEntity> entities, Expression<Func<TEntity, bool>> filter) where TEntity : BaseEntity
        {
            if (filter != null)
            {
                entities = entities.AsExpandable().Where(filter);
            }

            return entities;
        }

        public static IQueryable<TEntity> ComputeTotalCount<TEntity, TDTO>(this IQueryable<TEntity> entities, PagedResponse<TDTO> response)
            where TEntity : BaseEntity
            where TDTO : BaseDTO<TEntity, TDTO>
        {
            response.TotalCount = entities.Count();
            return entities;
        }

        public static IQueryable<TEntity> ValidatePropertyExists<TEntity>(this IQueryable<TEntity> entities, KoudouContext context, string propertyName) where TEntity : BaseEntity
        {
            if (!string.IsNullOrWhiteSpace(propertyName) && !context.HasProperty<TEntity>(propertyName))
            {
                throw new RequestException(StatusCodes.Status400BadRequest, $"[{propertyName}] is not a valid sort option for entity [{typeof(TEntity).Name}]");
            }

            return entities;
        }

        public static IQueryable<TEntity> ApplySort<TEntity>(this IQueryable<TEntity> entities, string propertyName, SortDirection sortDirection) where TEntity : BaseEntity
        {
            if (!string.IsNullOrWhiteSpace(propertyName))
            {
                if (sortDirection == SortDirection.DESC)
                {
                    entities = entities.OrderByDescending(t => EF.Property<object>(t, propertyName));
                }
                else
                {
                    entities = entities.OrderBy(t => EF.Property<object>(t, propertyName));
                }
            }

            return entities;
        }

        public static IQueryable<TEntity> ApplyPaging<TEntity>(this IQueryable<TEntity> entities, int startIndex, int count) where TEntity : BaseEntity
        {
            // A count value <= 0 indicates that all records must be fetched.
            if (count >= 0)
            {
                entities = entities.Skip(startIndex).Take(count);
            }

            return entities;
        }

        public static IEnumerable<TDTO> ToDTO<TEntity, TDTO>(this IQueryable<TEntity> entities)
            where TEntity : BaseEntity
            where TDTO : BaseDTO<TEntity, TDTO>, new()
        {
            return entities.Select(e => new TDTO().FromEntity(e));
        }
    }
}