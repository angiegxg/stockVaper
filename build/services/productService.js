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
exports.getAllProductService = exports.createProductService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createProductService(product, flavorIds, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, img, cost } = product;
        const createProduct = yield prisma.product.create({
            data: {
                name,
                description,
                img,
                cost,
                userId,
                flavors: {
                    create: flavorIds.map((flavorId) => ({
                        flavor: {
                            connect: { id: flavorId },
                        },
                    })),
                },
            },
            include: {},
        });
        return createProduct;
    });
}
exports.createProductService = createProductService;
function getAllProductService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const allproduct = yield prisma.product.findMany({
            where: { userId },
        });
        return allproduct;
    });
}
exports.getAllProductService = getAllProductService;
//# sourceMappingURL=productService.js.map