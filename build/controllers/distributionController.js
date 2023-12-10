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
exports.getDistributionByIdController = exports.getDistributionController = exports.createNewDistributionsController = void 0;
const distributionService = __importStar(require("../services/distributionService"));
function createNewDistributionsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const distributions = req.body.distribution;
            console.log('estoy en el controlller distribution:', distributions);
            const userId = req.body.userId;
            console.log('estoy en el controlller distribution UserID:', userId);
            const results = yield distributionService.transferStocksService(distributions, userId);
            const successfulDistributions = results.filter((result) => result !== null);
            const failedDistributions = results.filter((result) => result === null);
            if (successfulDistributions.length > 0) {
                return res.status(201).json({ message: 'Nuevas distribuciones creadas', successfulDistributions });
            }
            else {
                return res.status(500).json({ message: 'Error al crear las distribuciones', failedDistributions });
            }
        }
        catch (error) {
            console.error('Error al procesar la solicitud', error);
            return res.status(500).json({ message: 'Error interno del servidor', error });
        }
    });
}
exports.createNewDistributionsController = createNewDistributionsController;
const getDistributionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const allDistribution = yield distributionService.getAllDistributionService(+userId);
        res.json(allDistribution);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al traer el listado de distribuciones' });
    }
});
exports.getDistributionController = getDistributionController;
function getDistributionByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, userId } = req.params;
        try {
            const distribution = yield distributionService.getDistributionByIdService(+id, +userId);
            if (distribution) {
                res.json(distribution);
            }
            else {
                res.status(404).json({ error: 'No se encontraron registros de la distribucion' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener la distribucion por id' });
        }
    });
}
exports.getDistributionByIdController = getDistributionByIdController;
//# sourceMappingURL=distributionController.js.map