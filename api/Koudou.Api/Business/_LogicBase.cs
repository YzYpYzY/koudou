using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Koudou.Data.Utils;
using Microsoft.AspNetCore.Http;

namespace Koudou.Api.Business
{
    public abstract class LogicBase
    {
        protected KoudouContext Context { get; }

        protected LogicBase(KoudouContext context)
        {
            Context = context;
        }

        protected void ValidatePropertyExists<TEntity>(string propertyName) where TEntity: EntityBase
        {
            if (!Context.HasProperty<TEntity>(propertyName)) 
            {
                throw new RequestException(StatusCodes.Status400BadRequest, $"[{propertyName}] is not a valid sort option for entity [{nameof(TEntity)}]");
            }
        }

        protected T GetFromIdOrThrow<T>(int id) where T: Koudou.Data.Entities.Bases.EntityBase
        {
            var entity = Context.Set<T>().Find(id);
            if(entity == null)
            {
                throw new IdNotFoundRequestException(typeof(T).Name, id);
            }

            return entity;
        }
    }
}