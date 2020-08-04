using System;
using System.Linq;
using System.Linq.Expressions;
using Koudou.Data;
using Koudou.Data.Entities;
using Koudou.Models.Activities;
using Koudou.Models.Base;
using Koudou.Api.Business;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Koudou.Api.Models;
using System.Text;
using Koudou.Api.Models.Auth;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Koudou.Api.Business.Exceptions;
using Microsoft.AspNetCore.Http;
using Koudou.Security;
using Microsoft.Extensions.Options;

namespace Koudou.Api.Business
{
    public class AuthLogic : LogicBase
    {        
        public const string PasswordsPepper = "m6qOay8EfXpDGERyHSWBWLZ7uKhGdYgX";
        private readonly SigningCredentials _signingCredentials;
        private readonly TokensSettings _tokenSettings;
        
        public AuthLogic(KoudouContext context, IOptions<TokensSettings> tokenSettings) : base(context){ 
            this._tokenSettings = tokenSettings.Value;
            var key = Encoding.UTF8.GetBytes(_tokenSettings.Secret);
            _signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
        }

        public TokenDTO Authenticate(string pseudo, string password)
        {
            var claims = new List<System.Security.Claims.Claim>();
            var expiration = DateTimeOffset.UtcNow.AddMinutes(_tokenSettings.AccessTokenExpiration);

            var user = Context.Users
            .Include(u => u.Person.PersonRoles)
            .ThenInclude(pr => pr.Role)
            .ThenInclude(r => r.ClaimRoles)
            .ThenInclude(c => c.Claim)
            .FirstOrDefault(u => u.Pseudo == pseudo);

            if(user == null){
                throw new RequestException(StatusCodes.Status401Unauthorized, "Authentication error");
            }
            if(!Password.Compare(user.Password, password, PasswordsPepper)){
                throw new RequestException(StatusCodes.Status401Unauthorized, "Authentication error");
            }
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, user.Pseudo.ToString()));
            claims.Add(new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, user.Person.Email));
            //Limited to one role
            var personRole = user.Person.PersonRoles.FirstOrDefault();
            if(personRole != null){
                var claimEntities = personRole.Role.ClaimRoles.ToList();
                foreach(var entity in claimEntities){
                    claims.Add(new System.Security.Claims.Claim("RessourceAccess", entity.Claim.Key));
                }
            }
            // TODO: add refresh token support

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiration.DateTime,
                SigningCredentials = _signingCredentials
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new TokenDTO()
            {
                access_token = tokenHandler.WriteToken(token),
                expires_in = _tokenSettings.AccessTokenExpiration * 60,
                expiration = new DateTimeOffset(token.ValidTo),
                token_type = "Bearer",
                scope = "koudou-api"
            };
        }

        public int Register(RegisterDTO register)
        {
            var newUser = new User(register.Pseudo, Password.Encode(register.Password,PasswordsPepper),false);
            var newPerson = new Person();
            newPerson.Email = register.Email;
            Context.Persons.Add(newPerson);
            var personRole = new PersonRole();
            personRole.Person = newPerson;
            newUser.Person = newPerson;
            var role = Context.Roles.FirstOrDefault(r => r.Name == "Animé");
            personRole.Role = role;
            Context.Users.Add(newUser);
            Context.SaveChanges();
            Context.PersonRoles.Add(personRole);
            return Context.SaveChanges();
        }
    }
}