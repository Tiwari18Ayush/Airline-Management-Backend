const bcrypt = require('bcrypt');
const { ServerConfig } = require('../../config');

function createHash(user) {
    const salt = bcrypt.genSaltSync(+ServerConfig.SALT_ROUNDS);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
}
function compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}
module.exports = {
    createHash,
    compareHash
};