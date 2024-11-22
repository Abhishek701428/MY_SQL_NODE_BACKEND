import { Request, Response } from "express";
import { db } from "../../database/db";

export const addService = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { name, type } = req.body;

    try {
        const [categoryExists] = await db.query("SELECT * FROM categories WHERE id = ?", [categoryId]);
        if ((categoryExists as any[]).length === 0) {
            return res.status(404).json({ message: "Category not found." });
        }

        const [result] = await db.query(
            "INSERT INTO services (categoryId, name, type) VALUES (?, ?, ?)",
            [categoryId, name, type]
        );

        res.json({ id: (result as any).insertId, categoryId, name, type });
    } catch (error) {
        res.status(500).json({ message: "Error adding service.", error });
    }
};

export const getServices = async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    try {
        const [rows] = await db.query("SELECT * FROM services WHERE categoryId = ?", [categoryId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services.", error });
    }
};


export const updateService = async (req: Request, res: Response) => {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    try {
        const [serviceExists] = await db.query(
            "SELECT * FROM services WHERE id = ? AND categoryId = ?",
            [serviceId, categoryId]
        );

        if ((serviceExists as any[]).length === 0) {
            return res.status(404).json({ message: "Service not found." });
        }

        await db.query("UPDATE services SET name = ?, type = ? WHERE id = ?", [name, type, serviceId]);


        if (priceOptions && Array.isArray(priceOptions)) {
            await db.query("DELETE FROM service_price_options WHERE serviceId = ?", [serviceId]);

            for (const option of priceOptions) {
                await db.query(
                    "INSERT INTO service_price_options (serviceId, duration, price, type) VALUES (?, ?, ?, ?)",
                    [serviceId, option.duration, option.price, option.type]
                );
            }
        }

        res.json({ message: "Service updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating service.", error });
    }
};

export const deleteService = async (req: Request, res: Response) => {
    const { categoryId, serviceId } = req.params;

    try {
        const [serviceExists] = await db.query(
            "SELECT * FROM services WHERE id = ? AND categoryId = ?",
            [serviceId, categoryId]
        );

        if ((serviceExists as any[]).length === 0) {
            return res.status(404).json({ message: "Service not found." });
        }

        await db.query("DELETE FROM service_price_options WHERE serviceId = ?", [serviceId]);
        await db.query("DELETE FROM services WHERE id = ?", [serviceId]);

        res.json({ message: "Service deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service.", error });
    }
};
