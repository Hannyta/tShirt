import {db} from "./firebase.js";

import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    setDoc,
    deleteDoc, 
} from "firebase/firestore";

const productsCollection = collection(db, "products");

//GET
export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

//GET
export const getProductById = async (id) => {
  try {
    const docRef = doc(productsCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {id: docSnap.id, ...docSnap.data() };
    } else{
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error);
  }
};

//PUT
export const updateProduct = async (id, updateProductData) => {
  try {
    const docRef = doc(productsCollection, id);
    await setDoc(docRef, updateProductData, {merge: true});
    return {id, ...updateProductData};
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error);
    return null;
  }
};

//POST
export const createProduct = async (newProduct) => {
  try {
    if (newProduct.id) {

      const docRef = doc(productsCollection, newProduct.id);
      await setDoc(docRef, newProduct);
      return { id: newProduct.id, ...newProduct };
    } else {
      const docRef = await addDoc(productsCollection, newProduct);
      return { id: docRef.id, ...newProduct };
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};

//DELETE
export const deleteProduct = async (id) => {
  try {
    const docRef = doc (productsCollection, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id}:`, error);
    return false;
  }
};