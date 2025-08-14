import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Bienvenidos a la API Rest de TShirt")
});

import productsRouter from "./src/routes/products.router.js";
app.use("/", productsRouter);

import authRouter from "./src/routes/auth.router.js";
app.use("/auth", authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        mensaje: "😭 La ruta que solicitaste no existe",
        ruta: req.originalUrl
    })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));