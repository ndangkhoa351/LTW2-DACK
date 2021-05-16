const { DataTypes, where } = require('sequelize');
const db = require('./db');

const User = db.define('User',{
    email: {
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false        
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    phone:{
        type:DataTypes.BLOB,
        allowNull: true
    },
    role:{
        type:DataTypes.INT,
        allowNull:true
    }
}); 


User.findByEmail= async function (email){
    return User.findOne({
        where: {email: email}
    });
};

User.findById= async function (id){
    return User.findByPk(id);
};

User.add = async function (email,password,name,phone,role) {
    User.create({email,
        password,
        name,
        phone,
        role
    });
};

module.exports = User;