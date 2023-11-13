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
        console.log(error);
        return res.status(500).json({ mensaje: 'error interno del servidor' });
    }
}

export const contarPacientes = (req, res) => {

    const cantidad = `SELECT COUNT(*) AS total_pacientes FROM pacientes`;
    try {
        db.query(cantidad, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al listar los pacientes' });
            } else {
                // Extrae la cantidad de pacientes del resultado y envía solo eso como respuesta
                const totalPacientes = results[0].total_pacientes;
                return res.json({ totalPacientes });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'error interno del servidor' });
    }
}


export const crearPaciente = (req, res) => {


    const { identidad, nombre1, nombre2, apellido1, apellido2, fNacimiento, genero, direccion, telefono, correo } = req.body;
    const query = 'Insert into pacientes (identidad, nombre1 ,nombre2 ,apellido1 ,apellido2,fNacimiento,genero,direccion,telefono, correo ) value(?,?,?,?,?,?,?,?,?,?)';

    try {
        db.query(query, [identidad, nombre1, nombre2, apellido1, apellido2, fNacimiento, genero, direccion, telefono, correo], (error, results) => {
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

export const eliminarPaciente = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM pacientes WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error en el servidor' });
        } else {
            res.status(200).json({ message: 'Paciente eliminado con éxito' });
        }
    });
};


export const actualizarPaciente = (req, res) => {

    const { id } = req.params;
    const { identidad, nombre1, nombre2, apellido1, apellido2, fNacimiento, genero, direccion, telefono, correo } = req.body;
    const query = 'UPDATE pacientes SET identidad = ?, nombre1 = ?, nombre2 = ?, apellido1 = ?, apellido2 = ?, fNacimiento = ?, genero = ?, direccion = ?, telefono = ?, correo = ? WHERE id = ?';



    db.query(query, [identidad, nombre1, nombre2, apellido1, apellido2, fNacimiento, genero, direccion, telefono, correo, id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar el paciente' });
        } else {
            res.status(200).json({ message: 'Paciente actualizado con éxito' });
        }
    });
};