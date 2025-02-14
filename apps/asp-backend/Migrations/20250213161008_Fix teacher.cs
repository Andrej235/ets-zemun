using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class Fixteacher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "TeacherTranslations");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "TeacherTranslations");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Teachers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Teachers",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Teachers");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Teachers");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "TeacherTranslations",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "TeacherTranslations",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
