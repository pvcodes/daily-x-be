-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('g_oauth', 'basic');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_type" "AuthType" DEFAULT 'basic',
ALTER COLUMN "password" DROP NOT NULL;
