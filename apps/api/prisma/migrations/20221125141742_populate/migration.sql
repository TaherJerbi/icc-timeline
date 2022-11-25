/*
  Warnings:

  - You are about to drop the column `expectedLength` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieSlug]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieSlug` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalEndTime` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "movieSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expectedLength",
DROP COLUMN "movieId",
ADD COLUMN     "movieSlug" TEXT,
ADD COLUMN     "originalEndTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "delayed" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_movieSlug_key" ON "Movie"("movieSlug");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_movieSlug_fkey" FOREIGN KEY ("movieSlug") REFERENCES "Movie"("movieSlug") ON DELETE SET NULL ON UPDATE CASCADE;
