using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koudou.Api.Models.Auth
{
    /// <summary>
    /// Swagger test client authentication data
    /// </summary>
    public class SwaggerTokenRequest
    {
        public string grant_type { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
    }
}
