using Koudou.Data.Entities;
using Koudou.Models.Base;

namespace Koudou.Api.Models{
    public class ChangePasswordDTO : BaseDTO<User, ChangePasswordDTO>
    {
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
        public override void Validate(){
            ValidateStringNotEmpty(nameof(Password), this.Password);
            ValidateStringNotEmpty(nameof(NewPassword), this.NewPassword);
            ValidatePasswordComplexity(nameof(NewPassword), this.NewPassword);
            ValidateSame(nameof(NewPassword), this.NewPassword, nameof(ConfirmNewPassword), this.ConfirmNewPassword);
        }
    }

}
