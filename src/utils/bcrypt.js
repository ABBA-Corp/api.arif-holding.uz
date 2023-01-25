const { genSaltSync, hash, compare } = require('bcrypt');

async function generateHash(password) {
    let salt = genSaltSync(10);
    return await hash(password, salt);
}

async function compareHash(password, hash) {
    return await compare(password, hash);
}

module.exports = {
    generateHash,
    compareHash,
};
