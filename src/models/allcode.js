'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {

        static associate(models) {


            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' }),
                Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' }),
                Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' }),


                Allcode.hasMany(models.Doctor_Infors, { foreignKey: 'priceId', as: 'priceData' })
            Allcode.hasMany(models.Doctor_Infors, { foreignKey: 'paymentId', as: 'paymentData' })
            Allcode.hasMany(models.Doctor_Infors, { foreignKey: 'provinceId', as: 'provinceData' }),
                Allcode.hasOne(models.Booking, { foreignKey: 'timeType', as: 'time' })


        }
    };
    Allcode.init({

        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,




    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};