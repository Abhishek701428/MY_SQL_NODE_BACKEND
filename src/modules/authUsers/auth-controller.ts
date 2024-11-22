import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === "admin@codesfortomorrow.com" && password === "Admin123!@#") {
        const token = jwt.sign({ email }, process.env.AUTH_SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials." });
};
