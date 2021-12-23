import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class removeBirthDateUser1640218441871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "birthDate");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users", new TableColumn({
      name: "birthDate",
      type: "date",
    }));
  }
}
