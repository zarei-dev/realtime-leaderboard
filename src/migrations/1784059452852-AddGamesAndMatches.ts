import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGamesAndMatches1784059452852 implements MigrationInterface {
  name = 'AddGamesAndMatches1784059452852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f" UNIQUE ("name"), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "matches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "playerId" uuid NOT NULL, "gameId" uuid NOT NULL, CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_051ff2b757340750e83a6063c6" ON "matches"  ("gameId", "playerId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_185468a231911e633f1198d7921" FOREIGN KEY ("playerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_aaaeb9fd98fc66bbf57dea17677" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_aaaeb9fd98fc66bbf57dea17677"`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_185468a231911e633f1198d7921"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_051ff2b757340750e83a6063c6"`,
    );
    await queryRunner.query(`DROP TABLE "matches"`);
    await queryRunner.query(`DROP TABLE "games"`);
  }
}
