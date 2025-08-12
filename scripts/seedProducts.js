import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/models/firebase.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, "products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

function validarProducto(product, index) {
  let valido = true;

  Object.entries(product).forEach(([key, value]) => {
    const tipo = typeof value;

    // Log para debug
    console.log(`  Campo "${key}" => valor:`, value, `(${tipo})`);

    // Firestore no acepta undefined, NaN, Infinity, null en números, ni objetos vacíos
    if (value === undefined) {
      console.error(`❌ Producto #${index + 1}: El campo "${key}" es undefined`);
      valido = false;
    }
    if (tipo === "number" && (isNaN(value) || !isFinite(value))) {
      console.error(`❌ Producto #${index + 1}: El campo "${key}" tiene número inválido`);
      valido = false;
    }
    if (tipo === "string" && !value.trim()) {
      console.error(`❌ Producto #${index + 1}: El campo "${key}" es una cadena vacía`);
      valido = false;
    }
  });

  return valido;
}

async function seedData() {
  try {
    const productsRef = collection(db, "products");

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`\n🚀 Subiendo producto #${i + 1}:`, product.modelo || "(sin modelo)");

      if (!validarProducto(product, i)) {
        console.error(`⚠️ Producto #${i + 1} saltado por errores de validación.\n`);
        continue;
      }

      await addDoc(productsRef, product);
      console.log("✔️ Subido correctamente");
    }

    console.log("\n✅ Inventario cargado correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error al cargar inventario:", error);
    process.exit(1);
  }
}

seedData();