using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexToVocSubj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EducationalProfileVocationalSubjects_Year",
                table: "EducationalProfileVocationalSubjects",
                column: "Year"
            );

            migrationBuilder.CreateIndex(
                name: "IX_EducationalProfileVocationalSubjects_Year_EducationalProfil~",
                table: "EducationalProfileVocationalSubjects",
                columns: new[] { "Year", "EducationalProfileId" }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EducationalProfileVocationalSubjects_Year",
                table: "EducationalProfileVocationalSubjects"
            );

            migrationBuilder.DropIndex(
                name: "IX_EducationalProfileVocationalSubjects_Year_EducationalProfil~",
                table: "EducationalProfileVocationalSubjects"
            );
        }
    }
}
