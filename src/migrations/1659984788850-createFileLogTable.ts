import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFileLogTable1659984788850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE files(
            date Date PRIMARY KEY,
            exported_files int NOT NULL
         );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
