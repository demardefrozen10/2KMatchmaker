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
using _2K_Matchmaker.ChatHub;
using Microsoft.AspNetCore.SignalR;

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
builder.Services.AddScoped<IMessageCommandRepo, MessageCommandRepo>();


builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<_2KMatchmakerDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials())
                            
    ;
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),

        ValidateIssuer = true,            
        ValidIssuer = "nba2kfinder.com", 

        ValidateAudience = true,        
        ValidAudience = "nba2kfinder.com",

        ValidateLifetime = false,
        ClockSkew = TimeSpan.Zero
    };

    options.Configuration = null;

    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            var issue = context.Exception.Message;
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            return Task.CompletedTask;
        },
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;

            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chathub"))
            {
                context.Token = accessToken;
            }

            return Task.CompletedTask;
        }
    };



});

builder.Services.AddSingleton<IUserIdProvider, NameUserIdProvider>();

builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();


app.UseAuthorization();

app.MapControllers();



app.MapHub<ChatHub>("/chathub").RequireAuthorization();

app.Run();
