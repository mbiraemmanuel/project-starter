'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {}

    Notification.init({
        type : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        message : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        status : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        }
    }, {
        sequelize,
        modelName : 'notification'
    });

    Notification.associate = (models) => {
        // associations can be defined here
        
    };

    return Notification;
}