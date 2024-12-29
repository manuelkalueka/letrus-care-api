// getting-started.js
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import { config } from "dotenv";
config();

main()
  .then(() => console.log("Conexão com o MongoDB estabelecida com sucesso!"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

async function main(): Promise<void> {
  await mongoose.connect(
    `${process.env.CONNECTION_STRING}${process.env.DB_NAME}`
  );
}
