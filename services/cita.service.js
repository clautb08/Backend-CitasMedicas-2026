import { Cita } from "../models/cita.model.js";
import { Paciente } from "../models/paciente.model.js";
import { Medico } from "../models/medico.model.js";

export const getAll = async function() {
    return await Cita.findAll({ include: [Paciente, Medico] });
};

export const getById = async function(idCita) {
    return await Cita.findByPk(idCita, { include: [Paciente, Medico] });
};

export const create = async function(objCita, id_paciente) {
    const cita = await Cita.create({ ...objCita, id_paciente });
    return cita.id_cita;
};

export const update = async function(id_cita, objCita) {
    const [updatedRows] = await Cita.update(objCita, { where: { id_cita } });
    return updatedRows;
};

export const deletes = async function(id_cita) {
    return await Cita.destroy({ where: { id_cita } });
};

export const getReporte = async function(preciobase) {
    return await Cita.findAll({ include: [Paciente, Medico] });
};
