import _express from "express";
import * as ccita from "../controllers/cita.controller.js";
import * as mauth from "../middleware/auth.middleware.js";
const router = _express.Router();

router.get('/', ccita.getAll);
router.get('/:id', ccita.getById);
router.post('/', mauth.authMiddleware(), ccita.create);
router.put('/:id', mauth.authMiddleware(["admin"]), ccita.update);
router.patch('/:id', mauth.authMiddleware(), ccita.update);
router.delete('/:id', mauth.authMiddleware(), ccita.deletes);
router.post('/reporte', ccita.getReporte);

export default router;
