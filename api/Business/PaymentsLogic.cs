using System;
using System.Linq;
using System.Linq.Expressions;
using koudouApi.Data;
using koudouApi.Data.Entities;
using koudouApi.Models.Albums;
using koudouApi.Models.Base;
using koudouApi.Models.Payments;
using KoudouApi.Business;
using Microsoft.EntityFrameworkCore;

namespace koudouApi.Business
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