const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
}

async function verifyPassword(password, salt, hash) {
    const hashToCompare = await bcrypt.hash(password, salt);
    return hash === hashToCompare;
}

module.exports = {
    hashPassword,
    verifyPassword,
};
