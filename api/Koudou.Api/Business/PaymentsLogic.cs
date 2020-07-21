using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Albums;
using Koudou.Models.Base;
using Koudou.Models.Payments;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;

namespace Koudou.Api.Business
{
    public class PaymentsLogic : LogicBase
    {
        public PaymentsLogic(KoudouContext context) : base(context){ }

        public PagedResponse<PaymentDTO> GetAllPaged(PagedRequestOptions options, Expression<Func<Payment, bool>> filter = null)
        {
            var response = new PagedResponse<PaymentDTO>() { Options = options };

            response.Values = Context.Payments
                                     .Include(a => a.PaymentMembers)
                                     .AsQueryable()
                                     .ApplyFilter(filter)
                                     .ComputeTotalCount(response)
                                     .ValidatePropertyExists(Context, options.Sort)
                                     .ApplySort(options.Sort, options.SortDirection)
                                     .ApplyPaging(options.StartIndex, options.Count)
                                     .ToDTO<Payment, PaymentDTO>()
                                     .ToList();

            return response;
        }
 
    }
}