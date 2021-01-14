export interface ConfigObject {
  googleClientID: string;
  googleClientSecret: string;
  mongoURI: string;
  cookieKey: string;
}

export let keys: ConfigObject;

if (process.env.NODE_ENV === "production") {
  keys = require("./prod");
} else {
  keys = require("./dev");
}
