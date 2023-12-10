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
exports.getDistributionByIdService = exports.getAllDistributionService = exports.transferStocksService = void 0;
const client_1 = require("@prisma/client");
const stockService = __importStar(require("./stockService"));
const prisma = new client_1.PrismaClient();
function checkStock(stock, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let stockCheck = null;
        if (stock.productId !== undefined && stock.flavorId !== undefined && stock.sellerId !== undefined) {
            try {
                console.log('estoy en la lunea 12', userId);
                stockCheck = yield stockService.checkStockExistsService(stock.productId, stock.flavorId, stock.sellerId, userId);
            }
            catch (error) {
                console.error('Error al verificar el stock:', error);
            }
        }
        else {
            console.error('Al menos una de las propiedades (productId, flavorId, sellerId) es undefined.');
        }
        return stockCheck;
    });
}
function calculateNewStockQuantities(fromStockQuantity, toStockQuantity, quantity) {
    const quantityDistribution = Math.min(quantity, fromStockQuantity);
    const newFromStockQuantity = fromStockQuantity - quantityDistribution;
    const newToStockQuantity = toStockQuantity + quantityDistribution;
    return { newFromStockQuantity, newToStockQuantity, quantityDistribution };
}
function updateStockQuantities(fromStockId, toStockId, userId, newFromStockQuantity, newToStockQuantity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all([
                stockService.updateQuantityStockService(fromStockId, newFromStockQuantity, userId),
                stockService.updateQuantityStockService(toStockId, newToStockQuantity, userId),
            ]);
        }
        catch (error) {
            console.error('Error al actualizar los stocks:', error);
            throw new Error('No se ha podido actualizar los stocks.');
        }
    });
}
function createNewDistribution(quantity, fromStockId, toStockId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (quantity === 0) {
                console.error('El vendedor de origen no tiene productos para distribuir');
                throw new Error('El vendedor de origen no tiene productos para distribuir');
            }
            return yield prisma.distribution.create({
                data: {
                    userId,
                    quantity,
                    fromStockId,
                    toStockId,
                },
            });
        }
        catch (error) {
            throw error;
        }
    });
}
function transferStockAndCreateDistribution(fromStock, toStock, quantity, fromStockId, toStockId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { newFromStockQuantity, newToStockQuantity, quantityDistribution } = calculateNewStockQuantities(fromStock.quantity, toStock.quantity, quantity);
        yield updateStockQuantities(fromStockId, toStockId, newFromStockQuantity, newToStockQuantity, userId);
        return createNewDistribution(quantityDistribution, fromStockId, toStockId, userId);
    });
}
function getAllDistributionService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const distribution = yield prisma.distribution.findMany({
            where: { userId },
        });
        return distribution;
    });
}
exports.getAllDistributionService = getAllDistributionService;
function getDistributionByIdService(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const DistributionById = yield prisma.distribution.findUnique({
            where: { id, userId },
            include: { sentFromStock: true, receivedAtStock: true },
        });
        return DistributionById || null;
    });
}
exports.getDistributionByIdService = getDistributionByIdService;
function transferStocksService(distributions, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        for (const distribution of distributions) {
            console.log('estoy dentro del for');
            const { quantity, sentFromStock, receivedAtStock } = distribution;
            const fromStocknew = yield checkStock(sentFromStock, userId);
            if (!fromStocknew) {
                throw new Error(`El stock desde donde se quiere hacer la distribucion no existe`);
            }
            let toStocknew = yield checkStock(receivedAtStock, userId);
            if (!toStocknew) {
                const newtoStock = {
                    userId,
                    productId: receivedAtStock.productId,
                    flavorId: receivedAtStock.flavorId,
                    quantity: 0,
                    sellerId: receivedAtStock.sellerId,
                };
                toStocknew = yield stockService.createstockNewService(newtoStock, userId);
            }
            if (fromStocknew && toStocknew && fromStocknew.productId === toStocknew.flavorId) {
                try {
                    const result = yield transferStockAndCreateDistribution(fromStocknew, toStocknew, quantity, fromStocknew.id, toStocknew.id, userId);
                    results.push(result);
                }
                catch (error) {
                    console.error('Error en la transacción:', error);
                    results.push(null);
                }
            }
            else {
                console.error('No se pueden transferir productos de tipos diferentes.');
                results.push(null);
            }
        }
        return results.filter((result) => result !== null);
    });
}
exports.transferStocksService = transferStocksService;
//# sourceMappingURL=distributionService.js.map