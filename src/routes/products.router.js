import { Router } from "express";
const router = Router();

import {
    getAllProducts,
     getProductById,
    /*createProduct,*/
    updateProduct,
    /* deleteProduct */
} from "../controllers/products.controller.js";

import { auth } from "../middlewares/auth.middlewares.js";

//Rutas para obtener datos del servidor, solo lee información

    //Obtiene todos los productos del servidor
    router.get("/products", getAllProducts);

    //Obtiene el producto por su ID
    router.get("/products/:id", getProductById);

//Ruta para editar algun producto en el servidor

    router.put("/products/:id", auth, updateProduct);
    
export default router; 