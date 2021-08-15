'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {

        static associate(models) {
            // define association here
        }
    };
    History.init({

        patientId: DataTypes.INTEGER,
        doctorId: DataTypes.INTEGER,
        desription: DataTypes.TEXT,



    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};