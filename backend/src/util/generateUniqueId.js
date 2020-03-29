const crypto = require('crypto');

module.exports = function gereneteUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}