import { Sequelize, DataTypes } from 'sequelize';
import orm from '../config/sequelize.js';

export const Paciente = orm.define('paciente', {
    id_paciente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_documento:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 40] }
    },
    nro_documento:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 10] }
    },
    nombres:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 40] }
    },
    apellidos:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 40] }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true }
    }
    // Se eliminaron 'password' y 'rol' porque no existen en la tabla física de tu BD
},{
    tableName: 'paciente',
    timestamps: false,
});

export const login = async function(objPaciente) {
    console.log("------------model paciente login------------");
    // Sequelize ahora solo buscará las columnas reales que quedan arriba
    const usuario = await Paciente.findOne({ where: { email: objPaciente.email } });
    return usuario ? [usuario.dataValues] : []; 
};

export const findById = async function(id_paciente) {
    console.log("------------model paciente findById------------");
    const usuario = await Paciente.findByPk(id_paciente);
    return usuario ? [usuario.dataValues] : [];
};

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};