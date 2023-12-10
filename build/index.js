"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const flavorRoute_1 = __importDefault(require("./routes/flavorRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const sellerRoute_1 = __importDefault(require("./routes/sellerRoute"));
const stockRoute_1 = __importDefault(require("./routes/stockRoute"));
const saleRoute_1 = __importDefault(require("./routes/saleRoute"));
const distributionRoute_1 = __importDefault(require("./routes/distributionRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)());
const PORT = process.env.PORT || 3001;
app.use('/flavor', flavorRoute_1.default);
app.use('/product', productRoute_1.default);
app.use('/seller', sellerRoute_1.default);
app.use('/stock', stockRoute_1.default);
app.use('/sale', saleRoute_1.default);
app.use('/distribution', distributionRoute_1.default);
app.use('/user', userRoute_1.default);
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map