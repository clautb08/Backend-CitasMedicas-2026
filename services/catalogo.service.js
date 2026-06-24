//revisado falta modificar preciobase

import * as modelCita from "../models/cita.model.js";

export const getAll = async function() {
    console.log("------------service------------");
    const results= await modelCita.getAll();
    return results;
};

export const getById = async function(idCita) {
    console.log("------------service------------");
    //await modelCita.connect();
    const results= await modelCita.getById(idCita);
    console.log("luego del modelCita");
    return results;
};

export const create = async function(objCita, id_paciente) {
    const idCita= await modelCita.create(objCita, id_paciente); 
    return idCita;
};

export const update = async function(id_cita, objCita) {
    const results= await modelCita.update(id_cita, objCita);
    return results;
};

export const deletes = async function(id_cita) {
    const results= await modelCita.deletes(id_cita);
    return results;
};

export const getReporte = async function(preciobase) {
    const results= await modelCita.getReporte(preciobase);
    return results;
};

