namespace koudouApi.Data.Entities
{
    public class ClaimRole : BaseEntity
    {
        public int ClaimId { get; set; }
        public Claim Claim { get; set; }
        public int RoleId { get; set; }
        public int Role { get; set; }

        public ClaimRole() : base(){}
    }
}