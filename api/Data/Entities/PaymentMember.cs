namespace koudouApi.Data.Entities {
    public class PaymentMember : BaseEntity {

        public bool Done { get; set; }
        public int? MemberId { get; set; }
        public Member Member { get; set; }
        public int? PaymentId { get; set; }
        public Payment Payment { get; set; }
        public PaymentMember() :base(){}
        public PaymentMember(bool done, Member member, Payment payment) : base() {
            this.Done = done;
            if(member != null){
                this.MemberId = member.Id;
                this.Member = member;
            }
            if (payment != null)
            {
                this.PaymentId = payment.Id;
                this.Payment = payment;
            }
        }
    }
}