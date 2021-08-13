import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1628892101697 implements MigrationInterface {
    name = 'PostRefactoring1628892101697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provider_reviews_entity" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "reviewBody" text NOT NULL, "contentWarnings" text NOT NULL DEFAULT '[]', "providerId" integer, CONSTRAINT "PK_a0915c9d82ae0d52eb2cbd5220d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "providers_entity" ("id" SERIAL NOT NULL, "fullName" text NOT NULL, "otherNames" text NOT NULL DEFAULT '[]', "pronouns" text NOT NULL, "titles" text NOT NULL DEFAULT '[]', "specialties" text NOT NULL DEFAULT '[]', "languages" text NOT NULL DEFAULT '[]', "services" text NOT NULL DEFAULT '[]', "remoteVisits" boolean, "slidingScalePay" boolean, CONSTRAINT "PK_f30623359da7c9d801e7e71e9ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations_entity" ("id" SERIAL NOT NULL, "locationName" text NOT NULL, "locationTypes" text NOT NULL DEFAULT '[]', "googleMapsUrl" text NOT NULL, "locationUrl" text, "latitude" text NOT NULL, "longitude" text NOT NULL, "phone" text NOT NULL, "address" text NOT NULL, "googlePlaceId" text NOT NULL, "tsvector" tsvector, "locationPoint" geography(Point,4326), CONSTRAINT "PK_f8fc6b8d96458dc030a2728ffb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_612c9583ac11bdf628f103b3cf" ON "locations_entity" USING GiST ("locationPoint") `);
        await queryRunner.query(`CREATE TABLE "locations_entity_providers_providers_entity" ("locationsEntityId" integer NOT NULL, "providersEntityId" integer NOT NULL, CONSTRAINT "PK_e14554bd615a5ea535b0e1f86ec" PRIMARY KEY ("locationsEntityId", "providersEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae8b6d4135d4b0b9a4b6f03182" ON "locations_entity_providers_providers_entity" ("locationsEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d1ca53deb0090260d6b23c3fc" ON "locations_entity_providers_providers_entity" ("providersEntityId") `);
        await queryRunner.query(`ALTER TABLE "provider_reviews_entity" ADD CONSTRAINT "FK_4271e3cbcc195ddd7a2f30774c2" FOREIGN KEY ("providerId") REFERENCES "providers_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "locations_entity_providers_providers_entity" ADD CONSTRAINT "FK_ae8b6d4135d4b0b9a4b6f03182d" FOREIGN KEY ("locationsEntityId") REFERENCES "locations_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "locations_entity_providers_providers_entity" ADD CONSTRAINT "FK_5d1ca53deb0090260d6b23c3fc7" FOREIGN KEY ("providersEntityId") REFERENCES "providers_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations_entity_providers_providers_entity" DROP CONSTRAINT "FK_5d1ca53deb0090260d6b23c3fc7"`);
        await queryRunner.query(`ALTER TABLE "locations_entity_providers_providers_entity" DROP CONSTRAINT "FK_ae8b6d4135d4b0b9a4b6f03182d"`);
        await queryRunner.query(`ALTER TABLE "provider_reviews_entity" DROP CONSTRAINT "FK_4271e3cbcc195ddd7a2f30774c2"`);
        await queryRunner.query(`DROP INDEX "IDX_5d1ca53deb0090260d6b23c3fc"`);
        await queryRunner.query(`DROP INDEX "IDX_ae8b6d4135d4b0b9a4b6f03182"`);
        await queryRunner.query(`DROP TABLE "locations_entity_providers_providers_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_612c9583ac11bdf628f103b3cf"`);
        await queryRunner.query(`DROP TABLE "locations_entity"`);
        await queryRunner.query(`DROP TABLE "providers_entity"`);
        await queryRunner.query(`DROP TABLE "provider_reviews_entity"`);
    }

}
