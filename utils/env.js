
process.env = Object.assign(process.env,(require('dotenv').config()));
delete process.env.parsed;
console.log(process.env);

