"use strict";
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
exports.createstockNewService = exports.getStockByIdService = exports.getStockByFlavorProductService = exports.getStockBySellerService = exports.updateQuantityStockService = exports.deleteStockService = exports.getAllStockService = exports.createStockService = exports.checkStockExistsService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createstockNewService(stock, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productId, flavorId, quantity, sellerId } = stock;
        const createStock = yield prisma.stock.create({
            data: {
                userId,
                productId,
                flavorId,
                quantity,
                sellerId,
            },
        });
        return createStock;
    });
}
exports.createstockNewService = createstockNewService;
function checkStockExistsService(productId, flavorId, sellerId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStock = yield prisma.stock.findFirst({
            where: { productId, flavorId, sellerId, userId },
            select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true, userId: true },
        });
        return existingStock || null;
    });
}
exports.checkStockExistsService = checkStockExistsService;
function getStockBySellerService(sellerId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sellerStock = yield prisma.stock.findMany({
            where: { sellerId, userId },
            select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true, userId: true },
        });
        return sellerStock.length > 0 ? sellerStock : null;
    });
}
exports.getStockBySellerService = getStockBySellerService;
function getStockByFlavorProductService(productId, flavorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const flavorProductStock = yield prisma.stock.findMany({
            where: { productId, flavorId },
            select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true, userId: true },
        });
        return flavorProductStock.length > 0 ? flavorProductStock : null;
    });
}
exports.getStockByFlavorProductService = getStockByFlavorProductService;
function getAllStockService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const flavorProductStock = yield prisma.stock.findMany({
            where: { userId },
            include: {
                seller: true,
                product: {
                    include: {
                        product: true,
                        flavor: true,
                    },
                },
            },
        });
        return flavorProductStock.length > 0 ? flavorProductStock : null;
    });
}
exports.getAllStockService = getAllStockService;
function updateQuantityStockService(id, quantity, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateStock = yield prisma.stock.update({
            where: { id, userId },
            data: {
                quantity,
            },
        });
        console.log(updateStock);
        return updateStock;
    });
}
exports.updateQuantityStockService = updateQuantityStockService;
function createStockService(stock, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productId, flavorId, quantity, sellerId } = stock;
        const existingStock = yield checkStockExistsService(productId, flavorId, sellerId, userId);
        if (existingStock) {
            return yield updateQuantityStockService(existingStock.id, quantity, userId);
        }
        else {
            return yield createstockNewService(stock, userId);
        }
    });
}
exports.createStockService = createStockService;
function deleteStockService(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedStock = yield prisma.stock.delete({
            where: { id, userId },
        });
        return deletedStock;
    });
}
exports.deleteStockService = deleteStockService;
function getStockByIdService(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const stockById = yield prisma.stock.findUnique({
            where: { id, userId },
        });
        return stockById || null;
    });
}
exports.getStockByIdService = getStockByIdService;
//# sourceMappingURL=stockService.js.map