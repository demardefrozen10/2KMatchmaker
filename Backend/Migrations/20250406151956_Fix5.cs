using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2K_Matchmaker.Migrations
{
    /// <inheritdoc />
    public partial class Fix5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Overall",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Overall",
                table: "Posts");
        }
    }
}
