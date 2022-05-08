'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Job extends Model {}

    Job.init({
        type : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        description : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        cost : {
            type : DataTypes.INTEGER,
            validate : {
                notEmpty : true
            }
        },
        status : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        // machine_id : {
        //     type : DataTypes.INTEGER,
        //     validate : {
        //         notEmpty : true
        //     }
        // },
        // contact_id : {
        //     type : DataTypes.INTEGER,
        //     validate : {
        //         notEmpty : true
        //     }
        // },
    }, {
        sequelize,
        modelName : 'job'
    });

    Job.associate = (models) => {
        // associations can be defined here
        // Job.belongsTo(models.Machine, {
        //     foreignKey : 'id',
        //     as : 'machine'
        // });
        // Job.belongsTo(models.Contact, {
        //     foreignKey : 'id',
        //     as : 'contact'
        // });
    };

    return Job;
}