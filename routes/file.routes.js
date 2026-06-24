import _express from "express";
import * as cfile from "../controllers/file.controller.js"
const router= _express.Router();

router.post('/upload', cfile.upload);
//router.post('/uploadmem', cfile, uploadmemo);
//router.post('/copiar', cfile.copiar);
router.post('/uploadXIDCita', cfile.uploadCita);

export default router;