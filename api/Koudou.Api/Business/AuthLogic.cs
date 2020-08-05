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
using Microsoft.AspNetCore.Mvc;

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

        public TokenDTO Authenticate(string pseudo, string password, string ipAddress)
        {
            var user = Context.Users
                .Include(u => u.Person.PersonRoles)
                .ThenInclude(pr => pr.Role)
                .ThenInclude(r => r.ClaimRoles)
                .ThenInclude(c => c.Claim)
                .FirstOrDefault(u => u.Pseudo == pseudo);

            if(user == null){
                throw new UnauthorizedAccessException();
            }
            if(!Password.Compare(user.Password, password, PasswordsPepper)){
                throw new UnauthorizedAccessException();
            }

            var tokenDto = generateToken(user);
            var refreshToken = generateRefreshToken(ipAddress);
            refreshToken.User = user;
            Context.RefreshTokens.Add(refreshToken);
            Context.SaveChanges();
            tokenDto.refresh_token = refreshToken.Token;
            return tokenDto;
        }

        public int ChangePassword(ChangePasswordDTO dto, int? userId)
        {
            var user = Context.Users
                .Include(u => u.Person.PersonRoles)
                .ThenInclude(pr => pr.Role)
                .ThenInclude(r => r.ClaimRoles)
                .ThenInclude(c => c.Claim)
                .FirstOrDefault(u => u.Id == userId);

            if(user == null){
                throw new UnauthorizedAccessException();
            }
            if(!Password.Compare(user.Password, dto.Password, PasswordsPepper)){
                throw new UnauthorizedAccessException();
            }

            user.Password = Password.Encode(dto.NewPassword,PasswordsPepper);
            return Context.SaveChanges();
        }

        private TokenDTO generateToken(User user)
        {
            var claims = new List<System.Security.Claims.Claim>();
            var expiration = DateTimeOffset.UtcNow.AddMinutes(_tokenSettings.AccessTokenExpiration);
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.PrimarySid, user.Id.ToString()));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.Pseudo.ToString()));
            claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, user.Person.Email));
            //Limited to one role
            var personRole = user.Person.PersonRoles.FirstOrDefault();
            if(personRole != null){
                var claimEntities = personRole.Role.ClaimRoles.ToList();
                foreach(var entity in claimEntities){
                    claims.Add(new System.Security.Claims.Claim("RessourceAccess", entity.Claim.Key));
                }
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiration.DateTime,
                SigningCredentials = _signingCredentials
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return new TokenDTO()
            {
                access_token = token,
                expires_in = _tokenSettings.AccessTokenExpiration * 60,
                expiration = new DateTimeOffset(securityToken.ValidTo),
                token_type = "Bearer",
                scope = "koudou-api",
                refresh_token = null
            };
        }

        public TokenDTO RefreshToken(string token, string ipAddress)
        {
            var user = Context.Users
                .Include(u => u.RefreshTokens)
                .Include(u => u.Person.PersonRoles)
                .ThenInclude(pr => pr.Role)
                .ThenInclude(r => r.ClaimRoles)
                .ThenInclude(c => c.Claim)
                .SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
            
            // return null if no user found with token
            if (user == null) {
                throw new RequestException(StatusCodes.Status401Unauthorized);
            }

            var refreshToken = user.RefreshTokens.SingleOrDefault(x => x.Token == token);

            if(refreshToken != null){
                // return null if token is no longer active
                if (!refreshToken.IsActive) return null;

                // replace old refresh token with a new one and save
                var newRefreshToken = generateRefreshToken(ipAddress);
                refreshToken.Revoked = DateTime.UtcNow;
                refreshToken.RevokedByIp = ipAddress;
                refreshToken.ReplacedByToken = newRefreshToken.Token;
                user.RefreshTokens.Add(newRefreshToken);
                Context.Update(user);
                Context.SaveChanges();

                // generate new jwt
                var newToken = generateToken(user);
                newToken.refresh_token = refreshToken.Token;
                return newToken;
            }
            throw new RequestException(StatusCodes.Status401Unauthorized);
        }

        public bool RevokeToken(string token, string ipAddress)
        {
            var user = Context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
            
            // return false if no user found with token
            if (user == null) return false;

            var refreshToken = user.RefreshTokens.SingleOrDefault(u => u.Token == token);

            // return false if token is not active
            if(refreshToken != null){
                if (!refreshToken.IsActive) return false;
                // revoke token and save
                refreshToken.Revoked = DateTime.UtcNow;
                refreshToken.RevokedByIp = ipAddress;
                Context.Update(user);
                Context.SaveChanges();
            }

            return true;
        }

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            return new RefreshToken
                {
                    Token = RandomGenerator.GetUniqueKey(),
                    Expires = DateTime.UtcNow.AddDays(2),
                    CreationDate = DateTime.UtcNow,
                    CreatedByIp = ipAddress
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