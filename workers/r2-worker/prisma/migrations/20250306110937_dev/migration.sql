-- CreateEnum
CREATE TYPE "Color" AS ENUM ('RED', 'BLACK', 'GREEN');

-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('ADMIN', 'TMGR', 'OPERATOR', 'AFFILIATE', 'CASHIER', 'PLAYER', 'GUEST', 'SHOP', 'BANNED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('BOY', 'GIRL', 'ALIEN', 'UNSURE', 'ROBOT', 'COMPLICATED');

-- CreateEnum
CREATE TYPE "JackpotGroupType" AS ENUM ('MEGA', 'MINOR', 'MAJOR', 'FRIENDS', 'CLUB');

-- CreateEnum
CREATE TYPE "TransactionBonusType" AS ENUM ('WELCOME', 'SMS', 'INVITE', 'WHEEL', 'DAILY', 'TOURNAMENT', 'PROGRESS');

-- CreateEnum
CREATE TYPE "TransactionDirection" AS ENUM ('ADD', 'OUT');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING_PAYMENT', 'PAYMENT_FAILED', 'EXPIRED', 'CANCELLED_BY_PLAYER', 'CANCELLED_BY_SHOP', 'CANCELLED_BY_SYSTEM', 'SUCCEEDED', 'FAKE_EMAIL_SENT');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RETAIL', 'DEPOSIT', 'REDEEM');

