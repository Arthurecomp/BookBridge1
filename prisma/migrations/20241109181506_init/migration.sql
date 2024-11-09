/*
  Warnings:

  - You are about to drop the column `bookClubId` on the `opinions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_opinions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "opinions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "opinions_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opinions" ("bookId", "content", "data", "id", "rating", "userId") SELECT "bookId", "content", "data", "id", "rating", "userId" FROM "opinions";
DROP TABLE "opinions";
ALTER TABLE "new_opinions" RENAME TO "opinions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
