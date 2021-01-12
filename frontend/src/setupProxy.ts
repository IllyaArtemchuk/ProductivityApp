const createProxyMiddleware = require("http-proxy-middleware");
export default function a(app: any) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
}
