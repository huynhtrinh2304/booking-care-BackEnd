'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {

        static associate(models) {
            Specialty.hasMany(models.Doctor_Infors, { foreignKey: 'specialtyId', as: 'specialty' })
        }
    };
    Specialty.init({

        name: DataTypes.STRING,
        image: DataTypes.STRING,
        descriptionHtml: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),

    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};