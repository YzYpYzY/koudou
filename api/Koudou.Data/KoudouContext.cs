using System;
using System.Configuration;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Koudou.Data.Entities;
using Koudou.Data.Entities.Bases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Koudou.Data
{
    public class KoudouContext : DbContext
    {

        public const string IsSoftDeletedPropertyName = "IsSoftDeleted";
        public KoudouContext(DbContextOptions<KoudouContext> options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }

        public DbSet<Adress> Adresses { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<AlbumPhoto> AlbumPhotos { get; set; }
        public DbSet<Claim> Claims { get; set; }
        public DbSet<ClaimRole> ClaimRoles { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<NewsletterSubscriber> NewsletterSubscribers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentMember> PaymentMembers { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<PersonRole> PersonRoles { get; set; }
        public DbSet<Phone> Phones { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<SectionMember> SectionMembers { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);

        }
        public int SaveChangesWithoutAudits()
        {
            return base.SaveChanges();
        }

        public override int SaveChanges()
        {
            AddAuditTimes();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AddAuditTimes();
            return await base.SaveChangesAsync();
        }

        private void AddAuditTimes()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is EntityBase && (x.State == EntityState.Added || x.State == EntityState.Modified));
            var now = DateTime.Now;
            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((EntityBase)entity.Entity).CreationDate = now;
                    ((EntityBase)entity.Entity).ModificationDate = now;
                }

                ((EntityBase)entity.Entity).ModificationDate = now;
            }
        }

        public void SoftDeleteEntity<TEntity>(TEntity entity)
            where TEntity : EntityBase
        {
            this.Entry(entity).Property(KoudouContext.IsSoftDeletedPropertyName).CurrentValue = true;
        }
    }
}