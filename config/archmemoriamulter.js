import _multer from "multer";

const storage = _multer.memoryStorage();

function getExtension(filename) {
    return filename.substring(filename.lastIndexOf('.'));
}

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Error: Tipo de archivo invalido'), false);
    }
};

export const uploadMemoria = function(req, res) {
    console.log("------------multer memoria------------");
    const uploadFile = _multer({ storage:storage, fileFilter:fileFilter, 
        limits:{fileSize:5*1024*1024}
    });
    uploadFile.single('archivo')(req, res, (err) => {
        if (!err) {
            if (!req.file) {
                return res.status(400).json({ error: 'No se encontró archivo a cargar'});
            }

            // Aquí solo mostramos información del archivo en memoria
            console.log("Nombre:", req.file.originalname);
            console.log("Tipo:", req.file.mimetype);
            console.log("Buffer size:", req.file.buffer.length);

            res.json({ 
                mensaje: 'Archivo cargado en memoria', 
                file: req.file.originalname, 
                extension: getExtension(req.file.originalname) 
            });

        } else {
            console.log("Error de carga de archivo");
            console.log(err);
            if (err instanceof _multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'Archivo demasiado pesado' });
                }
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Error de servidor' });
        }
    });
};