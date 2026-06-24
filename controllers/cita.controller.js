import * as scita from "../services/cita.service.js";

export const getAll = async function(req, res) {
    try {
        const citas = await scita.getAll();
        res.json(citas || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo citas" });
    }
};

export const getById = async function(req, res) {
    try {
        const cita = await scita.getById(req.params.id);
        if (!cita) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        res.json(cita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo cita" });
    }
};

export const create = async function(req, res) {
    try {
        const objCita = req.body;
        const idCita = await scita.create(objCita, req.user?.id_paciente);
        res.json({ id_cita: idCita });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creando cita" });
    }
};

export const update = async function(req, res) {
    try {
        const objCita = req.body;
        const numRegistros = await scita.update(req.params.id, objCita);
        res.json({ numRegistros });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error actualizando cita" });
    }
};

export const deletes = async function(req, res) {
    try {
        const numRegistros = await scita.deletes(req.params.id);
        res.json({ numRegistros });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error eliminando cita" });
    }
};

export const getReporte = async function(req, res) {
    try {
        const reporte = await scita.getReporte(req.body.preciobase);
        res.json(reporte || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo reporte de citas" });
    }
};
