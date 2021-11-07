'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Infors extends Model {

        static associate(models) {
            Doctor_Infors.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' }),
                Doctor_Infors.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' }),
                Doctor_Infors.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' }),
                Doctor_Infors.belongsTo(models.User, { foreignKey: 'doctorId' }),
                Doctor_Infors.belongsTo(models.Specialty, { foreignKey: 'specialtyId', as: 'specialty' })

        }
    };
    Doctor_Infors.init({

        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,





    }, {
        sequelize,
        modelName: 'Doctor_Infors',
    });
    return Doctor_Infors;
};