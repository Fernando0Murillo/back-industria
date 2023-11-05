import { db } from "../db.js"


export const listaPaciente = (req, res) => {

    const lista = `
    SELECT
        id,
        identidad,
        CONCAT_WS(
            ' ',
            nombre1,
            nombre2,
            apellido1,
            apellido2
        ) AS NombreCompleto,
        genero,
        fNacimiento,
        direccion,
        telefono,
        correo
    FROM pacientes
    `;

    try {
        db.query(lista, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al listar los pacientes' });
            } else {
                return res.json(results)
            }
        })
    } catch (error) {

    }
}


export const crearPaciente = (req, res) => {


    const { identidad,nombre1,nombre2,apellido1,apellido2,fNacimiento,genero,direccion,telefono, correo } = req.body; 
    const query = 'Insert into pacientes (identidad, nombre1 ,nombre2 ,apellido1 ,apellido2,fNacimiento,genero,direccion,telefono, correo ) value(?,?,?,?,?,?,?,?,?,?)';

    try {
        db.query(query,[identidad,nombre1,nombre2,apellido1,apellido2,fNacimiento,genero,direccion,telefono, correo], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ mensaje: 'Error al agregar un paciente' });
            } else {
                return res.status(200).json({ mensaje: 'paciente agregado exitosamente' });
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'error interno del servidor' });
    }
}
