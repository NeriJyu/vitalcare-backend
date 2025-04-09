import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./database/database";
import router from "./api/routes/index.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado");
    app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no banco:", err);
  });
