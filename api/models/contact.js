'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {}

    Contact.init({
        contact_id : {
            type : DataTypes.INTEGER,
            validate : {
                notEmpty : true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        preferredContact: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    }, {
        sequelize,
        modelName: 'contact'
    });

    Contact.associate = (models) => {
        // associations can be defined here
    };

    return Contact;
}