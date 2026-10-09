import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
for (const name of ['next', 'three', '@react-three/fiber', 'firebase-admin', 'jest', '@playwright/test', 'firebase-tools']) {
  try { console.log(name + ': ' + require.resolve(name)); } catch { console.log(name + ': missing'); }
}
for (const file of ['.env.local', '.env']) {
  if (fs.existsSync(file)) console.log(file + ' keys: ' + [...fs.readFileSync(file, 'utf8').matchAll(/^([A-Z_][A-Z0-9_]*)=/gm)].map(m=>m[1]).join(', '));
}
for (const dir of ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Java', 'C:/Program Files/Eclipse Adoptium']) console.log(dir + ': ' + fs.existsSync(dir));
console.log('JDKs:', fs.readdirSync('C:/Program Files/Eclipse Adoptium'));
for (const p of ['firebase/firestore/dist/firestore/index.d.ts', '@firebase/firestore/dist/index.d.ts']) console.log(p, fs.existsSync('node_modules/' + p));
