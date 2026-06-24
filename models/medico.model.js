import { Sequelize, DataTypes } from 'sequelize';
import orm from '../config/sequelize.js';
import { Especialidad } from './especialidad.model.js';

export const Medico = orm.define('medico', {
    id_medico:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    codigo_de_colegiatura_medica:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 5] }
    },
    id_especialidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Especialidad,
            key: 'id_especialidad'
        }
    }
},{
    tableName: 'medico',
    timestamps: false,
});

// Relaciones
Especialidad.hasMany(Medico, { foreignKey:'id_especialidad' });
Medico.belongsTo(Especialidad, { foreignKey:'id_especialidad' });

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};