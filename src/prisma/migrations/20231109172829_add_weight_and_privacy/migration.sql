/*
  Warnings:

  - Added the required column `security` to the `Medias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Medias` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sub_type" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "formats" TEXT NOT NULL,
    "security" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL
);
INSERT INTO "new_Medias" ("created_at", "created_by", "file_type", "formats", "id", "name", "sub_type", "type", "updated_at", "updated_by", "url") SELECT "created_at", "created_by", "file_type", "formats", "id", "name", "sub_type", "type", "updated_at", "updated_by", "url" FROM "Medias";
DROP TABLE "Medias";
ALTER TABLE "new_Medias" RENAME TO "Medias";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
