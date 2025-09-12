using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class AddCaptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Captions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AdminDescription = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Captions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CaptionTranslations",
                columns: table => new
                {
                    CaptionId = table.Column<int>(type: "integer", nullable: false),
                    LanguageCode = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaptionTranslations", x => new { x.LanguageCode, x.CaptionId });
                    table.ForeignKey(
                        name: "FK_CaptionTranslations_Captions_CaptionId",
                        column: x => x.CaptionId,
                        principalTable: "Captions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CaptionTranslations_CaptionId",
                table: "CaptionTranslations",
                column: "CaptionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CaptionTranslations");

            migrationBuilder.DropTable(
                name: "Captions");
        }
    }
}
