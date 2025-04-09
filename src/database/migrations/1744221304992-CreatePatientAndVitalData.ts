import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatientAndVitalData1744221304992 implements MigrationInterface {
    name = 'CreatePatientAndVitalData1744221304992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vital_data" ("id" SERIAL NOT NULL, "temperature" double precision NOT NULL, "heartRate" integer NOT NULL, "oxygenLevel" double precision NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "patientId" integer, CONSTRAINT "PK_ffad369b8d56c4bd36cd4bcdc2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vital_data" ADD CONSTRAINT "FK_9244d28aee071aa76a0b8e017b6" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vital_data" DROP CONSTRAINT "FK_9244d28aee071aa76a0b8e017b6"`);
        await queryRunner.query(`DROP TABLE "vital_data"`);
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
