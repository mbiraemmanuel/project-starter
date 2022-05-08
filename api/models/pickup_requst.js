'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Pickup_Request extends Model {}
    
    Pickup_Request.init({
        pickup_date : {
            type : DataTypes.DATE,
            validate : {
                notEmpty : true
            }
        },
        pickup_time : {
            type : DataTypes.TIME,
            validate : {
                notEmpty : true
            }
        },
        pickup_address : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        pickup_city : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        pickup_state : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        pickup_zip : {
            type : DataTypes.INTEGER,
            validate : {
                notEmpty : true
            }
        },
        pickup_country : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        pickup_notes : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        pickup_status : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        contact_id : {
            type : DataTypes.INTEGER,
            validate : {
                notEmpty : true
            }
        },
    }, {
        sequelize,
        modelName : 'pickup_request'
    });
    
    Pickup_Request.associate = (models) => {
        // associations can be defined here
        Pickup_Request.belongsTo(models.Contact, {
            foreignKey : 'contact_id',
            as : 'contact',
            onDelete : 'CASCADE'
        });
    };
    
    return Pickup_Request;
}