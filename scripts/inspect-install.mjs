import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const dir=path.join(process.env.LOCALAPPDATA,'npm-cache','_logs');
const logs=fs.readdirSync(dir).filter(x=>x.endsWith('.log')).sort().slice(-2);
for(const name of logs) console.log(name,fs.readFileSync(path.join(dir,name),'utf8').split('\n').slice(-35).join('\n'));
