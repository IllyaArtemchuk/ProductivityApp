import passport from "passport";
import { Express } from "express";
import { generateFrontendURL } from "../helpers";

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
      res.redirect(generateFrontendURL("/tracker"));
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect(generateFrontendURL("/"));
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
