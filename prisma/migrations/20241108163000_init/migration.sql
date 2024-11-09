/*
  Warnings:

  - Added the required column `rating` to the `opinions` table without a default value. This is not possible if the table is not empty.

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
    "bookClubId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "opinions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "opinions_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "opinions_bookClubId_fkey" FOREIGN KEY ("bookClubId") REFERENCES "book_clubs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_opinions" ("bookClubId", "bookId", "content", "data", "id", "userId") SELECT "bookClubId", "bookId", "content", "data", "id", "userId" FROM "opinions";
DROP TABLE "opinions";
ALTER TABLE "new_opinions" RENAME TO "opinions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
