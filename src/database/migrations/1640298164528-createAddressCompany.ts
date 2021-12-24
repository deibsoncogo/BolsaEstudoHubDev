import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAddressCompany1640298164528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "publicPlace",
            type: "varchar",
          },
          {
            name: "number",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "country",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("addresses");
  }
}
