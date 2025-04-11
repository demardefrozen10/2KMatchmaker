using _2K_Matchmaker.WriteModels;
using Azure.Core;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

using LoginRequest = _2K_Matchmaker.WriteModels.LoginRequest;


namespace _2K_Matchmaker.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserCommandRepo _commandRepo;

        public UserController(IUserCommandRepo commandRepo)
        {
            _commandRepo = commandRepo;

        }

        [HttpPost("createAccount")]
        public async Task<IActionResult> CreateAccount([FromBody] WriteModels.RegisterRequest request)
        {
            var user = await _commandRepo.CreateUser(request);
            if (user == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(CreateAccount), user);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginRequest loginRequest)
        {
            var token = await _commandRepo.AuthenticateUser(loginRequest);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(new { token });
        }

        [HttpPost("validateToken")]
        public IActionResult ValidateToken([FromBody] TokenRequest token)
        {
            var result = _commandRepo.ValidateToken(token.Token);

            if (result.isValid)
            {
                return Ok (new { result });
            }

            return Unauthorized();
        }

    }
}
