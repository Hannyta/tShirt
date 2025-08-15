# 🛍️ API REST - TShirt

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)
![Firebase](https://img.shields.io/badge/Firebase-9.x-orange?logo=firebase)
![JWT](https://img.shields.io/badge/JWT-Secure-blue)

API REST para gestionar productos de una tienda de remeras. Incluye **autenticación con JWT** y persistencia de datos en **Firebase Firestore**.

---

## 🔧 Tecnologías

- Node.js
- Express
- Firebase Firestore
- JSON Web Token (JWT)
- CORS
- dotenv

---

## 🚀 Instalación

1. Clonar repositorio:
```bash
git clone <https://github.com/Hannyta/tShirt.git>
cd tShirt 
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear .env con tus variables de Firebase y JWT:

PORT=...

FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...

JWT_SECRET=...

4. Iniciar el servidor:

```bash
npm start
```
---

## 🔑 Autenticación

POST /auth/login
- Inicia sesión y devuelve JWT.
- Body:

```json
{
  "email": "user@email.com",
  "password": "strongPass123"
}
```
- Respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```
⚠️ Para rutas protegidas, enviar token en el header:

```makefile
Authorization: Bearer <token>
```
---
## 👕 Rutas de Productos

Públicas (solo lectura)
Método	Ruta	Descripción
GET	/products	Obtener todos los productos
GET	/product/:id	Obtener producto por ID

Protegidas (requieren JWT)
Método	Ruta	Descripción
POST	/products	Crear producto
PUT	/product/:id	Actualizar producto
DELETE	/product/:id	Eliminar producto

---
## 📂 Estructura del proyecto
```bash
/src
  /controllers
    auth.controller.js
    products.controller.js
  /models
    products.model.js
  /services
    products.service.js
  /routes
    auth.router.js
    products.router.js
  /middlewares
    auth.middleware.js
index.js
```

- controllers → manejan requests y responses.
- services → lógica de negocio y validaciones.
- models → interactúan con Firestore.
- routes → definen endpoints.
- middlewares → funciones como autenticación JWT.

---
## ⚡ Funcionalidades
- Autenticación con JWT.
- CRUD completo de productos.
- Rutas públicas y privadas.
- Manejo de errores consistente en JSON.
- Integración con Firestore.
---
### 🛠️ Mejoras sugeridas
- Roles de usuario (admin / cliente).
- Validaciones más estrictas de datos.
- Logs y monitoreo.
- Tests automatizados con Jest o Mocha.
---

## 💡 Autor
Hecho por [Hannymer Linares]
Proyecto de ejemplo de API REST con autenticación y Firestore.
---