-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TECHNICIAN', 'PUBLIC');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('START', 'END');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('PROJECTION', 'DEBAT', 'PAUSE', 'OTHER');

-- CreateEnum
CREATE TYPE "DelayActionType" AS ENUM ('CONTAIN', 'PROPAGATE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "type" "EventType" NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "runningTime" INTEGER NOT NULL,
    "realisateur" TEXT NOT NULL,
    "posterPath" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "originalStartTime" INTEGER NOT NULL,
    "expectedLength" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "delayed" BOOLEAN NOT NULL,
    "delay" INTEGER NOT NULL DEFAULT 0,
    "type" "SessionType" NOT NULL,
    "movieId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timelineId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeline" (
    "id" SERIAL NOT NULL,
    "salleId" INTEGER NOT NULL,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Salle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DelayLog" (
    "id" SERIAL NOT NULL,
    "delayStart" TIMESTAMP(3) NOT NULL,
    "delayEnd" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,
    "action" "DelayActionType" NOT NULL,

    CONSTRAINT "DelayLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_salleId_key" ON "Timeline"("salleId");

-- CreateIndex
CREATE UNIQUE INDEX "DelayLog_eventId_key" ON "DelayLog"("eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "Timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DelayLog" ADD CONSTRAINT "DelayLog_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
