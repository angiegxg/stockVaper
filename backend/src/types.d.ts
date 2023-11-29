//    model Flavor {
//      id           Int       @id @default(autoincrement())
//      flavor       String
//      product  ProductByFlavor[]

//    }

export interface Flavor {
  id?: number
  flavor: string
}

// model Product{
//     id           Int       @id @default(autoincrement())
//      name  String
//      description  String
//      img  String
//      cost   Float
//      flavors ProductByFlavor[]

//    }

export interface Product {
  id?: number
  name: string
  description: string
  img: string
  cost: number
}

// model ProductByFlavor {
//     flavor    Flavor  @relation(fields: [flavorId], references: [id])
//     flavorId  Int
//     product   Product @relation(fields: [productId], references: [id])
//     productId Int
//     productDetail ProductDetail[]
//     stock    Stock[]

//     @@id([flavorId, productId])
//   }

export interface ProductByFlavor {
  flavorId: number
  productId: number
  product?: Product
  flavor?: Flavor
}

//    model Seller{
//       id Int @id @default(autoincrement())
//       name String @unique
//       commission Float
//       sale Sale []
//       stock Stock []

//    }

export interface Seller {
  id?: number
  name: string
  commission: number
  stock?: Stock[]
}

//    model Sale{
//      id Int @id @default(autoincrement())
//      date DateTime
//      productSold ProductDetail[]
//      seller Seller? @relation(fields: [sellerId], references: [id])
//      sellerId Int
//    }

export interface Sale {
  id?: number
  date: Date
  productsSold: ProductDetail[]
  sellerId: number
  total: number
}

//    model ProductDetail{
//      id Int @id @default(autoincrement())
//      quantity    Int
//      productId    Int
//      flavorid Int
//      price Int
//      sale Sale @relation(fields: [saleId], references: [id])
//      saleId Int
//    }

export interface ProductDetail {
  quantity: number
  productId: number
  flavorId: number
  price: number
  saleId: number
}

//    model Stock{
//      id Int @id @default(autoincrement())
//      productId Int
//      flavorid Int
//      quantity Int
//      seller Seller  @relation(fields: [sallerId], references: [id])
//      sallerId Int

//    }

export interface Stock {
  id?: number
  productId: number
  flavorId: number
  quantity: number
  sellerId: number
  product?: ProductByFlavor
  seller?: { name: string }
}

// model Stock {
//     id                  Int                  @id @default(autoincrement())
//     product             ProductByFlavor      @relation(fields: [productId, flavorId], references: [productId, flavorId])
//     productId           Int
//     flavorId            Int
//     quantity            Int
//     seller              Seller               @relation(fields: [sellerId], references: [id])
//     sellerId            Int
//     sentDistributions   Distribution[]       @relation("SentDistributions")
//     receivedDistributions Distribution[]       @relation("ReceivedDistributions")
//     stockDistribution    StockDistribution[]
//   }

//   model Distribution {
//     id                 Int                 @id @default(autoincrement())
//     date               DateTime            @default(now())
//     quantity           Int
//     sentFromStock      Stock               @relation("SentDistributions", fields: [fromStockId], references: [id])
//     fromStockId        Int
//     receivedAtStock    Stock               @relation("ReceivedDistributions", fields: [toStockId], references: [id])
//     toStockId          Int
//     stockDistributions StockDistribution[]
//   }

export interface Distribution {
  id?: number
  quantity: number
  fromStockId: number
  sentFromStock?: Stock
  receivedAtStock?: Stock
  toStockId: number
}

//   model StockDistribution {
//     stock          Stock       @relation(fields: [stockId], references: [id])
//     stockId        Int
//     distribution   Distribution @relation(fields: [distributionId], references: [id])
//     distributionId Int

//     @@id([stockId, distributionId])
//   }

export interface StockDistribution {
  stockId: number
  distributionId: number
}
