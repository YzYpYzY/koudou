using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Koudou.Data.Entities;
using api.Controllers;
using System.Linq.Expressions;
using Koudou.Models.Base;
using LinqKit;
using Koudou.Api.Business;
using Koudou.Models.Payments;
using Microsoft.Extensions.Logging;

namespace Koudou.Api.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/{v:apiVersion}/[controller]")]
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

        [HttpGet("{id:int}")]
        public PaymentDTO GetOne(int id)
        {
            return _paymentsLogic.GetOne(id);
        }

        [HttpPost]
        public PaymentDTO Create(PaymentDTO dto)
        {
            ValidateDTO(dto);
            return _paymentsLogic.Create(dto);
        }

        [HttpPut("{id:int}")]
        public PaymentDTO Update(int id, PaymentDTO dto)
        {
            ValidateDTO(dto);
            return _paymentsLogic.Update(id, dto);
        }
        
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _paymentsLogic.Delete(id);
            return Ok();
        }
    }
}