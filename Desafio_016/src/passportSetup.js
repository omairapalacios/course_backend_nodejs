import { userService } from "./services/userService";
import { Strategy as LocalStrategy } from "passport-local";

export const setUpPassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await userService.createUser({ email, password });
          return done(null, user);
        } catch (e) {
          console.log("User already exists");
          return done(null, false);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        console.log(email);
        console.log(password);
        try {
          const user = await userService.verifyUser(email, password);
          return done(null, user);
        } catch (e) {
          console.log("Credentials is not valid");
          return done(null, false);
        }
      }
    )
  );
};
