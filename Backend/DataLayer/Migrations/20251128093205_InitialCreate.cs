using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Giveaways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Winners = table.Column<string[]>(type: "text[]", nullable: true),
                    Substitutes = table.Column<string[]>(type: "text[]", nullable: true),
                    NumberOfWinners = table.Column<int>(type: "integer", nullable: false),
                    NumberOfSubstitutes = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Giveaways", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Participators",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    FingerPrintId = table.Column<string>(type: "text", nullable: false),
                    IpAddress = table.Column<string>(type: "text", nullable: false),
                    AuthProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderUserId = table.Column<string>(type: "text", nullable: false),
                    IsWinner = table.Column<bool>(type: "boolean", nullable: false),
                    GiveAwayId = table.Column<Guid>(type: "uuid", nullable: false),
                    GiveawayId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Participators_Giveaways_GiveAwayId",
                        column: x => x.GiveAwayId,
                        principalTable: "Giveaways",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Participators_Giveaways_GiveawayId",
                        column: x => x.GiveawayId,
                        principalTable: "Giveaways",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Participators_GiveawayId",
                table: "Participators",
                column: "GiveawayId");

            migrationBuilder.CreateIndex(
                name: "IX_Participators_GiveAwayId",
                table: "Participators",
                column: "GiveAwayId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Participators");

            migrationBuilder.DropTable(
                name: "Giveaways");
        }
    }
}
