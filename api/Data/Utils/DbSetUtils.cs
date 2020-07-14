using koudouApi.Data;
using koudouApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace koudouApi.Utils
{
    public static class DbSetUtils
    {
        public static bool HasProperty<TEntity>(this KoudouContext context, string propertyName) where TEntity : BaseEntity
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