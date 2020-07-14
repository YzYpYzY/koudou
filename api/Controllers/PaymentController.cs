using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using koudouApi.Data;
using koudouApi.Data.Entities;
using api.Controllers;
using System.Linq.Expressions;
using koudouApi.Models.Base;
using LinqKit;
using koudouApi.Models.Sections;
using koudouApi.Business;
using koudouApi.Models.Albums;
using koudouApi.Models.Payments;

namespace koudouApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : BaseController<Payment>
    {
        private readonly PaymentsLogic _paymentsLogic;

        public PaymentController(PaymentsLogic paymentsLogic) : base(){
            this._paymentsLogic = paymentsLogic;
        }

        [HttpGet]
        public PagedResponse<PaymentDTO> Get([FromQuery] PagedRequestOptions options, [FromQuery] string filter)
        {
            Expression<Func<Payment, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var f = filter.Trim().ToUpper();

                predicate = PredicateBuilder.New<Payment>();
                predicate = predicate.Or(a => a.Name.ToUpper().Contains(f));
            }

            if (string.IsNullOrWhiteSpace(options.Sort))
            {
                options.Sort = nameof(Payment.CreationDate);
            }

            var result = _paymentsLogic.GetAllPaged(options, predicate);

            return result;
        }
    }
}