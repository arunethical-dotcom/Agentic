import fs from 'fs';
const buf = fs.readFileSync('domain_test.log');
console.log('Bytes:', buf.length);
console.log('First 20 bytes:', buf.slice(0, 20));
console.log('As string:', buf.toString('utf8').substring(0, 100));
