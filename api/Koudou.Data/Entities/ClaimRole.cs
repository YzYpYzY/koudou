using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class ClaimRole : EntityBase
    {
        public int ClaimId { get; set; }
        public Claim Claim { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public ClaimRole() : base(){
        }
    }
}