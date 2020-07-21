using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Helpers;
using Koudou.Models.Base;
using Koudou.Models.Sections;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;
using Koudou.Data.Helpers;

namespace Koudou.Api.Business
{
    public class SectionsLogic : LogicBase
    {
        public SectionsLogic(KoudouContext context) : base(context){ }

        public PagedResponse<SectionDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<Section, bool>> filter = null)
        {
            var response = new PagedResponse<SectionDTO>() { Options = options };

            response.Values = Context.Sections
                                     .ComputeTotalCount(response)
                                     .Include(s => s.SectionMembers)
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<Section, SectionDTO>()
                                     .ToList();

            return response;
        }
        
        public List<OptionDTO> GetAllAsOptions()
        {
            var response = Context.Sections
                                     .AsQueryable()
                                     .ApplySort(nameof(Section.Name), SortDirection.ASC)
                                     .Select(s => new OptionDTO(){
                                         Label = s.Name,
                                         Value = s.Id.ToString()
                                     })
                                     .ToList();
            return response;
        }

        public SectionFullDTO GetOne(int id)
        {
            var section = Context.Sections
                                .SingleOrDefault(s => s.Id == id);

            if (section == null)
            {
                throw new IdNotFoundRequestException(nameof(Section), id);
            }

            return new SectionFullDTO().FromEntity(section);
        }

        public SectionFullDTO Create(SectionFullDTO dto)
        {
            var parentSection = Context.Sections.SingleOrDefault(s => s.Id == dto.ParentSectionId);
            if (parentSection == null)
            {
                throw new IdNotFoundRequestException(nameof(Section), dto.ParentSectionId.ToString());
            }

            var newSection = new Section(dto.Name, dto.Cry, SexTypesConverter.FromEnum(dto.Sex), dto.Ages, null);
            newSection.ParentSectionId = dto.ParentSectionId;
            Context.Add(newSection);
            Context.SaveChanges();

            return new SectionFullDTO().FromEntity(newSection);
        }

        public SectionFullDTO Update(int id, SectionFullDTO dto)
        {
            var section = Context.Sections
                                .Include(s => s.ParentSection)
                                .SingleOrDefault(s => s.Id == id);
            if (section == null)
            {
                throw new IdNotFoundRequestException(nameof(Section), id);
            }

            if(dto.ParentSectionId != null){
                var parentSection = Context.Sections
                                    .SingleOrDefault(s => s.Id == dto.ParentSectionId);
                if (parentSection == null)
                {
                    throw new IdNotFoundRequestException(nameof(Section), id);
                }
            }

            section.Name = dto.Name;
            section.ParentSectionId = dto.ParentSectionId;
            section.Cry = dto.Cry;
            section.Ages = dto.Ages;
            section.Sex = SexTypesConverter.FromEnum(dto.Sex);

            Context.SaveChanges();

            var updatedDTO = new SectionFullDTO().FromEntity(section);

            return updatedDTO;
        }

        public void Delete(int sectionId)
        {
            var section = Context.Sections.SingleOrDefault(s => s.Id == sectionId);
            if (section == null)
            {
                throw new IdNotFoundRequestException(nameof(Section), sectionId);
            }

            Context.SoftDeleteEntity(section);
            Context.SaveChanges();
        }
    }
}