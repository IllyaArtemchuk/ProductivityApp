import { env } from "./config/dev_public";

export function generateFrontendURL(url: string): string {
  if (process.env.NODE_ENV === "production") {
    return url;
  } else {
    return `${env.frontendURL}${url}`;
  }
}
