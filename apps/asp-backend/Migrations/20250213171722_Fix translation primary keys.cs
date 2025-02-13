using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class Fixtranslationprimarykeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherTranslations",
                table: "TeacherTranslations");

            migrationBuilder.DropIndex(
                name: "IX_TeacherTranslations_LanguageId",
                table: "TeacherTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectTranslations",
                table: "SubjectTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QualificationTranslations",
                table: "QualificationTranslations");

            migrationBuilder.DropIndex(
                name: "IX_QualificationTranslations_LanguageId",
                table: "QualificationTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AwardTranslations",
                table: "AwardTranslations");

            migrationBuilder.DropIndex(
                name: "IX_AwardTranslations_LanguageId",
                table: "AwardTranslations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherTranslations",
                table: "TeacherTranslations",
                columns: new[] { "LanguageId", "TeacherId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectTranslations",
                table: "SubjectTranslations",
                columns: new[] { "SubjectId", "LanguageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_QualificationTranslations",
                table: "QualificationTranslations",
                columns: new[] { "LanguageId", "QualificationId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AwardTranslations",
                table: "AwardTranslations",
                columns: new[] { "LanguageId", "AwardId" });

            migrationBuilder.CreateIndex(
                name: "IX_TeacherTranslations_TeacherId",
                table: "TeacherTranslations",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_QualificationTranslations_QualificationId",
                table: "QualificationTranslations",
                column: "QualificationId");

            migrationBuilder.CreateIndex(
                name: "IX_AwardTranslations_AwardId",
                table: "AwardTranslations",
                column: "AwardId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherTranslations",
                table: "TeacherTranslations");

            migrationBuilder.DropIndex(
                name: "IX_TeacherTranslations_TeacherId",
                table: "TeacherTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectTranslations",
                table: "SubjectTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QualificationTranslations",
                table: "QualificationTranslations");

            migrationBuilder.DropIndex(
                name: "IX_QualificationTranslations_QualificationId",
                table: "QualificationTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AwardTranslations",
                table: "AwardTranslations");

            migrationBuilder.DropIndex(
                name: "IX_AwardTranslations_AwardId",
                table: "AwardTranslations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherTranslations",
                table: "TeacherTranslations",
                column: "TeacherId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectTranslations",
                table: "SubjectTranslations",
                column: "SubjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QualificationTranslations",
                table: "QualificationTranslations",
                column: "QualificationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AwardTranslations",
                table: "AwardTranslations",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_TeacherTranslations_LanguageId",
                table: "TeacherTranslations",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_QualificationTranslations_LanguageId",
                table: "QualificationTranslations",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_AwardTranslations_LanguageId",
                table: "AwardTranslations",
                column: "LanguageId");
        }
    }
}
