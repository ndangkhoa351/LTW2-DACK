const bcrypt = require('bcrypt');
const UserRepo = require('../../../repositories/User/UserRepo');

const isTheSame = function(password, confirmPassword) {
    return password === confirmPassword;
}

const isNotEmpty = function(field) {
    return field !== "";
}

const isAdmin = (user) => {
    return user.permission_id === 1;
}

module.exports = {
    isAdmin,
    isTheSame,
    isNotEmpty,
}