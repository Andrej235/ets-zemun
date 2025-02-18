using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class Addmissingtables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AwardTranslation_Awards_AwardId",
                table: "AwardTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_AwardTranslation_Language_LanguageId",
                table: "AwardTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileGeneralSubject_EducationalProfiles_Educat~",
                table: "EducationalProfileGeneralSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileGeneralSubject_Subjects_SubjectId",
                table: "EducationalProfileGeneralSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileVocationalSubject_EducationalProfiles_Edu~",
                table: "EducationalProfileVocationalSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileVocationalSubject_Subjects_SubjectId",
                table: "EducationalProfileVocationalSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_Qualification_Teachers_TeacherId",
                table: "Qualification");

            migrationBuilder.DropForeignKey(
                name: "FK_QualificationTranslation_Language_LanguageId",
                table: "QualificationTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_QualificationTranslation_Qualification_QualificationId",
                table: "QualificationTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectTranslation_Language_LanguageId",
                table: "SubjectTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectTranslation_Subjects_SubjectId",
                table: "SubjectTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherSubject_Subjects_SubjectId",
                table: "TeacherSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherSubject_Teachers_TeacherId",
                table: "TeacherSubject");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherTranslation_Language_LanguageId",
                table: "TeacherTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherTranslation_Teachers_TeacherId",
                table: "TeacherTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherTranslation",
                table: "TeacherTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherSubject",
                table: "TeacherSubject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectTranslation",
                table: "SubjectTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QualificationTranslation",
                table: "QualificationTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Qualification",
                table: "Qualification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Language",
                table: "Language");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileVocationalSubject",
                table: "EducationalProfileVocationalSubject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileGeneralSubject",
                table: "EducationalProfileGeneralSubject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AwardTranslation",
                table: "AwardTranslation");

            migrationBuilder.RenameTable(
                name: "TeacherTranslation",
                newName: "TeacherTranslations");

            migrationBuilder.RenameTable(
                name: "TeacherSubject",
                newName: "TeacherSubjects");

            migrationBuilder.RenameTable(
                name: "SubjectTranslation",
                newName: "SubjectTranslations");

            migrationBuilder.RenameTable(
                name: "QualificationTranslation",
                newName: "QualificationTranslations");

            migrationBuilder.RenameTable(
                name: "Qualification",
                newName: "Qualifications");

            migrationBuilder.RenameTable(
                name: "Language",
                newName: "Languages");

            migrationBuilder.RenameTable(
                name: "EducationalProfileVocationalSubject",
                newName: "EducationalProfileVocationalSubjects");

            migrationBuilder.RenameTable(
                name: "EducationalProfileGeneralSubject",
                newName: "EducationalProfileGeneralSubjects");

            migrationBuilder.RenameTable(
                name: "AwardTranslation",
                newName: "AwardTranslations");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherTranslation_LanguageId",
                table: "TeacherTranslations",
                newName: "IX_TeacherTranslations_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherSubject_SubjectId",
                table: "TeacherSubjects",
                newName: "IX_TeacherSubjects_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectTranslation_LanguageId",
                table: "SubjectTranslations",
                newName: "IX_SubjectTranslations_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_QualificationTranslation_LanguageId",
                table: "QualificationTranslations",
                newName: "IX_QualificationTranslations_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_Qualification_TeacherId",
                table: "Qualifications",
                newName: "IX_Qualifications_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Language_Code",
                table: "Languages",
                newName: "IX_Languages_Code");

            migrationBuilder.RenameIndex(
                name: "IX_EducationalProfileVocationalSubject_SubjectId",
                table: "EducationalProfileVocationalSubjects",
                newName: "IX_EducationalProfileVocationalSubjects_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_EducationalProfileGeneralSubject_SubjectId",
                table: "EducationalProfileGeneralSubjects",
                newName: "IX_EducationalProfileGeneralSubjects_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_AwardTranslation_LanguageId",
                table: "AwardTranslations",
                newName: "IX_AwardTranslations_LanguageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherTranslations",
                table: "TeacherTranslations",
                column: "TeacherId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherSubjects",
                table: "TeacherSubjects",
                columns: new[] { "TeacherId", "SubjectId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectTranslations",
                table: "SubjectTranslations",
                column: "SubjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QualificationTranslations",
                table: "QualificationTranslations",
                column: "QualificationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Qualifications",
                table: "Qualifications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Languages",
                table: "Languages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileVocationalSubjects",
                table: "EducationalProfileVocationalSubjects",
                columns: new[] { "EducationalProfileId", "SubjectId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileGeneralSubjects",
                table: "EducationalProfileGeneralSubjects",
                columns: new[] { "EducationalProfileId", "SubjectId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AwardTranslations",
                table: "AwardTranslations",
                column: "AwardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AwardTranslations_Awards_AwardId",
                table: "AwardTranslations",
                column: "AwardId",
                principalTable: "Awards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AwardTranslations_Languages_LanguageId",
                table: "AwardTranslations",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileGeneralSubjects_EducationalProfiles_Educa~",
                table: "EducationalProfileGeneralSubjects",
                column: "EducationalProfileId",
                principalTable: "EducationalProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileGeneralSubjects_Subjects_SubjectId",
                table: "EducationalProfileGeneralSubjects",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileVocationalSubjects_EducationalProfiles_Ed~",
                table: "EducationalProfileVocationalSubjects",
                column: "EducationalProfileId",
                principalTable: "EducationalProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileVocationalSubjects_Subjects_SubjectId",
                table: "EducationalProfileVocationalSubjects",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Qualifications_Teachers_TeacherId",
                table: "Qualifications",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_QualificationTranslations_Languages_LanguageId",
                table: "QualificationTranslations",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QualificationTranslations_Qualifications_QualificationId",
                table: "QualificationTranslations",
                column: "QualificationId",
                principalTable: "Qualifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectTranslations_Languages_LanguageId",
                table: "SubjectTranslations",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectTranslations_Subjects_SubjectId",
                table: "SubjectTranslations",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherSubjects_Subjects_SubjectId",
                table: "TeacherSubjects",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherSubjects_Teachers_TeacherId",
                table: "TeacherSubjects",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherTranslations_Languages_LanguageId",
                table: "TeacherTranslations",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherTranslations_Teachers_TeacherId",
                table: "TeacherTranslations",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AwardTranslations_Awards_AwardId",
                table: "AwardTranslations");

            migrationBuilder.DropForeignKey(
                name: "FK_AwardTranslations_Languages_LanguageId",
                table: "AwardTranslations");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileGeneralSubjects_EducationalProfiles_Educa~",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileGeneralSubjects_Subjects_SubjectId",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileVocationalSubjects_EducationalProfiles_Ed~",
                table: "EducationalProfileVocationalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_EducationalProfileVocationalSubjects_Subjects_SubjectId",
                table: "EducationalProfileVocationalSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_Qualifications_Teachers_TeacherId",
                table: "Qualifications");

            migrationBuilder.DropForeignKey(
                name: "FK_QualificationTranslations_Languages_LanguageId",
                table: "QualificationTranslations");

            migrationBuilder.DropForeignKey(
                name: "FK_QualificationTranslations_Qualifications_QualificationId",
                table: "QualificationTranslations");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectTranslations_Languages_LanguageId",
                table: "SubjectTranslations");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectTranslations_Subjects_SubjectId",
                table: "SubjectTranslations");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherSubjects_Subjects_SubjectId",
                table: "TeacherSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherSubjects_Teachers_TeacherId",
                table: "TeacherSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherTranslations_Languages_LanguageId",
                table: "TeacherTranslations");

            migrationBuilder.DropForeignKey(
                name: "FK_TeacherTranslations_Teachers_TeacherId",
                table: "TeacherTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherTranslations",
                table: "TeacherTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeacherSubjects",
                table: "TeacherSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectTranslations",
                table: "SubjectTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QualificationTranslations",
                table: "QualificationTranslations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Qualifications",
                table: "Qualifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Languages",
                table: "Languages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileVocationalSubjects",
                table: "EducationalProfileVocationalSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EducationalProfileGeneralSubjects",
                table: "EducationalProfileGeneralSubjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AwardTranslations",
                table: "AwardTranslations");

            migrationBuilder.RenameTable(
                name: "TeacherTranslations",
                newName: "TeacherTranslation");

            migrationBuilder.RenameTable(
                name: "TeacherSubjects",
                newName: "TeacherSubject");

            migrationBuilder.RenameTable(
                name: "SubjectTranslations",
                newName: "SubjectTranslation");

            migrationBuilder.RenameTable(
                name: "QualificationTranslations",
                newName: "QualificationTranslation");

            migrationBuilder.RenameTable(
                name: "Qualifications",
                newName: "Qualification");

            migrationBuilder.RenameTable(
                name: "Languages",
                newName: "Language");

            migrationBuilder.RenameTable(
                name: "EducationalProfileVocationalSubjects",
                newName: "EducationalProfileVocationalSubject");

            migrationBuilder.RenameTable(
                name: "EducationalProfileGeneralSubjects",
                newName: "EducationalProfileGeneralSubject");

            migrationBuilder.RenameTable(
                name: "AwardTranslations",
                newName: "AwardTranslation");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherTranslations_LanguageId",
                table: "TeacherTranslation",
                newName: "IX_TeacherTranslation_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_TeacherSubjects_SubjectId",
                table: "TeacherSubject",
                newName: "IX_TeacherSubject_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectTranslations_LanguageId",
                table: "SubjectTranslation",
                newName: "IX_SubjectTranslation_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_QualificationTranslations_LanguageId",
                table: "QualificationTranslation",
                newName: "IX_QualificationTranslation_LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_Qualifications_TeacherId",
                table: "Qualification",
                newName: "IX_Qualification_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Languages_Code",
                table: "Language",
                newName: "IX_Language_Code");

            migrationBuilder.RenameIndex(
                name: "IX_EducationalProfileVocationalSubjects_SubjectId",
                table: "EducationalProfileVocationalSubject",
                newName: "IX_EducationalProfileVocationalSubject_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_EducationalProfileGeneralSubjects_SubjectId",
                table: "EducationalProfileGeneralSubject",
                newName: "IX_EducationalProfileGeneralSubject_SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_AwardTranslations_LanguageId",
                table: "AwardTranslation",
                newName: "IX_AwardTranslation_LanguageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherTranslation",
                table: "TeacherTranslation",
                column: "TeacherId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeacherSubject",
                table: "TeacherSubject",
                columns: new[] { "TeacherId", "SubjectId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectTranslation",
                table: "SubjectTranslation",
                column: "SubjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QualificationTranslation",
                table: "QualificationTranslation",
                column: "QualificationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Qualification",
                table: "Qualification",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Language",
                table: "Language",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileVocationalSubject",
                table: "EducationalProfileVocationalSubject",
                columns: new[] { "EducationalProfileId", "SubjectId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_EducationalProfileGeneralSubject",
                table: "EducationalProfileGeneralSubject",
                columns: new[] { "EducationalProfileId", "SubjectId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AwardTranslation",
                table: "AwardTranslation",
                column: "AwardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AwardTranslation_Awards_AwardId",
                table: "AwardTranslation",
                column: "AwardId",
                principalTable: "Awards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AwardTranslation_Language_LanguageId",
                table: "AwardTranslation",
                column: "LanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileGeneralSubject_EducationalProfiles_Educat~",
                table: "EducationalProfileGeneralSubject",
                column: "EducationalProfileId",
                principalTable: "EducationalProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileGeneralSubject_Subjects_SubjectId",
                table: "EducationalProfileGeneralSubject",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileVocationalSubject_EducationalProfiles_Edu~",
                table: "EducationalProfileVocationalSubject",
                column: "EducationalProfileId",
                principalTable: "EducationalProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EducationalProfileVocationalSubject_Subjects_SubjectId",
                table: "EducationalProfileVocationalSubject",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Qualification_Teachers_TeacherId",
                table: "Qualification",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_QualificationTranslation_Language_LanguageId",
                table: "QualificationTranslation",
                column: "LanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QualificationTranslation_Qualification_QualificationId",
                table: "QualificationTranslation",
                column: "QualificationId",
                principalTable: "Qualification",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectTranslation_Language_LanguageId",
                table: "SubjectTranslation",
                column: "LanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectTranslation_Subjects_SubjectId",
                table: "SubjectTranslation",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherSubject_Subjects_SubjectId",
                table: "TeacherSubject",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherSubject_Teachers_TeacherId",
                table: "TeacherSubject",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherTranslation_Language_LanguageId",
                table: "TeacherTranslation",
                column: "LanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherTranslation_Teachers_TeacherId",
                table: "TeacherTranslation",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
