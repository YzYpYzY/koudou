using System;
using System.Collections.Generic;

namespace koudouApi.Data.Entities
{
    public class Person : BaseEntity
    {
        public int OldId { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Birthdate { get; set; }
        public char Sex { get; set; }
        public string Phone { get; set; }
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


        public Person() : base() {}
        public Person(string lastName, string firstName, string email, string birthdate, char sex, string phone, string comment) : base()
        {
            this.LastName = lastName;
            this.FirstName = firstName;
            this.Email = email;
            this.Birthdate = birthdate;
            this.Sex = sex;
            this.Phone = phone;
            this.Comment = comment;
        }
    }
}