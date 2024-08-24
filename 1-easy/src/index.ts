import express from "express";
import { PrismaClient } from "@prisma/client";

export const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/sum", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;

    if (a > 100000 || b > 100000) {
        return res.status(422).json({
            message: "Sorry, we don't support big numbers."
        });
    }

    const result = a + b;

    try {
        await prisma.request.create({
            data: {
                a: a,
                b: b,
                answer: result,
                type: "Sum"
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: "Database error", error: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }

    res.json({ answer: result });
});

app.post("/multiply", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;

    const result = a * b;

    try {
        await prisma.request.create({
            data: {
                a: a,
                b: b,
                answer: result,
                type: "Multiply"
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: "Database error", error: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }

    res.json({ answer: result });
});
