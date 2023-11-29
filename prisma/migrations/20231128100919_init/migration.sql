-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flavor" (
    "id" SERIAL NOT NULL,
    "flavor" TEXT NOT NULL,

    CONSTRAINT "Flavor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductByFlavor" (
    "flavorId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductByFlavor_pkey" PRIMARY KEY ("flavorId","productId")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDetail" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "flavorId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "saleId" INTEGER NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "flavorId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distribution" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "fromStockId" INTEGER NOT NULL,
    "toStockId" INTEGER NOT NULL,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockDistribution" (
    "stockId" INTEGER NOT NULL,
    "distributionId" INTEGER NOT NULL,

    CONSTRAINT "StockDistribution_pkey" PRIMARY KEY ("stockId","distributionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_name_key" ON "Seller"("name");

-- AddForeignKey
ALTER TABLE "ProductByFlavor" ADD CONSTRAINT "ProductByFlavor_flavorId_fkey" FOREIGN KEY ("flavorId") REFERENCES "Flavor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductByFlavor" ADD CONSTRAINT "ProductByFlavor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_productId_flavorId_fkey" FOREIGN KEY ("productId", "flavorId") REFERENCES "ProductByFlavor"("productId", "flavorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_productId_flavorId_fkey" FOREIGN KEY ("productId", "flavorId") REFERENCES "ProductByFlavor"("productId", "flavorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_fromStockId_fkey" FOREIGN KEY ("fromStockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_toStockId_fkey" FOREIGN KEY ("toStockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockDistribution" ADD CONSTRAINT "StockDistribution_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockDistribution" ADD CONSTRAINT "StockDistribution_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "Distribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
