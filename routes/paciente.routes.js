import _express from "express";
import * as cpaciente from "../controllers/paciente.controller.js";
import * as mauth from "../middleware/auth.middleware.js";
const router = _express.Router();

router.get('/', mauth.authMiddleware(["admin"]), cpaciente.getAll);
router.get('/:id', mauth.authMiddleware(), cpaciente.getById);
router.post('/', cpaciente.create);
router.put('/:id', mauth.authMiddleware(["admin"]), cpaciente.update);
router.delete('/:id', mauth.authMiddleware(["admin"]), cpaciente.deletes);

export default router;
