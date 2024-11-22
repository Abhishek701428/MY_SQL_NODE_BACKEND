import { Request, Response } from "express";
import { db } from "../../database/db";

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const [result] = await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
        res.json({ id: (result as any).insertId, name });
    } catch (error) {
        res.status(500).json({ message: "Error creating category.", error });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query("SELECT * FROM categories");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories.", error });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
        await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, categoryId]);
        res.json({ message: "Category updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating category.", error });
    }
};

export const deleteEmptyCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    try {
        const [services] = await db.query("SELECT * FROM services WHERE categoryId = ?", [categoryId]);
        if ((services as any[]).length > 0) {
            return res.status(400).json({ message: "Cannot delete category with services." });
        }

        await db.query("DELETE FROM categories WHERE id = ?", [categoryId]);
        res.json({ message: "Category deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category.", error });
    }
};
