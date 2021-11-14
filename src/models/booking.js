'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {

        static associate(models) {
            Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'time' }),
                Booking.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' })

        }
    };
    Booking.init({

        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.BIGINT,
        timeType: DataTypes.STRING,
        token: DataTypes.STRING,
        fullName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        reason: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};