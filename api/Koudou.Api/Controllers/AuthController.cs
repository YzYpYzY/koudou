using System;
using api.Controllers;
using Koudou.Api.Business;
using Koudou.Api.Models.Auth;
using Koudou.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Koudou.Api.Controllers
{
    [ApiVersion("1.0")] 
    [Route("api/{v:apiVersion}/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase<User, AuthController>
    {
        private readonly AuthLogic _authLogic;

        public AuthController(ILogger<AuthController> logger, AuthLogic authLogic) : base(logger){
            this._authLogic = authLogic;
        }

        [AllowAnonymous]
        [HttpPost("Token")]
        [Consumes("application/x-www-form-urlencoded")]
        public ActionResult<TokenDTO> AuthenticateWithForm([FromForm] SwaggerTokenRequest tokenRequest)
        {
            return Authenticate(tokenRequest.username, tokenRequest.password);
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        [Consumes("application/json")]
        public ActionResult<TokenDTO> AuthenticateWithJson([FromBody]CredentialsDTO login)
        {
            return Authenticate(login.Pseudo, login.Password);
        }

        private ActionResult<TokenDTO> Authenticate(string email, string password)
        {
            try
            {
                var token = _authLogic.Authenticate(email, password);

                return Ok(token);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger?.LogError(ex, $"Authentication error for user '{email}': unauthorized access");
                return Unauthorized(ex);
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, $"Authenticate error for user '{email}'");
                return Problem($"Authenticate error for user '{email}': {ex.Message}");
            }
        }
    }
}