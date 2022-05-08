'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Machine extends Model {}

    Machine.init({
        status : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },
        model : {
            type : DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        },

        total_wash_count : {
            type : DataTypes.INTEGER,
            validate : {
                notEmpty : true
            }
        },

        current_job_id : {
            type : DataTypes.INTEGER,
            validate : {
                notEmpty : true
            }
        },
        

    }, {
        sequelize,
        modelName : 'machine'
    });

    Machine.associate = (models) => {
        // associations can be defined here
        Machine.belongsTo(models.Job, {
            foreignKey : 'current_job_id',
            as : 'current_job'
        });
    };

    return Machine;
}