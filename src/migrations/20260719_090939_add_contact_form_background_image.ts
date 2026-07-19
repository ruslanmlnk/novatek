import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site"
      ADD COLUMN "footer_contact_form_background_image_id" integer;

    ALTER TABLE "site"
      ADD CONSTRAINT "site_footer_contact_form_background_image_id_media_id_fk"
      FOREIGN KEY ("footer_contact_form_background_image_id")
      REFERENCES "public"."media"("id")
      ON DELETE set null
      ON UPDATE no action;

    CREATE INDEX "site_footer_footer_contact_form_background_image_idx"
      ON "site" USING btree ("footer_contact_form_background_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "site_footer_footer_contact_form_background_image_idx";

    ALTER TABLE "site"
      DROP CONSTRAINT IF EXISTS "site_footer_contact_form_background_image_id_media_id_fk";

    ALTER TABLE "site"
      DROP COLUMN IF EXISTS "footer_contact_form_background_image_id";
  `)
}
