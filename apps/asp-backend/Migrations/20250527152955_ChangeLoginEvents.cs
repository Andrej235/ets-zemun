using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EtsZemun.Migrations
{
    /// <inheritdoc />
    public partial class ChangeLoginEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLoginEvent_AspNetUsers_UserId",
                table: "UserLoginEvent");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserLoginEvent",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "UserLoginEvent",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLoginEvent_AspNetUsers_UserId",
                table: "UserLoginEvent",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLoginEvent_AspNetUsers_UserId",
                table: "UserLoginEvent");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "UserLoginEvent");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserLoginEvent",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLoginEvent_AspNetUsers_UserId",
                table: "UserLoginEvent",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
