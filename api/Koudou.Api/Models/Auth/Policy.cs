using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koudou.Api.Models.Auth
{
    internal class Policy
    {
        public string Name { get; set; }
        public string[] Claims { get; set; }
    }
}
