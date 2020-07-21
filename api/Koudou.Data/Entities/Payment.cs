using System;
using System.Collections;
using System.Collections.Generic;
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities {
    public class Payment : EntityBase, ISoftDeletableEntity {
        public string Name { get; set; }
        public PaymentType Type { get; set; }
        public double Amount { get; set; }
        public DateTime Deadline { get; set; }
        public ICollection<PaymentMember> PaymentMembers { get; set; }
        public Payment() :base(){}
        public Payment (string name, PaymentType type, double amount, DateTime deadline) : base() {
            this.Name = name;
            this.Type = type;
            this.Amount = amount;
            this.Deadline = deadline;
        }
    }

    public enum PaymentType {
        Cotisation,
        Camp,
        Hike,
        Autre
    }
}