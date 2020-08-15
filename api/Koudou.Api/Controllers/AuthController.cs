using System;
using api.Controllers;
using Koudou.Api.Business;
using Koudou.Api.Helpers;
using Koudou.Api.Models;
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

        [AllowAnonymous]
        [HttpPost("Register")]
        public ActionResult<TokenDTO> Register([FromBody]RegisterDTO register)
        {
            ValidateDTO(register);
            _authLogic.Register(register);
            return Authenticate(register.Pseudo, register.Password);
        }

        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public ActionResult<TokenDTO> RefreshToken([FromBody]RefreshTokenDTO token)
        {
            ValidateDTO(token);
            return _authLogic.RefreshToken(token.RefreshToken, getIpAddress());
        }
        
        [AllowAnonymous]
        [HttpPost("RevokeToken")]
        public ActionResult RevokeToken([FromBody]RefreshTokenDTO token)
        {
            ValidateDTO(token);
            _authLogic.RevokeToken(token.RefreshToken, getIpAddress());
            return Ok();
        }

        [HasAccess]
        [HttpPost("ChangePassword")]
        public OkResult ChangePassword([FromBody]ChangePasswordDTO dto)
        {
            ValidateDTO(dto);
            _authLogic.ChangePassword(dto, GetUserData().Id);
            return Ok();
        }

        private string getIpAddress()
        {
            return Request?.HttpContext?.Connection?.RemoteIpAddress?.MapToIPv4().ToString();
        }

        private ActionResult<TokenDTO> Authenticate(string pseudo, string password)
        {
            try
            {
                var token = _authLogic.Authenticate(pseudo, password, getIpAddress());

                return Ok(token);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger?.LogError(ex, $"Authentication error for user '{pseudo}': unauthorized access");
                return Unauthorized();
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, $"Authenticate error for user '{pseudo}'");
                return Problem($"Authenticate error for user '{pseudo}': {ex.Message}");
            }
        }
    }
}