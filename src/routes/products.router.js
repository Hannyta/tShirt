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

//Rutas para obtener datos del servidor, solo lectura

    //Obtiene todos los productos del servidor
    router.get("/products", getAllProducts);

    //Obtiene el producto por su ID
    router.get("/product/:id", getProductById);

// Rutas protegidas (Requieren token)

    //Ruta para editar algun producto en el servidor
    router.put("/product/:id", auth, updateProduct);

    //Ruta para enviar datos al servidor, crear un nuevo producto
    router.post("/products", auth, createProduct);

    //Ruta para eliminar productos en el sevidor
    router.delete("/product/:id", auth, deleteProduct);
    
export default router; 