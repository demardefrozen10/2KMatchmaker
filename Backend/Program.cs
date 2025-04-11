using _2K_Matchmaker.QueryRepos;
using _2K_Matchmaker.Database;
using Microsoft.EntityFrameworkCore;
using _2K_Matchmaker.CommandRepos;
using FluentValidation.AspNetCore;
using FluentValidation;
using _2K_Matchmaker.Validators;
using _2K_Matchmaker.ICommandRepos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using _2K_Matchmaker.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<RegisterRequestValidator>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<_2KMatchmakerDbContext>(options => options.UseSqlServer((builder.Configuration.GetConnectionString("DefaultConnection"))));
builder.Services.AddScoped<ISquadPostsCommandRepo, SquadPostsCommandRepo>();
builder.Services.AddScoped<ISquadPostsQueryRepo, SquadPostsQueryRepo>();
builder.Services.AddScoped<IUserCommandRepo, UserCommandRepo>();

builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<_2KMatchmakerDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAutoMapper(typeof(Program));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Disable for local development
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSecretKeyHere123!")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowReactApp");

app.UseAuthentication();

app.UseAuthorization();

app.Run();

