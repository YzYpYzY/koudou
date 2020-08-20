using System;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace Koudou.Security
{
    public static class ClaimsByRole
    {
        public static readonly List<ClaimTypes> AdminClaims = new List<ClaimTypes>(){
            ClaimTypes.AccessNews,
            ClaimTypes.CreateNews,
            ClaimTypes.ReadNews,
            ClaimTypes.UpdateNews,
            ClaimTypes.DeleteNews,
            ClaimTypes.AccessSection,
            ClaimTypes.CreateSection,
            ClaimTypes.ReadSection,
            ClaimTypes.UpdateSection,
            ClaimTypes.DeleteSection,
            ClaimTypes.AccessMember,
            ClaimTypes.CreateMember,
            ClaimTypes.ReadMember,
            ClaimTypes.UpdateMember,
            ClaimTypes.DeleteMember,
            ClaimTypes.ReadRole,
            ClaimTypes.ReadMailing,
            ClaimTypes.ReadPhoto,
            ClaimTypes.ReadPayment,
        };

        public static readonly List<ClaimTypes> MemberClaims = new List<ClaimTypes>(){
            ClaimTypes.AccessNews,
            ClaimTypes.ReadNews,
            ClaimTypes.AccessSection,
            ClaimTypes.ReadSection,
            ClaimTypes.AccessMember,
            ClaimTypes.ReadMember,
            ClaimTypes.ReadRole,
        };
    }
}