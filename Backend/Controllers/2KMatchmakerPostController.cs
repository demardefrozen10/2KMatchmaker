using _2K_Matchmaker.ICommandRepos;
using _2K_Matchmaker.Models;
using Microsoft.AspNetCore.Mvc;

namespace _2K_Matchmaker.Controllers
{
    [ApiController]
    [Route("api/2KMatchmakerPost")]
    public class _2KMatchmakerPostController: ControllerBase
    {
        private readonly ISquadPostsQueryRepo _queryRepo;
        private readonly ISquadPostsCommandRepo _commandRepo;

        public _2KMatchmakerPostController(ISquadPostsQueryRepo queryRepo, ISquadPostsCommandRepo commandRepo)
        {
            _queryRepo = queryRepo;
            _commandRepo = commandRepo;

        }
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _queryRepo.GetAllSquadPosts();
            if (posts == null)
            {
                return NoContent();
            }
            return Ok(posts);
        }

        [HttpPost("savePost")]
        [ProducesResponseType(201)]
        public async Task<IActionResult> SavePost([FromBody] SquadPosts newPost)
        {
            var savePost = await _commandRepo.CreatePost(newPost);

            if (savePost == null)
            {
                return NoContent();
            }

            return CreatedAtAction(nameof(newPost.PostId), savePost);
        }

        [HttpDelete("deletePost")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> DeletePost([FromBody] Guid PostId)
        {
            var deletePost = await _commandRepo.DeletePost(PostId);

            if (deletePost == false) {
                return BadRequest();
            }

            return Ok(new { message = "Deleted post!" });
        }

    }
}
