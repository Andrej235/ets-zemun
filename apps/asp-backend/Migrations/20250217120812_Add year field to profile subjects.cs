using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class Addyearfieldtoprofilesubjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileGeneralSubjects",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "EducationalProfileVocationalSubjects",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "EducationalProfileGeneralSubjects",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileGeneralSubjects",
                table: "EducationalProfileGeneralSubjects",
                columns: new[] { "EducationalProfileId", "SubjectId", "Year" });

            migrationBuilder.CreateIndex(
                name: "IX_TeacherSubjects_TeacherId",
                table: "TeacherSubjects",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_EducationalProfileGeneralSubjects_Year",
                table: "EducationalProfileGeneralSubjects",
                column: "Year");

            migrationBuilder.CreateIndex(
                name: "IX_EducationalProfileGeneralSubjects_Year_EducationalProfileId",
                table: "EducationalProfileGeneralSubjects",
                columns: new[] { "Year", "EducationalProfileId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TeacherSubjects_TeacherId",
                table: "TeacherSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileGeneralSubjects",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.DropIndex(
                name: "IX_EducationalProfileGeneralSubjects_Year",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.DropIndex(
                name: "IX_EducationalProfileGeneralSubjects_Year_EducationalProfileId",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "EducationalProfileVocationalSubjects");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileGeneralSubjects",
                table: "EducationalProfileGeneralSubjects",
                columns: new[] { "EducationalProfileId", "SubjectId" });
        }
    }
}
