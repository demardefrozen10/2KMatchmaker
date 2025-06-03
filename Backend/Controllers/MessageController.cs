using _2K_Matchmaker.IQueryRepos;
using Microsoft.AspNetCore.Mvc;

namespace _2K_Matchmaker.Controllers
{
    [ApiController]
    [Route("api/message")]

        public class MessageController : ControllerBase
        {
            private readonly IMessageQueryRepo _queryRepo;

            public MessageController(IMessageQueryRepo queryRepo)
            {
                _queryRepo = queryRepo;
            }

            [HttpGet("recipients/{username}")]
            [ProducesResponseType(200)]
            public async Task<IActionResult> GetMessageRecipientUsernames(string username)
            {
                var recipients = await _queryRepo.GetMessageRecipientUsernames(username);
                if (recipients == null || !recipients.Any())
                {
                    return NoContent();
                }
                return Ok(recipients);
            }
        }

}
