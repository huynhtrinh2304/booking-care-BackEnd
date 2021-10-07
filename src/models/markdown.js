'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {

        static associate(models) {
            // define association here
        }
    };
    Markdown.init({

        contentHtml: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        desription: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER


    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};