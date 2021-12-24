import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCompany1640355712879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "companies",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "corporateName",
            type: "varchar",
          },
          {
            name: "fantasyName",
            type: "varchar",
          },
          {
            name: "cnpj",
            type: "numeric",
          },
          {
            name: "departamento",
            type: "varchar",
          },
          {
            name: "contact",
            type: "numeric",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "userOwnerId",
            type: "uuid",
          },
          {
            name: "addressId",
            type: "uuid",
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
        foreignKeys: [
          {
            name: "UserOwnerIdCompany",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["userOwnerId"],
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
          },
          {
            name: "AddressIdCompany",
            referencedTableName: "addresses",
            referencedColumnNames: ["id"],
            columnNames: ["addressId"],
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("companies");
  }
}
