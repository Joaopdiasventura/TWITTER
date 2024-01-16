import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { MongoClient } from "../database/mongo";
import { User } from "../models/user";

export default function logar(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email: string, senha: string, done) => {
        const db = MongoClient.db();
        const usersCollection = db.collection<User>("users");
        
        try {
          const user = await usersCollection.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Essa conta não existe" });
          }

          bcrypt.compare(senha, user.password, (erro, batem) => {
            if (erro) {
              return done(erro);
            }

            if (batem) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Senha incorreta" });
            }
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (email, done) => {
    
    const db = MongoClient.db();
    const usersCollection = db.collection<User>("users");

    const user = await usersCollection.findOne({ email });

    
    if (!user) {
        return done(null, { message: "Usuário não encontrado" });
    }

    done(null, user);
  });
}