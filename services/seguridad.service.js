import * as modelPaciente from "../models/paciente.model.js";

export const login = async function(objPaciente) {
    console.log("------------service seguridad login------------");
    let results= await modelPaciente.login(objPaciente);
    console.log("luego del modelo");
    console.log(results);
    return results;
};

export const findById = async function(id_paciente) {
    console.log("------------service------------");
    let results= await modelPaciente.findById(id_paciente);
    return results;
};
