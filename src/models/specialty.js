'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {

        static associate(models) {
            // define association here
        }
    };
    Specialty.init({

        name: DataTypes.STRING,
        desription: DataTypes.TEXT,
        image: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};