using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTeacherAwardConnection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Awards_Teachers_TeacherId",
                table: "Awards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_TeacherId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "Awards");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "EducationalProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "EducationalProfiles");

            migrationBuilder.AddColumn<int>(
                name: "TeacherId",
                table: "Awards",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Awards_TeacherId",
                table: "Awards",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_Teachers_TeacherId",
                table: "Awards",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
