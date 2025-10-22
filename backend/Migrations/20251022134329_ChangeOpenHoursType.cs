using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class ChangeOpenHoursType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StartOfOpenOfficeHoursSecondShift",
                table: "Teachers",
                type: "text",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "StartOfOpenOfficeHoursFirstShift",
                table: "Teachers",
                type: "text",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeOnly>(
                name: "StartOfOpenOfficeHoursSecondShift",
                table: "Teachers",
                type: "time without time zone",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "StartOfOpenOfficeHoursFirstShift",
                table: "Teachers",
                type: "time without time zone",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
