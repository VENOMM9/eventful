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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Function to generate QR code and save it to a file
const generateQRCode = (data, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate QR code as a data URI
        const qrCodeDataURI = yield qrcode_1.default.toDataURL(data);
        // Convert data URI to buffer
        const buffer = Buffer.from(qrCodeDataURI.split(',')[1], 'base64');
        // Construct the file path
        const qrCodeDir = path_1.default.join(__dirname, '..', 'utils', 'qr_codes');
        const filePath = path_1.default.join(qrCodeDir, fileName);
        // Write buffer to file asynchronously
        yield fs_1.default.promises.writeFile(filePath, buffer);
        console.log('QR code generated and saved successfully');
    }
    catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Error generating QR code');
    }
});
exports.generateQRCode = generateQRCode;
