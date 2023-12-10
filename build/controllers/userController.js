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
exports.checkUserController = exports.createUserController = void 0;
const userService_1 = require("../services/userService");
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const createdUser = yield (0, userService_1.createUserService)(user);
            res.status(201).json(createdUser);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.createUserController = createUserController;
function checkUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body; // Asume que los datos del usuario se encuentran en el cuerpo de la solicitud
            const userExists = yield (0, userService_1.checkUserService)(user);
            res.status(200).json({ exists: userExists });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.checkUserController = checkUserController;
//# sourceMappingURL=userController.js.map