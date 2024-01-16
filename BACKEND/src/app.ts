import {config} from "dotenv";
import express from "express";
import cors from "cors";
import  user  from "./routes/user";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import logar from "./config/auth";

config();

const main = async () => {

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(
        session({
          secret: "Jpplay2_0",
          resave: true,
          saveUninitialized: true,
        })
      );
    
    app.use(cors());
    app.use(express.json())
    app.use(morgan("dev"))

    app.use(passport.initialize());
    app.use(passport.session());
    
    logar(passport);

    app.use(user);
    
    app.listen(port, ()=> console.log(`Servidor rodando na porta ${port}`));
};

main();