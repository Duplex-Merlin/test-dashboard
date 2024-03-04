const fs = require('fs');
const uuid = require('uuid');
require('dotenv').config();

const apiKey = uuid.v4();

fs.appendFileSync('.env', `API_KEY=${apiKey}\n`);

console.log(`Generated API key is : ${apiKey}`);
