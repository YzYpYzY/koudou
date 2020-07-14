using koudouApi.Business.Exceptions;
using koudouApi.Data;
using koudouApi.Data.Entities;
using koudouApi.Utils;
using Microsoft.AspNetCore.Http;

namespace KoudouApi.Business
{
    public abstract class LogicBase
    {
        protected KoudouContext Context { get; }

        protected LogicBase(KoudouContext context)
        {
            Context = context;
        }

        protected void ValidatePropertyExists<TEntity>(string propertyName) where TEntity: BaseEntity
        {
            if (!Context.HasProperty<TEntity>(propertyName)) 
            {
                throw new RequestException(StatusCodes.Status400BadRequest, $"[{propertyName}] is not a valid sort option for entity [{nameof(TEntity)}]");
            }
        }

        protected T GetFromIdOrThrow<T>(int id) where T: koudouApi.Data.Entities.BaseEntity
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