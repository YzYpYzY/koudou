using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;

namespace Koudou.Data.Utils
{
    public static class DbSetUtils
    {
        public static bool HasProperty<TEntity>(this KoudouContext context, string propertyName) where TEntity : EntityBase
        {
            var type = typeof(TEntity);
            var entityType = context.Model.FindEntityType(type);

            if (entityType != null)
            {
                var prop = entityType.FindProperty(propertyName);
                if (prop != null)
                {
                    return true;
                }
            }

            return false;
        }
    }
}