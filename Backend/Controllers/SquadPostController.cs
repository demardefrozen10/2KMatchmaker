using _2K_Matchmaker.ICommandRepos;
using _2K_Matchmaker.WriteModels;
using Microsoft.AspNetCore.Mvc;

namespace _2K_Matchmaker.Controllers
{
    [ApiController]
    [Route("api/SquadPost")]
    public class SquadPostController : ControllerBase
    {
        private readonly ISquadPostsQueryRepo _queryRepo;
        private readonly ISquadPostsCommandRepo _commandRepo;

        public SquadPostController(ISquadPostsQueryRepo queryRepo, ISquadPostsCommandRepo commandRepo)
        {
            _queryRepo = queryRepo;
            _commandRepo = commandRepo;

        }
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetAllPosts(String? gameMode, String? platform, int? playersNeeded, int? minWinPercentage) { 
        
            var posts = await _queryRepo.GetAllSquadPosts(gameMode, platform, playersNeeded, minWinPercentage);
            if (posts == null)
            {
                return NoContent();
            }
            return Ok(posts);
        }

        [HttpGet("{username}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetPostByUsername([FromRoute] string username)
        {
            var posts = await _queryRepo.GetSquadPostByUsername(username);
            if (posts == null)
            {
                return NoContent();
            }
            return Ok(posts);

        }

        [HttpPost("savePost")]
        [ProducesResponseType(201)]
        public async Task<IActionResult> SavePost([FromBody] CreatePost newPost)
        {
            var savePost = await _commandRepo.CreatePost(newPost);

            if (savePost == null)
            {
                return NoContent();
            }

            return StatusCode(201, savePost);
        }

        [HttpDelete("deletePost/{postId}")]
        public async Task<IActionResult> DeletePost([FromRoute] Guid postId)
        {
            var deletePost = await _commandRepo.DeletePost(postId);

            if (!deletePost)
            {
                return BadRequest();
            }

            return Ok(new { message = "Deleted post!" });
        }

    }
}
