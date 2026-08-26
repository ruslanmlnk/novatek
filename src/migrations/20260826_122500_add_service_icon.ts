import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services"
      ADD COLUMN "icon_id" integer;

    ALTER TABLE "services"
      ADD CONSTRAINT "services_icon_id_media_id_fk"
      FOREIGN KEY ("icon_id")
      REFERENCES "public"."media"("id")
      ON DELETE set null
      ON UPDATE no action;

    CREATE INDEX "services_icon_idx"
      ON "services" USING btree ("icon_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "services_icon_idx";

    ALTER TABLE "services"
      DROP CONSTRAINT IF EXISTS "services_icon_id_media_id_fk";

    ALTER TABLE "services"
      DROP COLUMN IF EXISTS "icon_id";
  `)
}
