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
exports.getAllFlavorService = exports.createFlavorService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createFlavorService(flavors, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdFlavors = yield Promise.all(flavors.map((flavor) => __awaiter(this, void 0, void 0, function* () {
            const flavorLoweCase = flavor.flavor.toLocaleLowerCase();
            const existingFlavor = yield prisma.flavor.findMany({
                where: { flavor: flavorLoweCase, userId },
            });
            if (existingFlavor.length > 0) {
                throw new Error(`El sabor '${flavorLoweCase}' ya existe.`);
            }
            return yield prisma.flavor.create({
                data: { flavor: flavorLoweCase, userId },
            });
        })));
        return createdFlavors;
    });
}
exports.createFlavorService = createFlavorService;
function getAllFlavorService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const allflavor = yield prisma.flavor.findMany({
            where: { userId },
        });
        return allflavor;
    });
}
exports.getAllFlavorService = getAllFlavorService;
//# sourceMappingURL=flavorService.js.map