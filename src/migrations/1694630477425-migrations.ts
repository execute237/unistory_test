import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1694630477425 implements MigrationInterface {
	name = 'Migrations1694630477425';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "subscription" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "book" ("id" SERIAL NOT NULL, "isbn" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "book" ADD CONSTRAINT "FK_159ecb8d2fe0e175ed55ab77550" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_159ecb8d2fe0e175ed55ab77550"`);
		await queryRunner.query(`DROP TABLE "book"`);
		await queryRunner.query(`DROP TABLE "user"`);
	}
}
