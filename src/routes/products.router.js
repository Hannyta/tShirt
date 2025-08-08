import { Router } from "express";
const router = Router();

import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/products.controller.js";

import { auth } from "../middlewares/auth.middlewares.js";

//Rutas para obtener datos del servidor, solo lee información
    //Obtiene todos los productos del servidor
    router.get("/products", getAllProducts);

export default router; 