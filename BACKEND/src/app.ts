import {config} from "dotenv";
import express from "express";
import cors from "cors";
import { MongoClient } from "./database/mongo";"./controllers/create-user/createUser";
import  user  from "./routes/user";

config();

const main = async () => {

    const app = express();
    const port = process.env.PORT || 3000;
    
    app.use(cors());
    app.use(express.json())
    
    app.use(user);

    await MongoClient.connect().then(()=>console.log("Conectado ao banco de dados..."));
    
    app.listen(port, ()=> console.log(`Servidor rodando na porta ${port}`));
};

main();