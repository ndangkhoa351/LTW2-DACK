const User = require('../../models/User/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

User.getByID = async function (id) {
    return User.findByPk(id);
};

User.getAll = async function () {
    return User.findAll();
};

User.getByEmail = async function (form_email) {
    return User.findOne({ where: { email: form_email } });
};

User.add = async function (new_user) {
    const encryptedPassword = bcrypt.hashSync(new_user.password, saltRounds);
    const newUser = await User.create({
        email: new_user.email,
        password: encryptedPassword,
        displayName: new_user.displayName,
        phone: new_user.phone,
        wallet: 500000,
        permission_id: 2, // 2 represent id = 2 (user) in permission table
    });
    await newUser.save();
    return newUser;
};

User.authFacebook = async function (id) {
    return User.findOne({ where: { password: id } });
};

User.addFacebook = async function (id, email, displayName) {
    const newUser = await User.create({
        password: id,
        email: email,
        wallet: 500000,
        displayName: displayName,
        phone: 'facebook',
        permission_id: 2,
    });

    await newUser.save();
    return newUser;
};

User.authGoogle = async function (id) {
    return await User.findOne({ where: { password: id } });
};
User.addGoogle = async function (id, email, displayName) {
    const newUser = await User.create({
        password: id,
        email: email,
        wallet: 500000,
        displayName: displayName,
        phone: 'google',
        permission_id: 2,
    });

    await newUser.save();
    return newUser;
};

User.delete = async function (uid_delete) {
    await User.destroy({
        where: { id: uid_delete },
    });
};

User.updateRecord = async function (user_update) {
    try {
        const newUserDetail = {
            displayName: user_update.displayName,
            phone: user_update.phone,
        };

        User.update(newUserDetail, {
            where: { uuid: user_update.uuid },
        });
    } catch (error) {
        console.log(error);
    }
};

User.updateWallet = async function(userID, wallet) {
    try {
        const updateDetail = {
            wallet: wallet
        };

        User.update(updateDetail, {
            where: { uuid: userID },
        });
    } catch (error) {
        console.log(error);
    }
}

User.updatePasswordByEmail = async function (email_to_update, password_update) {
    try {
        const encryptedPassword = bcrypt.hashSync(password_update, saltRounds);
        const newPasswordDetail = {
            password: encryptedPassword,
        };

        User.update(newPasswordDetail, {
            where: { email: email_to_update },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = User;
