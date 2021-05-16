const { DataTypes, where } = require('sequelize');
const db = require('./db');

const Cinema = db.define('Cinema',{
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    idCinemaComplex:{
        type:DataTypes.INT,
        allowNull:false        
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false        
    },
    width:{
        type:DataTypes.INT,
        allowNull:false        
    },
    height:{
        type:DataTypes.INT,
        allowNull:false        
    }
}); 


Cinema.findByName= async function (name){
    return Cinema.findOne({
        where: {name: name}
    });
};

Cinema.findById= async function (id){
    return Cinema.findByPk(id);
};

Cinema.add = async function (name,idCinemaComplex,type,width,height) {
    CinemaComplex.create({name,
        idCinemaComplex,
        type,
        width,
        height
    });
};

module.exports = Cinema;