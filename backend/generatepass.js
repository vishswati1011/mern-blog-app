
const {hashPassword} = require('./utilies/authPassword');

const pass = hashPassword("12345678")

console.log(pass)