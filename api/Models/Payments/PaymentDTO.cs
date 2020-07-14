using System.Linq;
using koudouApi.Data.Entities;
using koudouApi.Helpers;
using koudouApi.Models.Base;

namespace koudouApi.Models.Payments
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
