import * as sseguridad from "../services/seguridad.service.js"; // Corregido el nombre del archivo de servicios según tu estructura
import * as auth from "../config/auth.js";

export const login = function(req, res) {
    console.log("------------controller------------");
    const reqUsuario = req.body;
    console.log(reqUsuario);
    
    sseguridad.login(reqUsuario)
    .then(usuarios => {
        // Validamos si Sequelize encontró un paciente con ese email
        if (usuarios[0]) {
            
            // Generamos los tokens JWT firmando los datos reales devueltos por la BD
            let token = auth.generateToken(usuarios[0]);
            let refreshToken = auth.generateRefreshToken(usuarios[0]);
            
            console.log("token: " + token);
            console.log("refreshToken: " + refreshToken);
            
            // Enviamos la respuesta estructurada con los campos reales de tu tabla paciente
            res.json({ 
                token, 
                refreshToken, 
                "user": {
                    "id_paciente": usuarios[0].id_paciente, 
                    "email": usuarios[0].email, 
                    "tipo_documento": usuarios[0].tipo_documento,
                    "nro_documento": usuarios[0].nro_documento,
                    "nombres": usuarios[0].nombres,
                    "apellidos": usuarios[0].apellidos
                } 
            });
        } else {
            // Si el correo no existe en la BD, denegamos el acceso
            res.status(403).json({ "error": "Acceso no autorizado: El correo electrónico no existe." });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ "error": "Error obteniendo registros" });
    });
};


export const refreshToken = function(req, res) {
    console.log("------------controller------------");
    const { refreshToken } = req.body;
    console.log(refreshToken);

    if (!refreshToken) {
        return res.status(401).json({ "error": "Refresh token requerido" });
    }

    try {
        // Verificamos y decodificamos el refresh token recibido
        const decoded = auth.verifyRefreshToken(refreshToken);
        console.log(decoded);
    
        // Buscamos al paciente por su ID guardado en el token
        sseguridad.findById(decoded.id_paciente)
        .then(usuarios => {
            if (usuarios[0]) {
                // Generamos un nuevo token de acceso válido
                let token = auth.generateToken(usuarios[0]);
                console.log("token: " + token);
                
                res.json({ 
                    token, 
                    "user": {
                        "id_paciente": usuarios[0].id_paciente, 
                        "email": usuarios[0].email, 
                        "tipo_documento": usuarios[0].tipo_documento,
                        "nro_documento": usuarios[0].nro_documento
                    } 
                });
            } else {
                res.status(403).json({ "error": "Acceso no autorizado" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "error": "Error obteniendo registros" });
        });
        
    } catch (error) {
        console.log('excepcion...');
        // Manejo de errores específicos si el token expiró o es inválido
        res.status(error.name == 'TokenExpiredError' ? 401 : 403).json({ error: error.message });
    }
};