export interface configObject {
  googleClientID: string;
  googleClientSecret: string;
  mongoURI: string;
  cookieKey: string;
}

export let keys: configObject;

if (process.env.NODE_ENV === "production") {
  keys = require("./prod");
} else {
  keys = require("./dev");
}
