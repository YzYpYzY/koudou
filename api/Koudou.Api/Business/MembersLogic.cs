using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Base;
using Koudou.Models.Members;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;

namespace Koudou.Api.Business
{
    public class MembersLogic : LogicBase
    {
        public MembersLogic(KoudouContext context) : base(context){ }

        public PagedResponse<MemberDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<Member, bool>> filter = null)
        {
            var response = new PagedResponse<MemberDTO>() { Options = options };

            response.Values = Context.Members
                                     .Include(m => m.Person)
                                     .ThenInclude(mPerson => mPerson.PersonRoles)
                                     .ThenInclude(mPersonRoles => mPersonRoles.Role)
                                     .Include(m => m.SectionMembers)
                                     .ThenInclude(ms => ms.Section)
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ComputeTotalCount(response)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<Member, MemberDTO>()
                                     .ToList();

            return response;
        }

        public MemberFullDTO GetOne(int id)
        {
            var member = Context.Members
                                .Include(m => m.Person)
                                .Include("Person.PersonRoles.Role")
                                .Include(m => m.SectionMembers)
                                .ThenInclude(ms => ms.Section)
                                .SingleOrDefault(m => m.Id == id);

            if (member == null)
            {
                throw new IdNotFoundRequestException(nameof(Member), id);
            }

            return new MemberFullDTO().FromEntity(member);
        }

        // public MemberDTO CreateMember(MemberFullDTO dto)
        // {
        //     var section = Context.Sections.Find(dto.SectionId);
        //     if (section == null)
        //     {
        //         throw new IdNotFoundRequestException(nameof(Section), dto.SectionId.ToString()));
        //     }
        //     var role = Context.Roles.Find(dto.RoleId);
        //     if (role == null)
        //     {
        //         throw new IdNotFoundRequestException(nameof(Role), dto.RoleId.ToString());
        //     }
        //     var newAdress = new Adress(dto.Street, dto.Number,  dto.Box,  dto.PostalCode,  dto.City) ;
        //     var newPhone = new Phone(dto., PhoneType.Unknow);
        //     var newPersonRole = new PersonRole();
        //     var newPerson = new Person();
        //     var newMember = new Member();

        //     Context.Add(newMember);
        //     Context.SaveChanges();

        //     return new MemberDTO().FromEntity(newMember);
        // }

        // public MemberDTO UpdateMember(int id, UpdateMemberDTO dto)
        // {
        //     var member = Context.Members
        //                         .Include(m => m.Group)
        //                         .SingleOrDefault(m => m.Id == id);

        //     if (member == null)
        //     {
        //         throw new IdNotFoundRequestException(nameof(Member), id);
        //     }
        // 
        //     Context.Entry(member).OriginalValues["xmin"] = dto.RowVersion;
        //     member.CompanyName = dto.CompanyName;
        //     member.Prefix = dto.Prefix;
        //     member.Suffix = dto.Suffix;
        //     member.ShortDescription = dto.ShortDescription;
        //     member.LongDescription = dto.LongDescription;
        //     member.Email = dto.Email;
        //     member.IsActive = dto.IsActive;
        //     member.IsMember = dto.IsMember;
        //     member.IsReferenced = dto.IsReferenced;

        //     Context.SaveChanges();

        //     var newDTO = new MemberDTO().FromEntity(member);

        //     return newDTO;
        // }

        public void DeleteMember(int id)
        {
            var member = Context.Members
                                .SingleOrDefault(m => m.Id == id);

            if (member == null)
            {
                throw new IdNotFoundRequestException(nameof(Member), id);
            }

            Context.SoftDeleteEntity(member);
            // if(member.Person != null){
            //     if(member.Person.Address != null){
            //         Context.SoftDeleteEntity(member.Person.Address);
            //     }
            //     if(member.Person.Phones.Count != 0){
            //         Context.SoftDeleteEntity(member.Person.Address);
            //     }
            //     Context.SoftDeleteEntity(member.Person);
            // }
            Context.SaveChanges();
        }
    }
}