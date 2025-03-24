﻿using _2K_Matchmaker.Database;
using _2K_Matchmaker.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using RegisterRequest = _2K_Matchmaker.Models.RegisterRequest;
using LoginRequest = _2K_Matchmaker.Models.LoginRequest;
using TokenValidationResult = _2K_Matchmaker.Models.TokenValidationResult;
using Microsoft.EntityFrameworkCore;


namespace _2K_Matchmaker.CommandRepos
{
    public class UserCommandRepo : IUserCommandRepo
    {
        private readonly _2KMatchmakerDbContext _context;
        private readonly PasswordHasher<IAuthRequest> _passwordHasher;
        private readonly IConfiguration _config;
        public UserCommandRepo(_2KMatchmakerDbContext context, IConfiguration config)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<IAuthRequest>();
            _config = config;
        }

        public Task<User> CreateUser(RegisterRequest request)
        {
            var hashedPassword = HashPassword(request, request.Password);

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                UserName = request.Username,
                PasswordHash = hashedPassword
            };

            _context.AddAsync(newUser);
            _context.SaveChangesAsync();
            return Task.FromResult(newUser);

        }

        public async Task<string?> AuthenticateUser(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.UserName == request.Username);

            if (user == null) return null; // User not found

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if (result == PasswordVerificationResult.Success)
            {
                return await generateJwtToken(request.Username);
            }

            return null;
        }

        public TokenValidationResult ValidateToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return new TokenValidationResult
                {
                    isValid = false,
                    Username = null
                };
            }

            return ValidateJwtToken(token);


        }

        private TokenValidationResult ValidateJwtToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler(); // ✅ Creates a token handler
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]); // ✅ Retrieves the secret key

            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true, 
                    ValidateAudience = true, 
                    ValidateLifetime = true, 
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _config["Jwt:Issuer"],
                    ValidAudience = _config["Jwt:Issuer"], 
                    IssuerSigningKey = new SymmetricSecurityKey(key) 
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

                if (validatedToken is JwtSecurityToken jwtToken)
                {
                    var username = principal.FindFirst(ClaimTypes.Name)?.Value;

                    return new TokenValidationResult
                    {
                        Username = username,
                        isValid = true
                    };
                }
            }
            catch
            {
                return new TokenValidationResult
                {
                    isValid = false
                };
            }

            return new TokenValidationResult
            {
                isValid = false
            };
        }


        private async Task<String> generateJwtToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {       
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return await Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));

        }




        private string HashPassword<T>(T request, string password) where T : IAuthRequest
        {
            return _passwordHasher.HashPassword(request, password);
        }


    }
}
