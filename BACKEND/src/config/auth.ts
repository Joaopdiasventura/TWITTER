import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../services/prisma";

export default function logar(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email: string, senha: string, done) => {
        
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          })

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
    
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    
    if (!user) {
        return done(null, { message: "Usuário não encontrado" });
    }

    done(null, user);
  });
}