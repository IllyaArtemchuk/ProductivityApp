import passport from "passport";
import { Express } from "express";

module.exports = (app: Express) => {
  app.get("/auth/google", function (req, res, next) {
    passport.authenticate("google", {
      scope: ["profile"],
    })(req, res, next);
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.json("Hello!");
    }
  );

  app.get("/api/logout", (req, res) => {
    console.log("hoho you found me!");
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
