using System;
using System.Collections.Generic;
using Koudou.Data.Entities.Bases;

namespace Koudou.Data.Entities
{
    public class Person : EntityBase, ISoftDeletableEntity
    {
        public int OldId { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public DateTime? Birthdate { get; set; }
        public char Sex { get; set; }
        public string Comment { get; set; }

        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
        public int? AddressId { get; set; }
        public Adress Address { get; set; }

        public int? FamilyId { get; set; }
        public Family Family { get; set; }
        public int? Family2Id { get; set; }
        public Family Family2 { get; set; }

        public ICollection<PersonRole> PersonRoles { get; set; }
        public ICollection<PaymentMember> PaymentMembers { get; set; }
        public ICollection<Phone> Phones { get; set; }

        public Person() : base() {}
        public Person(string lastName, string firstName, string email, DateTime? birthdate, char sex, string comment) : base()
        {
            this.LastName = lastName;
            this.FirstName = firstName;
            this.Email = email;
            this.Birthdate = birthdate;
            this.Sex = sex;
            this.Comment = comment;
        }
    }
}