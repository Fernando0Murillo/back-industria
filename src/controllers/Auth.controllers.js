import { db } from "../db.js"
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const regitrarse = async (req, res) => {
    const { nombre, apellido, correo, contracenia } = req.body;

    // Verificar si el correo ya existe en la base de datos
    const verificarCorreo = `SELECT correo FROM usuario WHERE correo = ?`;

    const insertarUsuario = `
        INSERT INTO usuario (nombre, apellido, correo, contracenia) 
        VALUES (?, ?, ?, ?);
    `;

    const obtenerIDUsuario = `SELECT LAST_INSERT_ID() AS userID`;

    const contraceniaHash = await bcrypt.hash(contracenia, 10);

    try {
        db.query(verificarCorreo, [correo], async (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al verificar el correo' });
                return;
            }

            if (results.length > 0) {
                res.status(400).json({ message: ['El correo ya está registrado'] });
                return;
            }

            //Si el correo no existe, procede con la inserción
            db.query(insertarUsuario, [nombre, apellido, correo, contraceniaHash], async (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Error al registrar usuario' });
                    return;
                }

                db.query(obtenerIDUsuario, async (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ message: 'Error al obtener el ID del usuario' });
                        return;
                    }

                    const userID = results[0].userID;

                    const token = await createAccessToken({
                        userID
                    });

                    res.cookie("token", token, {
                        httpOnly: process.env.NODE_ENV !== "development",
                        secure: true,
                        sameSite: "none",
                    });

                    res.status(201).json({
                        userID,
                        nombre,
                        apellido,
                        correo
                    });
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



export const login = (req, res) => {

    const { correo, contracenia } = req.body

    const verificarUsuario = 'SELECT * FROM usuario WHERE correo = ?';

    try {
        db.query(verificarUsuario, [correo], async (error, results) => {

            if (error) { return res.send(error) }

            if (results.length > 0) {

                const contraceniaHash = await bcrypt.compare(contracenia, results[0].contracenia);

                if (!contraceniaHash) {
                    return res.status(400).json({ contracenia: 'La contraceña es incorrecta' })
                }

                const token = await createAccessToken({
                    id: results[0].id,
                    nombre: results[0].nombre,
                    apellido: results[0].apellido
                });

                res.cookie("token", token, {
                    // httpOnly: process.env.NODE_ENV !== "development",
                    secure: true,
                    sameSite: "none",
                });

                res.status(201).json({
                    id: results[0].id,
                    nombre: results[0].nombre,
                    apellido: results[0].apellido,
                    correo: results[0].correo
                });

            } else {
                return res.status(400).json({ email: 'El usuario no existe' })
            }

        });

    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }

}

export const salir = async (req, res) => {
    res.cookie("token", "", {
        // httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

export const home = () => {
    const { id } = req.body

    const verificarUsuario = 'SELECT * FROM usuario WHERE id = ?';

    try {
        db.query(verificarUsuario, [id], async (error, results) => {

            if (error) { res.send(error) }

            if (results.length > 0) {

                res.status(201).json({
                    nombre: results[0].nombre,
                    apellido: results[0].apellido,
                    correo: results[0].correo
                });

            } else {
                res.send({ message: 'El usuario no existe' })
            }

        });

    } catch (error) {

    }
}

export const verificarToken = (req, res) => {
    const { token } = req.cookies;
    // return res.status(400).json({ token});
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    jwt.verify(token, TOKEN_SECRET, async (err, usuario) => {

        const buscarUsuario = 'SELECT * FROM usuario WHERE id = ?';

        db.query(buscarUsuario, [usuario.id], async (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error al buscar el usuario' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'No autorizado' });
            }

            const usuarioEncontrado = results[0];

            return res.json({
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                correo: usuarioEncontrado.correo
            });
        });

    });
}
