using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Mail;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Koudou.Helpers;

namespace Koudou.Models.Base
{
    public abstract class BaseDTO<TEntity, TDTO> where TDTO : class
    {
        public uint RowVersion { get; set; }
        /// <summary>
        /// Contains the list of validation errors when the DTO is invalid.
        /// </summary>
        [JsonIgnore, Newtonsoft.Json.JsonIgnore]
        public List<string> ValidationErrors { get; private set; } = new List<string>();

        /// <summary>
        /// Converts an entity of type TEntity into a DTO of type TDTO
        /// </summary>
        /// <param name="entity">The entity to convert</param>
        /// <returns>A DTO of type TDTO</returns>
        public virtual TDTO FromEntity(TEntity entity) => default(TDTO);

        /// <summary>
        /// Returns whether the object is considered as valid, following the rules defined in Validate() method.
        /// If the object is NOT valid, the list of validation errors can be found in ValidationErrors property.
        /// </summary>
        /// <returns>A boolean value indicating whether the object is valid or not.</returns>
        public bool IsValid()
        {
            this.Validate();
            return !this.ValidationErrors.Any();
        }
        public virtual void Validate()
        {
            this.ValidationErrors.Clear();
        }

        /// <summary>
        ///  Validates the input string is not null or empty
        /// </summary>
        /// <param name="propertyName">The name of the property to test</param>
        /// <param name="value">The value of the property to test</param>
        protected void ValidateStringNotEmpty(string propertyName, string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                ValidationErrors.Add($"Property [{propertyName}] must be filled");
            }
        }

        /// <summary>
        /// Validates the input string is a valid email address
        /// See https://lonewolfonline.net/validate-email-addresses/
        /// </summary>
        /// <param name="propertyName">The name of the property to test</param>
        /// <param name="value">The value of the property to test</param>
        protected void ValidateStringIsEmail(string propertyName, string value)
        {
            try
            {
                MailAddress m = new MailAddress(value);
            }
            catch (FormatException)
            {
                ValidationErrors.Add($"Property [{propertyName}] must be a valid email address");
            }
        }

        protected void ValidateStringHasNoSpace(string propertyName, string value)
        {
            if(string.IsNullOrWhiteSpace(value) || value.Any(char.IsWhiteSpace))
            {
                ValidationErrors.Add($"Property [{propertyName}] must not contain white spaces");
            }
        }

        protected void ValidateNotNull(string propertyName, object value)
        {
            if(value == null)
            {
                ValidationErrors.Add($"Property [{propertyName}] must not be null");
            }
        }

        protected void ValidateDateBefore(string propertyName, string value, DateTime upperBound)
        {
            if(DateHelper.StringToDateTime(value) < upperBound)
            {
                ValidationErrors.Add($"Date [{propertyName}] must not be earlier than {upperBound.ToShortDateString()}");
            }
        }

        protected void ValidatePasswordComplexity(string propertyName, string value)
        {
            if (!value.Any(c => char.IsLower(c)))
            {
                ValidationErrors.Add($"Property [{propertyName}] must contain a lower case letter");
            }
            if (!value.Any(c => char.IsUpper(c)))
            {
                ValidationErrors.Add($"Property [{propertyName}] must contain a upper case letter");
            }
            if (!value.Any(c => char.IsNumber(c)))
            {
                ValidationErrors.Add($"Property [{propertyName}] must contain a number");
            }
            if (value.Length < 8)
            {
                ValidationErrors.Add($"Property [{propertyName}] must be longer than 7 characters");
            }
        }

        protected void ValidateSame(string propertyName, string value, string propertyName2, string value2)
        {
            if(value != value2)
            {
                ValidationErrors.Add($"Properties [{propertyName}] and [{propertyName2}] must be equal");
            }
        }
    }
}