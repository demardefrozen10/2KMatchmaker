using _2K_Matchmaker.ICommandRepos;
using _2K_Matchmaker.IQueryRepos;
using _2K_Matchmaker.WriteModels;
using Microsoft.AspNetCore.Mvc;

namespace _2K_Matchmaker.Controllers
{
    [ApiController]
    [Route("api/message")]

    public class MessageController : ControllerBase
    {
        private readonly IMessageQueryRepo _queryRepo;
        private readonly IMessageCommandRepo _commandRepo;

        public MessageController(IMessageQueryRepo queryRepo, IMessageCommandRepo commandRepo)
        {
            _queryRepo = queryRepo;
            _commandRepo = commandRepo;
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

        [HttpGet("history")]
        public async Task<IActionResult> GetMessageHistoryByRecipientUsername(string recipientUsername, string senderUsername)
        {
            var messages = await _queryRepo.GetMessageHistoryByRecipientUsername(senderUsername, recipientUsername);
            if (messages == null || !messages.Any())
            {
                return NoContent();
            }
            return Ok(messages);
        }

        [HttpPost("sendMessage")]
        public async Task<IActionResult> SendNewMessageFromPost([FromBody] Message newMessage)
        {
            var message = await _commandRepo.SaveMessage(newMessage);

            if (message == null)
            {
                return NoContent();
            }

            return StatusCode(201, newMessage);

        }

    }
}
