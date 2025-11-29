using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class FixParticipatorFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participators_Giveaways_GiveAwayId",
                table: "Participators");

            migrationBuilder.DropForeignKey(
                name: "FK_Participators_Giveaways_GiveawayId",
                table: "Participators");

            migrationBuilder.DropIndex(
                name: "IX_Participators_GiveAwayId",
                table: "Participators");

            // Copy data from old column to the correct FK column before removing it
            migrationBuilder.Sql("UPDATE \"Participators\" SET \"GiveawayId\" = \"GiveAwayId\" WHERE \"GiveawayId\" IS NULL OR \"GiveawayId\" = '00000000-0000-0000-0000-000000000000'");

            migrationBuilder.DropColumn(
                name: "GiveAwayId",
                table: "Participators");

            migrationBuilder.AlterColumn<Guid>(
                name: "GiveawayId",
                table: "Participators",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Participators_Giveaways_GiveawayId",
                table: "Participators",
                column: "GiveawayId",
                principalTable: "Giveaways",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participators_Giveaways_GiveawayId",
                table: "Participators");

            // No rollback of data copy; reintroduce old column if necessary
            migrationBuilder.AddColumn<Guid>(
                name: "GiveAwayId",
                table: "Participators",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "GiveawayId",
                table: "Participators",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_Participators_GiveAwayId",
                table: "Participators",
                column: "GiveAwayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Participators_Giveaways_GiveAwayId",
                table: "Participators",
                column: "GiveAwayId",
                principalTable: "Giveaways",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Participators_Giveaways_GiveawayId",
                table: "Participators",
                column: "GiveawayId",
                principalTable: "Giveaways",
                principalColumn: "Id");
        }
    }
}
