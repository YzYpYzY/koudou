using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Koudou.Data;
using Koudou.Data.Entities;
using api.Controllers;
using System.Linq.Expressions;
using Koudou.Models.Base;
using LinqKit;
using Koudou.Models.Sections;
using Koudou.Api.Business;
using Koudou.Models.Albums;
using Koudou.Models.Payments;
using Microsoft.Extensions.Logging;

namespace Koudou.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase<Payment, PaymentController>
    {
        private readonly PaymentsLogic _paymentsLogic;

        public PaymentController(ILogger<PaymentController> logger, PaymentsLogic paymentsLogic) : base(logger){
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