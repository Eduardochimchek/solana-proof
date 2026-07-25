-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "recipientName" TEXT,
    "sourceType" TEXT NOT NULL DEFAULT 'statement',
    "fileName" TEXT,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "documentHash" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "transactionSignature" TEXT NOT NULL,
    "network" TEXT NOT NULL DEFAULT 'devnet',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_documentHash_key" ON "Certificate"("documentHash");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_transactionSignature_key" ON "Certificate"("transactionSignature");

-- CreateIndex
CREATE INDEX "Certificate_walletAddress_idx" ON "Certificate"("walletAddress");

-- CreateIndex
CREATE INDEX "Certificate_createdAt_idx" ON "Certificate"("createdAt");
