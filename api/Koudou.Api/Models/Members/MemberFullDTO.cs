using System;
using System.Linq;
using Koudou.Data.Entities;
using Koudou.Data.Helpers;
using Koudou.Helpers;
using Koudou.Models.Base;

namespace Koudou.Models.Members
{
    public class MemberFullDTO : BaseDTO<Member, MemberFullDTO>
    {
        public int Id { get; set; }

        public string Totem { get; set; }
        public string TotemJungle { get; set; }
        public string Quali { get; set; }
        public string SectionId { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Birthdate { get; set; }
        public char? Sex { get; set; }
        public string Comment { get; set; }
        public int? FamilyId { get; set; }
        public int? Family2Id { get; set; }

        public string Street { get; set; }
        public string Number { get; set; }
        public string Box { get; set; }
        public string PostalCode { get; set; }  
        public string City { get; set; }

        public override MemberFullDTO FromEntity(Member entity)
        {
            Id = entity.Id;
            RowVersion = entity.xmin;

            Totem = entity.Totem;
            TotemJungle = entity.TotemJungle;
            Quali = entity.Quali;

            var sectionMember = entity.SectionMembers.FirstOrDefault(sm => sm.Section.ParentSectionId != null);
            if(sectionMember == null){
                sectionMember = entity.SectionMembers.FirstOrDefault();
            } 
            SectionId = sectionMember?.SectionId.ToString();

            LastName = entity.Person?.LastName;
            FirstName = entity.Person?.FirstName;
            Email = entity.Person?.Email;
            Birthdate = DateHelper.DateTimeToString(entity?.Person?.Birthdate);
            Sex = entity.Person?.Sex;
            Comment = entity.Person?.Comment;

            FamilyId = entity.Person?.FamilyId;
            Family2Id = entity.Person?.Family2Id;

            Street = entity.Person?.Address?.Street;
            Number = entity.Person?.Address?.Number;
            Box = entity.Person?.Address?.Box;
            PostalCode = entity.Person?.Address?.PostalCode;
            City = entity.Person?.Address?.City;

            return this;
        }

        public override void Validate(){
            ValidateStringNotEmpty(nameof(LastName), this.LastName);
            ValidateStringNotEmpty(nameof(FirstName), this.FirstName);
            ValidateStringIsEmail(nameof(Email), this.Email);
            if(Birthdate != null){
                ValidateDateBefore(nameof(Birthdate), this.Birthdate, DateTime.Now);
            }
        }
    }
}
