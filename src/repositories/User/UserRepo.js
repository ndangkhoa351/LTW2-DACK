const User = require('../../models/User/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

User.getByID = async function(id) {
    return User.findByPk(id);
}

User.getAll = async function() {
    return User.findAll();
}

User.getByEmail = async function(form_email) {
    return User.findOne({where: {email: form_email}});
}

User.add = async function(new_user) {
    const encryptedPassword = bcrypt.hashSync(new_user.password, saltRounds);
    const newUser = await User.create({
            email: new_user.email,
            password: encryptedPassword,
            displayName: new_user.displayName,
        });
    await newUser.save();
    return newUser;
}

User.delete = async function(uid_delete) {
    await User.destroy({
        where: {id: uid_delete}
    })
}

// User.update = async function(uid_to_update, email_update, password_update, displayName_update) {
//     await User.update({email: email_update, password: password_update, displayName: displayName_update}, {
//         where: {id: uid_to_update}
//     })
// };

User.updatePasswordByEmail = async function(email_to_update, password_update) {
    User.getByEmail(email_to_update).then(async function(result){
        result.password = password_update;
        result.save();
        return result;
    })
};

module.exports = User;