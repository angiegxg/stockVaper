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
exports.getAllSellerStockByIDService = exports.deleteSellerService = exports.getAllSellerStockService = exports.ifSellerByNameService = exports.createSellerService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createSellerService(seller) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, commission } = seller;
        if (yield ifSellerByNameService(name)) {
            throw new Error(`El vendedor'${name}' ya existe.`);
        }
        const createSeller = yield prisma.seller.create({
            data: {
                name,
                commission,
            },
        });
        return createSeller;
    });
}
exports.createSellerService = createSellerService;
function ifSellerByNameService(seller) {
    return __awaiter(this, void 0, void 0, function* () {
        const SellerByName = yield prisma.seller.findUnique({
            where: { name: seller },
            select: { id: true, name: true, commission: true },
        });
        if (SellerByName) {
            return true;
        }
        return false;
    });
}
exports.ifSellerByNameService = ifSellerByNameService;
function getAllSellerStockService() {
    return __awaiter(this, void 0, void 0, function* () {
        const sellerStock = yield prisma.seller.findMany({
            include: {
                stock: {
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
        return sellerStock;
    });
}
exports.getAllSellerStockService = getAllSellerStockService;
function getAllSellerStockByIDService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sellerStock = yield prisma.seller.findMany({
            where: { id },
            include: {
                stock: {
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
        return sellerStock;
    });
}
exports.getAllSellerStockByIDService = getAllSellerStockByIDService;
function deleteSellerService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sellerDelete = yield prisma.seller.delete({
            where: { id },
        });
        return sellerDelete;
    });
}
exports.deleteSellerService = deleteSellerService;
//# sourceMappingURL=sellerService.js.map