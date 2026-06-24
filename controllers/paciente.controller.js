import * as spaciente from "../services/paciente.service.js";

export const getAll = async function(req, res) {
    try {
        const pacientes = await spaciente.getAll();
        res.json(pacientes || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo pacientes" });
    }
};

export const getById = async function(req, res) {
    try {
        const paciente = await spaciente.getById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }
        res.json(paciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo paciente" });
    }
};

export const create = async function(req, res) {
    try {
        const objPaciente = req.body;
        const paciente = await spaciente.create(objPaciente);
        res.status(201).json(paciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creando paciente" });
    }
};

export const update = async function(req, res) {
    try {
        const objPaciente = req.body;
        const numRegistros = await spaciente.update(req.params.id, objPaciente);
        res.json({ numRegistros });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error actualizando paciente" });
    }
};

export const deletes = async function(req, res) {
    try {
        const numRegistros = await spaciente.deletes(req.params.id);
        res.json({ numRegistros });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error eliminando paciente" });
    }
};
