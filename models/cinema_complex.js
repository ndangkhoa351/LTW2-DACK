const { DataTypes, where } = require('sequelize');
const db = require('./db');

const CinemaComplex = db.define('CinemaComplex',{
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false        
    }
}); 


CinemaComplex.findByName= async function (name){
    return CinemaComplex.findOne({
        where: {name: name}
    });
};

CinemaComplex.findById= async function (id){
    return CinemaComplex.findByPk(id);
};

CinemaComplex.add = async function (name,address) {
    CinemaComplex.create({name,
        address
    });
};

module.exports = CinemaComplex;