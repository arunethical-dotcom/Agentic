import fs from 'fs';
const data = fs.readFileSync('domain_test.log', 'utf16le');
console.log(data);