-- CreateEnum
CREATE TYPE "UpdateStatus" AS ENUM ('success', 'failure');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "TransactionChannel" AS ENUM ('WALLET', 'COINBASE', 'BTCPAYSERVER', 'CASHAPP', 'INSTORE', 'PINCODE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "vipRank" JSONB NOT NULL,
    "age" INTEGER,
    "gender" "Gender" NOT NULL DEFAULT 'BOY',
    "location" TEXT,
    "access_token" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "isAnonymous" BOOLEAN DEFAULT false,
    "dateOfBirth" TIMESTAMP(3),
    "phone" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'INACTIVE',
    "twoFactorEnabled" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "socketId" TEXT,
    "isOnline" BOOLEAN DEFAULT false,
    "cashtag" TEXT,
    "isStaff" BOOLEAN DEFAULT false,
    "currentSessionId" TEXT,
    "activeProfileId" TEXT,
    "stats" JSONB,
    "lastDailySpin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "vipPoints" INTEGER NOT NULL DEFAULT 0,
    "countBalance" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT DEFAULT 'USD',
    "isExcluded" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "faceVerificationTime" TEXT DEFAULT '',
    "address" DOUBLE PRECISION DEFAULT 0,
    "totalCashOut" INTEGER DEFAULT 0,
    "totalSpins" INTEGER NOT NULL DEFAULT 0,
    "totalCashIn" INTEGER DEFAULT 0,
    "totalWon" INTEGER DEFAULT 0,
    "totalBet" INTEGER DEFAULT 0,
    "totalBonusWon" INTEGER DEFAULT 0,
    "rtp" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileType" "ProfileType" NOT NULL DEFAULT 'PLAYER',
    "limits" JSONB,
    "xp" INTEGER,
    "stats" JSONB,
    "rakeback" JSONB,
    "mute" BOOLEAN NOT NULL DEFAULT false,
    "ban" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "cashtag" TEXT,
    "email" TEXT,
    "shopId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "activeUserId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "authenticated" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "profileId" TEXT,
    "shopId" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "url" TEXT,
    "code" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "acceptedPaymentMethods" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpinData" (
    "id" TEXT NOT NULL,
    "remainingFreeSpins" INTEGER,
    "gameId" TEXT,
    "extPlayerKey" TEXT,
    "betAmount" INTEGER,
    "winAmount" INTEGER,
    "thisSpinWinning" INTEGER,
    "freespinsLeft" INTEGER,
    "numberOfFreespinsPlayed" INTEGER,
    "spinNumber" INTEGER NOT NULL,
    "gameSessionRTP" INTEGER,
    "playerBalanceAtStart" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameBalance" INTEGER,
    "isPreSpinData" BOOLEAN DEFAULT false,
    "playerBalance" INTEGER,
    "profileId" TEXT,
    "playerRTPToday" TEXT,
    "sessionTotalBetAmount" INTEGER,
    "sessionTotalWinAmount" INTEGER,
    "playerWinTotalToday" INTEGER,
    "playerBetTotalToday" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpinData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "developer" TEXT,
    "vipLevel" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT false,
    "device" INTEGER DEFAULT 0,
    "featured" BOOLEAN DEFAULT false,
    "gamebank" TEXT DEFAULT 'slots',
    "bet" DOUBLE PRECISION DEFAULT 0,
    "denomination" DOUBLE PRECISION DEFAULT 0,
    "categoryTemp" DOUBLE PRECISION DEFAULT 0,
    "originalId" INTEGER DEFAULT 0,
    "bids" INTEGER DEFAULT 0,
    "statIn" DOUBLE PRECISION DEFAULT 0,
    "statOut" DOUBLE PRECISION DEFAULT 0,
    "currentRtp" DOUBLE PRECISION DEFAULT 0,
    "rtpStatIn" DOUBLE PRECISION DEFAULT 0,
    "rtpStatOut" DOUBLE PRECISION DEFAULT 0,
    "standardRtp" DOUBLE PRECISION DEFAULT 0,
    "popularity" DOUBLE PRECISION DEFAULT 0,
    "chanceFirepot1" DOUBLE PRECISION,
    "chanceFirepot2" DOUBLE PRECISION,
    "chanceFirepot3" DOUBLE PRECISION,
    "fireCount1" DOUBLE PRECISION,
    "fireCount2" DOUBLE PRECISION,
    "fireCount3" DOUBLE PRECISION,
    "linesPercentConfigSpin" TEXT,
    "linesPercentConfigSpinBonus" TEXT,
    "linesPercentConfigBonus" TEXT,
    "linesPercentConfigBonusBonus" TEXT,
    "rezerv" DOUBLE PRECISION DEFAULT 0,
    "cask" DOUBLE PRECISION DEFAULT 0,
    "advanced" TEXT DEFAULT '',
    "scaleMode" TEXT NOT NULL DEFAULT '',
    "slotViewState" TEXT NOT NULL DEFAULT '',
    "view" INTEGER DEFAULT 0,
    "categoryId" TEXT,
    "shopId" TEXT,
    "providerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jackpotGroupId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JackpotGroup" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "balance" INTEGER DEFAULT 0,
    "type" "JackpotGroupType" NOT NULL DEFAULT 'MEGA',
    "startBalance" INTEGER DEFAULT 0,
    "paySum" INTEGER,
    "percent" DOUBLE PRECISION,

    CONSTRAINT "JackpotGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "bonusCode" TEXT DEFAULT '',
    "bonusTotalInCredits" INTEGER DEFAULT 0,
    "priceInCents" INTEGER NOT NULL DEFAULT 0,
    "amountToReceiveInCredits" INTEGER NOT NULL DEFAULT 0,
    "discountInCents" INTEGER NOT NULL DEFAULT 0,
    "bonusSpins" INTEGER,
    "isPromo" BOOLEAN DEFAULT false,
    "totalDiscountInCents" INTEGER NOT NULL,
    "shopId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "direction" "TransactionDirection" NOT NULL,
    "channel" "TransactionChannel" NOT NULL,
    "bonusType" "TransactionBonusType",
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "totalSpentInCents" INTEGER NOT NULL,
    "amountCredits" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "bonusIdUsed" TEXT NOT NULL DEFAULT 'none',
    "updateLevel" BOOLEAN NOT NULL DEFAULT false,
    "userAvatar" TEXT NOT NULL,
    "username" TEXT,
    "buyerUserId" TEXT,
    "buyerCashtag" TEXT,
    "cashierAvatar" TEXT,
    "cashiername" TEXT,
    "cashierId" TEXT,
    "shopId" TEXT NOT NULL,
    "cashierprofileId" TEXT,
    "productId" TEXT,
    "buyerBalanceAfterTransaction" INTEGER,
    "sellerBalanceAfterTransaction" INTEGER,
    "buyerBalanceBeforeTransaction" INTEGER,
    "sellerBalanceBeforeTransaction" INTEGER,
    "salesCommission" INTEGER DEFAULT 0,
    "purchaserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" TEXT NOT NULL,
    "rankings" JSONB NOT NULL,
    "durationInSeconds" INTEGER NOT NULL DEFAULT -1,
    "lowestVipLevel" INTEGER NOT NULL DEFAULT 0,
    "highestVipLevel" INTEGER NOT NULL DEFAULT 100,
    "currentPrize" INTEGER NOT NULL DEFAULT 0,
    "maxPrize" INTEGER NOT NULL DEFAULT 0,
    "prizeDistribution" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "allUsers" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "shopId" TEXT,
    "isRunning" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RTGSpinResult" (
    "id" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "result" JSONB NOT NULL,
    "user" JSONB NOT NULL,
    "game" JSONB NOT NULL,

    CONSTRAINT "RTGSpinResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackjackGame" (
    "id" TEXT NOT NULL,
    "deck" JSONB[],
    "dealerCards" JSONB[],
    "fair" JSONB NOT NULL,
    "table" INTEGER,
    "type" TEXT,
    "state" TEXT,
    "isRunning" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlackjackGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackjackBet" (
    "id" TEXT NOT NULL,
    "amountMain" DOUBLE PRECISION,
    "amountSideLeft" DOUBLE PRECISION,
    "amountSideRight" DOUBLE PRECISION,
    "method" TEXT,
    "payout" DOUBLE PRECISION,
    "multiplier" DOUBLE PRECISION,
    "cards" JSONB[],
    "cardsLeft" JSONB[],
    "cardsRight" JSONB[],
    "actions" TEXT[],
    "seat" INTEGER,
    "gameId" TEXT,
    "profileId" TEXT,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlackjackBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "maintenanceEnabled" BOOLEAN NOT NULL DEFAULT false,
    "rainEnabled" BOOLEAN NOT NULL DEFAULT false,
    "leaderboardEnabled" BOOLEAN NOT NULL DEFAULT false,
    "tipEnabled" BOOLEAN NOT NULL DEFAULT false,
    "affiliateEnabled" BOOLEAN NOT NULL DEFAULT false,
    "rewardMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.00,
    "mode" TEXT NOT NULL DEFAULT 'normal',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "enEnabled" BOOLEAN NOT NULL DEFAULT true,
    "trEnabled" BOOLEAN NOT NULL DEFAULT true,
    "deEnabled" BOOLEAN NOT NULL DEFAULT true,
    "esEnabled" BOOLEAN NOT NULL DEFAULT true,
    "begEnabled" BOOLEAN NOT NULL DEFAULT true,
    "whaleEnabled" BOOLEAN NOT NULL DEFAULT true,
    "crashEnabled" BOOLEAN NOT NULL DEFAULT true,
    "rollEnabled" BOOLEAN NOT NULL DEFAULT true,
    "blackjackEnabled" BOOLEAN NOT NULL DEFAULT true,
    "duelsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "minesEnabled" BOOLEAN NOT NULL DEFAULT true,
    "towersEnabled" BOOLEAN NOT NULL DEFAULT true,
    "unboxEnabled" BOOLEAN NOT NULL DEFAULT true,
    "battlesEnabled" BOOLEAN NOT NULL DEFAULT true,
    "upgraderEnabled" BOOLEAN NOT NULL DEFAULT true,
    "inStoreDepositEnabled" BOOLEAN NOT NULL DEFAULT false,
    "inStoreWithdrawEnabled" BOOLEAN NOT NULL DEFAULT false,
    "giftDepositEnabled" BOOLEAN NOT NULL DEFAULT false,
    "giftWithdrawEnabled" BOOLEAN NOT NULL DEFAULT false,
    "cashappDepositEnabled" BOOLEAN NOT NULL DEFAULT false,
    "cashappWithdrawEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PragmaticPlayer" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "agentCode" TEXT NOT NULL DEFAULT '',
    "userCode" TEXT,
    "gameCode" TEXT NOT NULL DEFAULT '',
    "txnID" TEXT NOT NULL DEFAULT '',
    "connected" INTEGER NOT NULL DEFAULT 0,
    "gameMode" INTEGER NOT NULL DEFAULT 0,
    "patRequested" INTEGER NOT NULL DEFAULT 0,
    "curIndex" INTEGER NOT NULL DEFAULT 1,
    "lastJackpotIndex" INTEGER NOT NULL DEFAULT 0,
    "nextJackpot" INTEGER NOT NULL DEFAULT 100,
    "totalDebit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCredit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "realRtp" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "callHistId" INTEGER NOT NULL DEFAULT -1,
    "settings" TEXT,
    "totalBet" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "virtualBet" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "callStatus" TEXT,
    "jackpotCome" INTEGER NOT NULL DEFAULT 90,
    "baseWinCome" INTEGER NOT NULL DEFAULT 5,
    "highBaseCome" INTEGER NOT NULL DEFAULT 5,
    "jackpotLimit" INTEGER NOT NULL DEFAULT 90,
    "highBaseLimit" INTEGER NOT NULL DEFAULT 50,
    "machine" TEXT,
    "lastPattern" TEXT,
    "betPerLine" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "viewStack" TEXT,
    "fsStack" TEXT,
    "viewHistory" TEXT,
    "replayLogList" TEXT,
    "callPattern" TEXT,
    "purchaseCallPattern" TEXT,

    CONSTRAINT "PragmaticPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_friends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_friends_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GameToLeaderboard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GameToLeaderboard_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LeaderboardToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LeaderboardToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cashtag_key" ON "User"("cashtag");

-- CreateIndex
CREATE UNIQUE INDEX "User_activeProfileId_key" ON "User"("activeProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_username_key" ON "User"("email", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_name_key" ON "Shop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_url_key" ON "Shop"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_code_key" ON "Shop"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_ownerId_key" ON "Shop"("ownerId");

-- CreateIndex
CREATE INDEX "Shop_name_idx" ON "Shop"("name");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- CreateIndex
CREATE INDEX "_GameToLeaderboard_B_index" ON "_GameToLeaderboard"("B");

-- CreateIndex
CREATE INDEX "_LeaderboardToUser_B_index" ON "_LeaderboardToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeProfileId_fkey" FOREIGN KEY ("activeProfileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_jackpotGroupId_fkey" FOREIGN KEY ("jackpotGroupId") REFERENCES "JackpotGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_purchaserId_fkey" FOREIGN KEY ("purchaserId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlackjackBet" ADD CONSTRAINT "BlackjackBet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "BlackjackGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlackjackBet" ADD CONSTRAINT "BlackjackBet_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToLeaderboard" ADD CONSTRAINT "_GameToLeaderboard_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToLeaderboard" ADD CONSTRAINT "_GameToLeaderboard_B_fkey" FOREIGN KEY ("B") REFERENCES "Leaderboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaderboardToUser" ADD CONSTRAINT "_LeaderboardToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Leaderboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaderboardToUser" ADD CONSTRAINT "_LeaderboardToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
