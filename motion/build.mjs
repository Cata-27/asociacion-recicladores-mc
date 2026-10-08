// Compila las escenas a un solo archivo que la página carga sin necesidad de npm.
import { build } from "esbuild";

await build({
  entryPoints: ["src/web.jsx"],
  outfile: "../assets/js/motion.js",
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2019"],
  jsx: "automatic",
  legalComments: "none",
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "info",
});
