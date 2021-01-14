export function generateBackendURL(url: string): string {
  if (process.env.REACT_APP_BACKEND_URL) {
    return `${process.env.REACT_APP_BACKEND_URL}${url}`;
  } else {
    return url;
  }
}
