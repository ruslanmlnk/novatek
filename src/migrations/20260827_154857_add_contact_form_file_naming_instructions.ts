import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site" ADD COLUMN "contact_form_supported_file_formats" varchar DEFAULT 'STEP, DWG, PDF, PNG, JPEG, SLDPRT, ZIP, RAR, STL, OBJ';
  ALTER TABLE "site_locales" ADD COLUMN "contact_form_file_naming_instructions" varchar DEFAULT 'For laser cutting files, use this naming format: Material_Thickness_File name - Quantity.';
  UPDATE "site_locales"
  SET "contact_form_file_naming_instructions" = 'За файлове за лазерно рязане използвайте този формат на именуване: Дебелина_Материал_Име на файла - Количество.'
  WHERE "_locale" = 'bg';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site" DROP COLUMN "contact_form_supported_file_formats";
  ALTER TABLE "site_locales" DROP COLUMN "contact_form_file_naming_instructions";`)
}
