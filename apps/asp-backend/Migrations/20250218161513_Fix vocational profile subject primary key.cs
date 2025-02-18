using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class Fixvocationalprofilesubjectprimarykey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileVocationalSubjects",
                table: "EducationalProfileVocationalSubjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileVocationalSubjects",
                table: "EducationalProfileVocationalSubjects",
                columns: new[] { "EducationalProfileId", "SubjectId", "Year" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileVocationalSubjects",
                table: "EducationalProfileVocationalSubjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileVocationalSubjects",
                table: "EducationalProfileVocationalSubjects",
                columns: new[] { "EducationalProfileId", "SubjectId" });
        }
    }
}
