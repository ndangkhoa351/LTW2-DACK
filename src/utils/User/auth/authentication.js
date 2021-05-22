const bcrypt = require('bcrypt');
const UserRepo = require('../../../repositories/User/UserRepo');

const isTheSame = function(password, confirmPassword) {
    return password === confirmPassword;
}

const isNotEmpty = function(field) {
    return field !== "";
}

module.exports = {
    isTheSame,
    isNotEmpty,
}