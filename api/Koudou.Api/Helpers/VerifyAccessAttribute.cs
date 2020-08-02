using System.Net;
using System.Net.Http;
using System.Web;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Koudou.Api.Helpers
{
    public class VerifyAccessAttribute : ActionFilterAttribute
    {
        private int? _claimTypeId;

        public VerifyAccessAttribute()
        {}

        public VerifyAccessAttribute(int claimTypeId)
        {
            _claimTypeId = claimTypeId;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var ctrl = (_ControllerBase)actionContext.ControllerContext.Controller;

            if (ctrl.IsAuthentified)
            {
                if (ctrl.CheckClaim(_claimTypeId))
                {
                    base.OnActionExecuting(actionContext);
                    return;
                }
                else
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden, "Droits insuffisants [" + _claimTypeId +"]");
            }
            else
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "Vous n'êtes pas connecté");
        }
    }
}