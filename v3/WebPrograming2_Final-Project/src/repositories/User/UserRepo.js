const User = require('../../models/User/User');
const bcrypt = require('bcrypt');
const Permission = require('../../models/User/Permission');
let sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');
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
            phone: new_user.phone,
            permission_id: 2,           // 2 represent id = 2 (user) in permission table
        });
    await newUser.save();
    return newUser;
}

User.delete = async function(uid_delete) {
    await User.destroy({
        where: {id: uid_delete}
    })
}

User.updateRecord = async function(user_update) {
    try {
        const encryptedPassword = bcrypt.hashSync(user_update.password, 10);
        const newUserDetail = {
            email: user_update.email,
            password: encryptedPassword,
            displayName: user_update.displayName,
            phone: user_update.phone,
        };

        User.update( newUserDetail, {
                where: {uuid: user_update.uuid},
            },
        )
    } catch (error) {
        console.log(error);
    }
};

User.updatePasswordByEmail = async function(email_to_update, password_update) {
    User.getByEmail(email_to_update).then(async function(result){
        result.password = password_update;
        result.save();
        return 1;
    })
    .catch(err => {
        return 0;
    });
};

module.exports = User;