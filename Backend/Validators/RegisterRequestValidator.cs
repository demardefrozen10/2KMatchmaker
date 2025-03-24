using _2K_Matchmaker.Database;
using _2K_Matchmaker.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace _2K_Matchmaker.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {

       private readonly _2KMatchmakerDbContext _context;
        public RegisterRequestValidator(_2KMatchmakerDbContext context)
        {
            _context = context;

            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username required")
                .Must(UsernameExists).WithMessage("Username already taken");

            RuleFor(x => x.Username)
                .Must(UsernameLength).WithMessage("Username must be at least 3 characters long");

           // RuleFor(x => x.Email).EmailAddress();

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password required")
                .Must(PasswordMustSatsifyConditions).WithMessage("Password not complex enough");


            
        }

        private bool PasswordMustSatsifyConditions(string password)
        {
            Regex validateGuidRegex = new Regex("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
            return validateGuidRegex.IsMatch(password);
        }

        private bool UsernameExists(string username)
        {
            return !_context.Users.Any(p => p.UserName == username);

        }

        private bool UsernameLength(string username)
        {
            return username.Length > 3;
        }
    }
}
