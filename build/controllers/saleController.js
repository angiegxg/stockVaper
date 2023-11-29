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
exports.getAllSaleController = exports.goBackSaleController = exports.createSaleController = void 0;
const saleService = __importStar(require("../services/saleService"));
function createSaleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sale = req.body;
        try {
            const newSale = yield saleService.createSaleService(sale);
            res.json(newSale);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear la venta' });
        }
    });
}
exports.createSaleController = createSaleController;
function goBackSaleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deletedSale = yield saleService.goBackSaleService(parseInt(id));
            if (deletedSale) {
                return res.json(deletedSale);
            }
            else {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al revertir la venta' });
        }
    });
}
exports.goBackSaleController = goBackSaleController;
function getAllSaleController(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sales = yield saleService.getAllSaleService();
            return res.json(sales);
        }
        catch (error) {
            return res.status(500).json({ error: 'Error al obtener las ventas' });
        }
    });
}
exports.getAllSaleController = getAllSaleController;
//# sourceMappingURL=saleController.js.map