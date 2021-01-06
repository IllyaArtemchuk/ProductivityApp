import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
require("./models/User");
import { graphqlHTTP } from "express-graphql";
import { keys } from "./config/keys";
import { schema } from "./schema/schema";

require("./services/passport");
require("./services/lyrics");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("DataBase Connection Successful");
  })
  .catch((err) => {
    console.log("Database Error");
  });

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    // 30 Days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

require("./routes/authRoutes")(app);
require("./routes/testRoutes")(app);

app.get("/", (req, res) => {
  res.json({ message: "Whats up dude" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
