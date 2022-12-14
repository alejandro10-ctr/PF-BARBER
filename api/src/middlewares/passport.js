const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../db.js");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretKey";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);

    User.findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((error) => console.log(error));
  })
);
