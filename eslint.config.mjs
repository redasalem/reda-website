import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "node_modules/**", "coverage/**", "test-results/**", "playwright-report/**", "projects/**", "scratch/**"]),
  { files: ["components/studio/studio.tsx"], rules: { "react-hooks/set-state-in-effect": "off" } },
]);
