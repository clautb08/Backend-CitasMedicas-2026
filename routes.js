import _express from "express";
import rcita from "./routes/cita.routes.js";
import rpaciente from "./routes/paciente.routes.js";
import rseguridad from "./routes/seguridad.routes.js";
import rfile from "./routes/file.routes.js";
const router= _express.Router();

//... secciones ...
router.use('/cita', rcita);
router.use('/paciente', rpaciente);
router.use('/seguridad', rseguridad);
router.use('/archivos', rfile);
//router.use('/catalogo', rcatalogo);

export default router;