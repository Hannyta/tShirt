import "dotenv/config"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/models/firebase.js";

async function testUpload() {
  const testProduct = {
    modelo: "Test Producto",
    color: "Rojo",
    talla: "M",
    material: "Algodon",
    precio: 10,
    stock: 5
  };

  try {
    await addDoc(collection(db, "products"), testProduct);
    console.log("✅ Test producto subido correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al subir test producto:", error);
    process.exit(1);
  }
}

testUpload();