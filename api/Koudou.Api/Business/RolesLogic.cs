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
using Koudou.Models.Members;

namespace Koudou.Api.Business
{
    public class RolesLogic : LogicBase
    {
        public RolesLogic(KoudouContext context) : base(context){ }
        
        public List<OptionDTO> GetAllAsOptions()
        {
            var response = Context.Roles
                                     .AsQueryable()
                                     .ApplySort(nameof(Role.Name), SortDirection.ASC)
                                     .Select(s => new OptionDTO(){
                                         Label = s.Name,
                                         Value = s.Id.ToString()
                                     })
                                     .ToList();
            return response;
        }
    }
}