import { Sequelize, DataTypes } from 'sequelize';
import orm from '../config/sequelize.js';

export const Especialidad = orm.define('especialidad', {
    id_especialidad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 45]
        }
    }
},{
    tableName: 'especialidad',
    timestamps: false,
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};