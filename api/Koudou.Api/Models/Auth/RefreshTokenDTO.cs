using Koudou.Data.Entities;
using Koudou.Models.Base;

namespace Koudou.Api.Models{
    public class RefreshTokenDTO : BaseDTO<User, RefreshTokenDTO>
    {
        public string RefreshToken { get; set; }
        public override void Validate(){
            ValidateStringNotEmpty(nameof(RefreshToken), this.RefreshToken);
        }
    }

}
