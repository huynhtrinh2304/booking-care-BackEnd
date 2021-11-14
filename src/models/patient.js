'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {

        static associate(models) {
            Patient.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patient' })
        }
    };
    Patient.init({

        email: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Patient',
    });
    return Patient;
};