import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/models/firebase.js";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, "products.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

async function seedData() {
  try {
    const productsRef = collection (db, "products");

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`Subiendo producto #${i + 1}:`, product);

      if (typeof product.modelo !== 'string' || !product.modelo.trim()) {
        console.error('Modelo inválido en product:', product);
        continue;
      }
      if (typeof product.precio !== 'number' || isNaN(product.precio)) {
        console.error('Precio inválido en product:', product);
        continue;
      }
      if (typeof product.stock !== 'number' || isNaN(product.stock)) {
        console.error('Stock inválido en product:', product);
        continue;
      }

      // Subir documento
      await addDoc(productsRef, product);
      console.log('✔️ Subido correctamente');
    }

    console.log("✅ Inventario cargado correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al cargar inventario:", error);
    process.exit(1);
  }
}

seedData();
