import "dotenv/config";
import express from "express";
import cors from "cors";

import productsRouter from "./src/routes/products.router.js";
import authRouter from "./src/routes/auth.router.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json("Bienvenidos a la API Rest de TShirt");
});

// Rutas
app.use("/", productsRouter);
app.use("/auth", authRouter);

// 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    mensaje: "😭 La ruta que solicitaste no existe",
    ruta: req.originalUrl
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT} ⚡`));