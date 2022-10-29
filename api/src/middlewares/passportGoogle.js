const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../db");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

// Estrategia para Registrarse

passport.use(
  "sign-in-google",
  new GoogleStrategy(
    {
      clientID:
        "877624758917-d8cb6f147jp9cnrp524d0fupcuka3dvs.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log(profile._json.sub);
      const user = await User.findOne({
        where: { email: profile.emails[0].value },
      }); // si el usuario no existe
      //lo creamos
      if (user) {
        done(null, user);
      } else {
        let newUser = User.create({
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          //   password: profile._json.sub,
          // avatar: profile.photos[0].value
        });
        done(null, profile);
      }
    }
  )
);

// Estrategia para Iniciar Sesion

passport.use(
  "sign-up-google",
  new GoogleStrategy(
    {
      clientID:
        "877624758917-d8cb6f147jp9cnrp524d0fupcuka3dvs.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/auth/google/signup",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({
        where: { email: profile.emails[0].value },
      }); // si existe en la base de datos
      //  puede iniciar sesion
      if (user) {
        done(null, user);
      } else {
        let newUser = User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          // id: profile.id,
          autByGoogle: true,

          //   password: profile._json.sub,
          // avatar: profile.photos[0].value
        });
        done(null, profile);
      }
    }
  )
);
