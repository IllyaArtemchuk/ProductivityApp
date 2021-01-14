import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";
require("./models/User");
require("./models/Action");
import { graphqlHTTP } from "express-graphql";
import { keys } from "./config/keys";
import { schema } from "./schema/schema";

require("./services/passport");
require("./services/lyrics");

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DataBase Connection Successful");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database Error");
  });

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
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

const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);
