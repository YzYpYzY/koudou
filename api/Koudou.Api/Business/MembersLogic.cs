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
using Koudou.Helpers;

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

        public MemberFullDTO Create(MemberFullDTO dto)
        {
            var newPerson = new Person();
            newPerson.FirstName = dto.FirstName;
            newPerson.LastName = dto.LastName;
            newPerson.Birthdate = DateHelper.StringToDateTime(dto.Birthdate);
            newPerson.Sex = dto.Sex != null ? (char) dto.Sex : 'U';
            newPerson.Comment = dto.Comment;

            Context.Add(newPerson);
            var newMember = new Member();
            Context.SaveChanges();

            newMember.Person = newPerson;
            Context.Add(newMember);
            Context.SaveChanges();

            return new MemberFullDTO().FromEntity(newMember);
        }

        public MemberFullDTO Update(int id, MemberFullDTO dto)
        {
            var member = Context.Members
                                .Include(m => m.Person)
                                .SingleOrDefault(m => m.Id == id);

            if (member == null)
            {
                throw new IdNotFoundRequestException(nameof(Member), id);
            }
        
            Context.Entry(member).OriginalValues["xmin"] = dto.RowVersion;
            member.Person.LastName = dto.LastName;
            member.Person.FirstName = dto.FirstName;
            member.Person.Birthdate = DateHelper.StringToDateTime(dto.Birthdate);
            member.Person.Sex = dto.Sex != null ? (char) dto.Sex : 'U';
            member.Person.Comment = dto.Comment;

            Context.SaveChanges();

            var newDTO = new MemberFullDTO().FromEntity(member);

            return newDTO;
        }

        public void Delete(int id)
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