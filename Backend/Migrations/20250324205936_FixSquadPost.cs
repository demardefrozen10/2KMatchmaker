using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2K_Matchmaker.Migrations
{
    /// <inheritdoc />
    public partial class FixSquadPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Posts",
                newName: "Platform");

            migrationBuilder.RenameColumn(
                name: "Rep",
                table: "Posts",
                newName: "Message");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "Posts",
                newName: "LookingForBuild");

            migrationBuilder.RenameColumn(
                name: "NBA2KUsername",
                table: "Posts",
                newName: "Build");

            migrationBuilder.AddColumn<int>(
                name: "WinPercentage",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WinPercentage",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "Platform",
                table: "Posts",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "Message",
                table: "Posts",
                newName: "Rep");

            migrationBuilder.RenameColumn(
                name: "LookingForBuild",
                table: "Posts",
                newName: "Position");

            migrationBuilder.RenameColumn(
                name: "Build",
                table: "Posts",
                newName: "NBA2KUsername");
        }
    }
}
