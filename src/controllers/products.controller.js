import * as Service from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Service.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({error:"Error interno del servidor"});
    }
};

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Service.getProductById(id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({
            status: 404,
            mensaje: '😥 El ID indicado no corresponde a un producto ❌',
            ruta: req.originalUrl})
        }
    } catch (error) {
        console.error(`Error al obtener productos con ID ${req.params.id}:`, error)
        res.status(500).json({error: "Error interno del servidor"});
    }
};

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const updateProductData = req.body;   

        const updateProduct = await Service.updateProduct(id, updateProductData);
        if (updateProduct) {
            res.json(updateProduct);
        } else {
            res.status(404).json({
                status: 404,
                mensaje: '😥 Producto no encontrado ❌',
                ruta: req.originalUrl})
        }
    } catch (error) {
        console.error(`Error al actualizar producto con ID ${req.params.id}:`, error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const createProduct = await Service.createProduct(newProduct);
        res.status(201).json(createProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteProduct = await Service.deleteProduct(id);

        if (deleteProduct) {
            res.json({ message: "Producto eliminado con exito"})
        } else {
            res.status(404).json({
            status: 404,
            mensaje: '😥 Producto no encontrado ❌',
            ruta: req.originalUrl})
        }
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${req.params.id}:`, error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};