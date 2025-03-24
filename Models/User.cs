using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace _2K_Matchmaker.Models
{
    public class User : IdentityUser<Guid>
    {
        [Key]
        public override Guid Id { get; set; }
        public ICollection<SquadPosts> SquadPosts { get; set; } = new List<SquadPosts>();


    }
}
