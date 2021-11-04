'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {

        static associate(models) {


        }
    };
    Patient.init({

        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthdayPatient: DataTypes.STRING,
        reason: DataTypes.STRING,




    }, {
        sequelize,
        modelName: 'Patient',
    });
    return Patient;
};