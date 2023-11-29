"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSaleService = exports.goBackSaleService = exports.createSaleService = void 0;
const client_1 = require("@prisma/client");
const stockServise = __importStar(require("./stockService"));
const prisma = new client_1.PrismaClient();
function createSaleService(sale) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sellerId, productsSold, total } = sale;
        let newQuantity;
        for (const product of productsSold) {
            const stock = yield stockServise.checkStockExistsService(product.productId, product.flavorId, sellerId);
            if (stock.quantity >= product.quantity) {
                newQuantity = stock.quantity - product.quantity;
            }
            else if (stock === null || stock === void 0 ? void 0 : stock.quantity) {
                // Ajustar la cantidad vendida al stock disponible
                newQuantity = stock.quantity;
            }
            yield stockServise.updateQuantityStockService(stock.id, newQuantity);
        }
        const newSale = yield prisma.sale.create({
            data: {
                date: new Date(),
                sellerId,
                total,
                productsSold: {
                    create: productsSold.map((product) => ({
                        quantity: newQuantity,
                        productId: product.productId,
                        flavorId: product.flavorId,
                        price: product.price,
                        saleId: product.saleId,
                    })),
                },
            },
            include: {
                productsSold: true,
            },
        });
        return newSale;
    });
}
exports.createSaleService = createSaleService;
function getAllSaleService() {
    return __awaiter(this, void 0, void 0, function* () {
        const sales = yield prisma.sale.findMany({
            include: {
                seller: true,
                productsSold: {
                    include: {
                        product: {
                            include: {
                                product: true,
                                flavor: true,
                            },
                        },
                    },
                },
            },
        });
        return sales;
    });
}
exports.getAllSaleService = getAllSaleService;
function goBackSaleService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sale = yield prisma.sale.findUnique({
            where: { id },
            include: { productsSold: true },
        });
        if (!sale) {
            return null;
        }
        for (const product of sale.productsSold) {
            const stock = yield stockServise.checkStockExistsService(product.productId, product.flavorId, sale.sellerId);
            const newQuantity = stock.quantity + product.quantity;
            yield stockServise.updateQuantityStockService(stock.id, newQuantity);
            yield prisma.productDetail.delete({
                where: { id: product.id },
            });
        }
        yield prisma.sale.delete({
            where: { id },
        });
        return sale;
    });
}
exports.goBackSaleService = goBackSaleService;
//# sourceMappingURL=saleService.js.map