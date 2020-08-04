using System.Linq;
using Koudou.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Koudou.Api.Helpers
{
    public class HasAccess : AuthorizeAttribute, IAuthorizationFilter
    {
        private ClaimTypes? _claimType;

        public HasAccess() : base()
        {
        }
        public HasAccess(ClaimTypes claimType) : base()
        {
            _claimType = claimType;
        }

        public void OnAuthorization(AuthorizationFilterContext context){
            if(context.HttpContext.User == null){
                context.Result = new UnauthorizedResult();
                return;
            }
            if(_claimType != null){
                var claims = context.HttpContext.User.Claims.ToList();
                if(!claims.Any(c => c.Value == _claimType.ToString())){
                    context.Result = new UnauthorizedResult();
                    return;
                }
            }
        }
    }
}