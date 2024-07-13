// getting-started.js
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import { config } from "dotenv";
config();

main()
  .then(() => console.log("Conectado a Base de Dados com sucesso!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `${process.env.CONNECTION_STRING}/${process.env.DB_NAME}`
  );
}
