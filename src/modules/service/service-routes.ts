import express from "express";
import {
    addService,
    getServices,
    updateService,
    deleteService,
} from "../service/service-controller";
import { verifyToken } from "../../middleware/auth-middleware";

const router = express.Router();

// Add a service to a category
router.post("/category/:categoryId/service", verifyToken, addService);

// Get all services in a category
router.get("/category/:categoryId/services", verifyToken, getServices);

// Update a service
router.put("/category/:categoryId/service/:serviceId", verifyToken, updateService);

// Delete a service
router.delete("/category/:categoryId/service/:serviceId", verifyToken, deleteService);

export default router;
