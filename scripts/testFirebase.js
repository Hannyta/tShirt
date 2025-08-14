import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/models/firebase.js";
import "dotenv/config";

async function test() {
  console.log("API_KEY:", process.env.FIREBASE_API_KEY);
  try {
    const ref = collection(db, "testCollection");
    await addDoc(ref, { mensaje: "Hola Firestore!" });
    console.log("Documento creado con éxito");
  } catch (error) {
    console.error("Error al crear documento:", error);
  }
}

test();