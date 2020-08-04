using Koudou.Data.Entities;
using Koudou.Models.Base;

namespace Koudou.Api.Models{
    public class RegisterDTO : BaseDTO<User, RegisterDTO>
    {
        public string Pseudo { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public override void Validate(){
            ValidateStringNotEmpty(nameof(Pseudo), this.Pseudo);
            ValidateStringIsEmail(nameof(Email), this.Email);
            ValidatePasswordComplexity(nameof(Password), this.Password);
            ValidateSame(nameof(Password), this.Password, nameof(ConfirmPassword), this.ConfirmPassword);
        }
    }

}
