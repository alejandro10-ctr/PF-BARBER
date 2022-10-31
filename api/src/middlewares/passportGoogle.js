const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../db");
const { transporter } = require("../../configs/mailer");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

// Estrategia para Iniciar Sesion
const sendEmail = async (email) => {
  await transporter.sendMail({
    from: '"HENRY BARBER" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "¡Bienvenido a Henry Barber!", // Subject line
    text: "¡Gracias! Estamos encantados de que formes parte de nuestra comunidad", // plain text body
    html: "<b>Al registrarte se te enviaran descuentos =)</b>", // html body
  });
};

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
          id: profile.id,
          autByGoogle: true,
          avatar: profile.photos[0].value,

          //   password: profile._json.sub,
        }).then((user) => {
          sendEmail(user.dataValues.email);
        });

        done(null, profile);
      }
    }
  )
);
