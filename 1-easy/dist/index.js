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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
exports.app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
exports.app.use(express_1.default.json());
exports.app.post("/sum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = req.body.a;
    const b = req.body.b;
    if (a > 100000 || b > 100000) {
        return res.status(422).json({
            message: "Sorry, we don't support big numbers."
        });
    }
    const result = a + b;
    try {
        yield prisma.request.create({
            data: {
                a: a,
                b: b,
                answer: result,
                type: "Sum"
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: "Database error", error: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
    res.json({ answer: result });
}));
exports.app.post("/multiply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = req.body.a;
    const b = req.body.b;
    const result = a * b;
    try {
        yield prisma.request.create({
            data: {
                a: a,
                b: b,
                answer: result,
                type: "Multiply"
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: "Database error", error: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
    res.json({ answer: result });
}));
