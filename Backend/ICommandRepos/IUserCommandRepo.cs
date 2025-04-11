using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;
using Microsoft.AspNetCore.Identity.Data;

public interface IUserCommandRepo
{
    public Task<User?> CreateUser(_2K_Matchmaker.WriteModels.RegisterRequest request);

    public Task<String?> AuthenticateUser(_2K_Matchmaker.WriteModels.LoginRequest request);

    public TokenValidationResult ValidateToken(String token);
}
