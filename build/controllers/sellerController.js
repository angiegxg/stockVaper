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
exports.getSellerStockByIdController = exports.deleteSellerController = exports.getSellerStockController = exports.createSellerController = void 0;
const sellerService = __importStar(require("../services/sellerService"));
function createSellerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const seller = req.body.seller;
        try {
            const createSeller = yield sellerService.createSellerService(seller);
            res.json(createSeller);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.createSellerController = createSellerController;
function getSellerStockController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const createSeller = yield sellerService.getAllSellerStockService(+userId);
            res.json(createSeller);
        }
        catch (errors) {
            res.status(500).json({ error: 'Error al crear traer todos los vendedores' });
        }
    });
}
exports.getSellerStockController = getSellerStockController;
function getSellerStockByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, userId } = req.params;
        try {
            const sellerById = yield sellerService.getAllSellerStockByIDService(+id, +userId);
            res.json(sellerById);
        }
        catch (errors) {
            res.status(500).json({ error: 'Error al crear el vendedor' });
        }
    });
}
exports.getSellerStockByIdController = getSellerStockByIdController;
function deleteSellerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, userId } = req.params;
        try {
            const deletedSeller = yield sellerService.deleteSellerService(+id, +userId);
            if (deletedSeller) {
                return res.json(deletedSeller);
            }
            else {
                return res.status(404).json({ error: 'Vendedor no encontrado' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al borrar vendedor' });
        }
    });
}
exports.deleteSellerController = deleteSellerController;
//# sourceMappingURL=sellerController.js.map