import { Paciente } from "../models/paciente.model.js";

export const getAll = async function() {
    return await Paciente.findAll();
};

export const getById = async function(idPaciente) {
    return await Paciente.findByPk(idPaciente);
};

export const create = async function(objPaciente) {
    return await Paciente.create(objPaciente);
};

export const update = async function(idPaciente, objPaciente) {
    const [updatedRows] = await Paciente.update(objPaciente, { where: { id_paciente: idPaciente } });
    return updatedRows;
};

export const deletes = async function(idPaciente) {
    return await Paciente.destroy({ where: { id_paciente: idPaciente } });
};
