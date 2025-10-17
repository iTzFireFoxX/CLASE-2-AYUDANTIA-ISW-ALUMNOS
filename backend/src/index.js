import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/configDb.js";
import { routerApi } from "./routes/index.routes.js";
import { createUser } from "./config/initialSetup.js";
import { HOST, PORT } from "./config/configEnv.js";

const app = express();

// 2. Configura las opciones de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // El origen de tu frontend
  credentials: true // Permite el envío de cookies y cabeceras de autorización
};

app.use(cors(corsOptions)); // 3. Usa el middleware de CORS
app.use(express.json());
app.use(morgan("dev"));

// Ruta principal de bienvenida
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API REST con TypeORM!");
});

// Inicializa la conexión a la base de datos
connectDB()
  .then(async () => {
    // Carga todas las rutas de la aplicación
    routerApi(app);
    // Levanta el servidor Express
    await createUser();
    
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://${HOST}:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.log("Error al conectar con la base de datos:", error);
    process.exit(1);
  });