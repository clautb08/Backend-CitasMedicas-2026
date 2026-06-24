import _multer from "multer";
import * as modelCita from "../models/cita.model.js";

const storage = _multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const extension = file.originalname.substring(file.originalname.lastIndexOf(".")) || "";
    cb(null, `${Date.now()}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  //const allowedTypes = ['application/pdf'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Error: Tipo de archivo invalido"), false);
  }
};

export const upload = function(req, res) {
    console.log("------------multer------------");
    const uploadFile = _multer({ storage:storage, fileFilter: fileFilter, 
        limits:{fileSize:5*1024*1024}
     });
    uploadFile.single('archivo')(req, res, (err) => {
        if (!err) {
            console.log(req.file);
            if (!req.file) {
                return res.status(400).json({ error: 'No se encontro archivo a cargar'});
            }
            res.json({ mensaje: 'Archivo cargado', file: req.file.filename });

        } else {
            console.log("Error de carga de archivo");
            console.log(err);
            if (err instanceof _multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'Archivo demasiado pesado' });
                }
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
    });
};

export const uploadCita = async function(req, res) {
    console.log("------------multer------------");
    const uploadFile = _multer({ storage:storage, fileFilter:fileFilter, 
        limits:{fileSize:5*1024*1024}
    });
    uploadFile.single('archivo')(req, res, async (err) => {
        if (!err) {
            console.log(req.file);
            console.log(req.body.id_cita);
            if (!req.file) {
                return res.status(400).json({ error: 'No se encontró archivo a cargar'});
            }

            if ((await modelCita.updateArchivoCita(req.body.id_cita, req.file.filename)) > 0) {
                res.json({ mensaje: 'Archivo cargado', file: req.file.filename });
            } else {
                return res.status(500).json({ error: 'Error actualizando archivo'});
            }

        } else {
            console.log("Error de carga de archivo");
            console.log(err);
            if (err instanceof _multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'Archivo demasiado pesado' });
                }
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
    });
};