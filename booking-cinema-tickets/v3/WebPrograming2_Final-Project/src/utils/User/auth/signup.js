const isTheSame = function(password, confirmPassword) {
    return password === confirmPassword;
}

const isNotEmpty = function(field) {
    return field !== "";
}

exports.isTheSame = isTheSame;
exports.isNotEmpty = isNotEmpty;