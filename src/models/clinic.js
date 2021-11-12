'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {

        static associate(models) {
            Clinic.hasMany(models.Doctor_Infors, { foreignKey: 'clinicId', as: 'clinic' })

        }
    };
    Clinic.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        descriptionHtml: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        image: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};