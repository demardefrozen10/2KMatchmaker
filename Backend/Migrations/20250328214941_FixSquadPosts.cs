using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2K_Matchmaker.Migrations
{
    /// <inheritdoc />
    public partial class FixSquadPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Build",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "LookingForBuild",
                table: "Posts",
                newName: "Gamertag2K");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Gamertag2K",
                table: "Posts",
                newName: "LookingForBuild");

            migrationBuilder.AddColumn<string>(
                name: "Build",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
