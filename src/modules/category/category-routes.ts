import express from "express";
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteEmptyCategory,
} from "../category/category-controller";
import { verifyToken } from "../../middleware/auth-middleware";

const router = express.Router();

router.post("/category", verifyToken, createCategory);
router.get("/categories", verifyToken, getCategories);
router.put("/category/:categoryId", verifyToken, updateCategory);
router.delete("/category/:categoryId", verifyToken, deleteEmptyCategory);

export default router;
