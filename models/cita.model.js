import { Sequelize, DataTypes } from 'sequelize';
import orm from '../config/sequelize.js';
import { Paciente } from './paciente.model.js';
import { Medico } from './medico.model.js';

export const Cita = orm.define('cita', {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Paciente,
            key: 'id_paciente'
        }
    },
    id_medico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Medico,
            key: 'id_medico'
        }
    },
    archivo: {
        type: DataTypes.STRING,
        allowNull: true
        }
    }
, {
    freezeTableName: true,
    tableName: 'cita',
    timestamps: false,
});

// Relaciones
Paciente.hasMany(Cita, { foreignKey: 'id_paciente' });
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente' });

Medico.hasMany(Cita, { foreignKey: 'id_medico' });
Cita.belongsTo(Medico, { foreignKey: 'id_medico' });

// Métodos
export const updateArchivoCita = async function(id_cita, filename) {
    try {
        const [updatedRows] = await Cita.update({
            archivo: filename
        }, {
            where: { id_cita }
        });
        console.log(updatedRows);
        return updatedRows;
    } catch (error) {
        console.log("excepción...");
        console.log(error);
        throw error;
    }
};