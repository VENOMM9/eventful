"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionToMongodb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
function connectionToMongodb() {
    mongoose_1.default.connect(config_1.default.MONGODB_URL);
    const dbConnection = mongoose_1.default.connection;
    dbConnection.on("connected", () => {
        console.log("mongodb connection successful ");
    });
    dbConnection.on("error", (err) => {
        console.error(err);
        console.log("mongodb connection unsuccessful");
    });
}
exports.connectionToMongodb = connectionToMongodb;
