const crypto = require('crypto');
require('dotenv').config();

const hashPassword = password => crypto.createHash('sha256').update(password).digest('hex');

const compareHashPassword = (password, dbpass) => {
    if (password === dbpass) {
        console.log("matched")
        return true;
    }
    return false;
};
module.exports = {
    hashPassword,
    compareHashPassword,
};