const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class PostRefactorin1629156909555 {
    name = 'PostRefactorin1629156909555'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."locations_entity" ADD "hugestring" text`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."locations_entity" DROP COLUMN "hugestring"`);
    }
}
