import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Formato de token inválido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error verificando token:", err);
        return res.status(403).json({ error: "Token inválido o expirado" });
      }

      req.user = decoded; // Guardamos los datos del payload
      next();
    });
  } catch (error) {
    console.error("Error en auth middleware:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};