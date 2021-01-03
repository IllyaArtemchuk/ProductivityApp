import { configObject } from "./keys";

let config: configObject = {
  googleClientID: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  mongoURI: process.env.MONGO_URI || "",
  cookieKey: process.env.COOKIE_KEY || "",
};

module.exports = config;
