using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Koudou.Data.Entities.Bases
{
    public abstract class EntityBaseConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : EntityBase
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.UseXminAsConcurrencyToken();
            if (typeof(ISoftDeletableEntity).IsAssignableFrom(typeof(TEntity)))
            {
                builder.Property<bool>(KoudouContext.IsSoftDeletedPropertyName)
                                         .HasDefaultValue(false);

                builder.HasQueryFilter(c => EF.Property<bool>(c, KoudouContext.IsSoftDeletedPropertyName) == false);
            }
        }
    }
}