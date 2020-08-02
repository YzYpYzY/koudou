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
using Koudou.Api.Business.Exceptions;
using Koudou.Helpers;

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

        public PaymentDTO GetOne(int id)
        {
            var payment = Context.Payments
                                .Include(p => p.PaymentMembers)
                                .SingleOrDefault(p => p.Id == id);

            if (payment == null)
            {
                throw new IdNotFoundRequestException(nameof(Payment), id);
            }

            return new PaymentDTO().FromEntity(payment);
        }

        public PaymentDTO Create(PaymentDTO dto)
        {
            var newPayment = new Payment(dto.Name, dto.Type, dto.Amount, DateHelper.StringToDateTime(dto.Deadline));
            Context.Add(newPayment);
            Context.SaveChanges();

            return new PaymentDTO().FromEntity(newPayment);
        }

        public PaymentDTO Update(int id, PaymentDTO dto)
        {
            var payment = Context.Payments
                                .Include(p => p.PaymentMembers)
                                .SingleOrDefault(p => p.Id == id);
            if (payment == null)
            {
                throw new IdNotFoundRequestException(nameof(Payment), id);
            }

            Context.Entry(payment).OriginalValues["xmin"] = dto.RowVersion;
            payment.Name = dto.Name;
            payment.Type = dto.Type;
            payment.Amount = dto.Amount;
            payment.Deadline = DateHelper.StringToDateTime(dto.Deadline);

            Context.SaveChanges();

            var updatedDTO = new PaymentDTO().FromEntity(payment);

            return updatedDTO;
        }

        public void Delete(int id)
        {
            var payment = Context.Payments.SingleOrDefault(p => p.Id == id);
            if (payment == null)
            {
                throw new IdNotFoundRequestException(nameof(Payment), id);
            }

            Context.SoftDeleteEntity(payment);
            Context.SaveChanges();
        }
 
    }
}