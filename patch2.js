import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /batch\.set\(doc\(db, 'site_data', '([^']+)'\), (\{[^}]+\}), \{ merge: true \}\);/g;

code = code.replace(regex, "batch.set(doc(db, 'site_data', '$1'), JSON.parse(JSON.stringify($2)), { merge: true });");

fs.writeFileSync('src/App.tsx', code);
console.log("Patched");
