import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, "products.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

async function seedData() {
  try {
    const productsRef = collection(db, "products");
    for (let product of products) {
      await addDoc(productsRef, product);
      console.log(`✔️ ${product.modelo} (${product.color}) agregada`);
    }
    console.log("✅ Inventario cargado correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al cargar inventario:", error);
    process.exit(1);
  }
}

seedData();