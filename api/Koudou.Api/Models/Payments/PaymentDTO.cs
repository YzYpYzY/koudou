using System.Linq;
using Koudou.Data.Entities;
using Koudou.Helpers;
using Koudou.Models.Base;

namespace Koudou.Models.Payments
{
    public class PaymentDTO : BaseDTO<Payment, PaymentDTO>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public PaymentType Type { get; set; }
        public double Amount { get; set; }
        public string Deadline { get; set; }
        public int CountPayed { get; set; }
        public int CountTotal { get; set; }

        public override PaymentDTO FromEntity(Payment entity)
        {
            Id = entity.Id;
            RowVersion = entity.xmin;

            Name = entity.Name;
            Type = entity.Type;
            Amount = entity.Amount;
            Deadline = DateHelper.DateTimeToString(entity.Deadline);
            CountPayed = entity.PaymentMembers.Where(pm => pm.Done == true).Count();
            CountTotal = entity.PaymentMembers.Count();
            return this;
        }
    }

}
