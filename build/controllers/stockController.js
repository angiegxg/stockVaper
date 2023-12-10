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
exports.getStockByFlavorProductController = exports.getStockBySellerController = exports.updateStockController = exports.deleteStockController = exports.getAllStockController = exports.createStockController = void 0;
const stockService = __importStar(require("../services/stockService"));
function createStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { stock, userId } = req.body;
        try {
            const createStock = yield stockService.createStockService(stock, userId);
            res.json(createStock);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el nuevo stock' });
        }
    });
}
exports.createStockController = createStockController;
function getAllStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const allStock = yield stockService.getAllStockService(+userId);
            res.json(allStock);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el nuevo stock' });
        }
    });
}
exports.getAllStockController = getAllStockController;
function deleteStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, userId } = req.params;
        try {
            const deletedStock = yield stockService.deleteStockService(+id, +userId);
            if (deletedStock) {
                res.json({ message: 'Stock eliminado correctamente' });
            }
            else {
                res.status(404).json({ error: 'Stock no encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'No se pudo eliminar el stock' });
        }
    });
}
exports.deleteStockController = deleteStockController;
function updateStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, quantity, userId } = req.body;
        try {
            const updatedStock = yield stockService.updateQuantityStockService(id, quantity, userId);
            res.json(updatedStock);
        }
        catch (error) {
            res.status(500).json({ error: 'No se pudo actualizar el stock' });
        }
    });
}
exports.updateStockController = updateStockController;
function getStockBySellerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, userId } = req.params;
        try {
            const sellerStock = yield stockService.getStockBySellerService(+id, +userId);
            if (sellerStock) {
                res.json(sellerStock);
            }
            else {
                res.status(404).json({ error: 'No se encontraron registros de stock para este vendedor' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener el stock por vendedor' });
        }
    });
}
exports.getStockBySellerController = getStockBySellerController;
function getStockByFlavorProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = parseInt(req.params.productId);
        const flavorId = parseInt(req.params.flavorId);
        try {
            const flavorProductStock = yield stockService.getStockByFlavorProductService(productId, flavorId);
            if (flavorProductStock) {
                res.json(flavorProductStock);
            }
            else {
                res.status(404).json({ error: 'No se encontraron registros de stock para este producto y sabor' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener el stock por producto y sabor' });
        }
    });
}
exports.getStockByFlavorProductController = getStockByFlavorProductController;
//# sourceMappingURL=stockController.js.map