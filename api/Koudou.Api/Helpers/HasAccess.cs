using System.Net;
using System.Net.Http;
using System.Web;
using api.Controllers;
using Koudou.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Koudou.Api.Helpers
{
    public class HasAccess : AuthorizeAttribute
    {
        private ClaimTypes? _claimType;

        public HasAccess()
        {
        }
        public HasAccess(ClaimTypes claimType)
        {
            _claimType = claimType;
        }

        public void OnAuthorization(AuthorizationFilterContext context){
            if(context.HttpContext.User == null){
                context.Result = new UnauthorizedResult();
                return;
            }
            if(_claimType != null){
                var claims = context.HttpContext.User.Claims;
                var claimIterator = claims.GetEnumerator();
                var claimFound = false;
                do {
                    if(claimIterator.Current.Value == _claimType.ToString()){
                        claimFound = true;
                    }
                } while(claimIterator.MoveNext());

                if(!claimFound){
                    context.Result = new UnauthorizedResult();
                    return;
                }
            }
        }
    }
}