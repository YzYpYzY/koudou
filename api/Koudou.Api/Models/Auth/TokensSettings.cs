using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koudou.Api.Models.Auth
{
    public class TokensSettings
    {
        public string Secret { get; set; }
        public int AccessTokenExpiration { get; set; } = 30;
        public int RefreshTokenExpiration { get; set; } = 4 * 60;
    }
}
