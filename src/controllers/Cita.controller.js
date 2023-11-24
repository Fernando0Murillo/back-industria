import { db } from "../db.js";


export const listaCitas = (req, res) => {
    const cita = `SELECT * FROM citas`;

    try {
        db.query(cita, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al listar las citas' });
            } else {
                return res.json(results)
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'error interno del servidor' });
    }

}

export const listarCitasCercanas = (req, res) => {
    const fechaActual = new Date().toISOString();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 7);
    const fechaLimiteISO = fechaLimite.toISOString();

    const consultaCitas = `SELECT * FROM citas WHERE fecha_reservacion BETWEEN ? AND ? ORDER BY ABS(DATEDIFF(fecha_reservacion, ?)) LIMIT 5`;

    try {
        db.query(consultaCitas, [fechaActual, fechaLimiteISO, fechaActual], (error, resultados) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ mensaje: 'Error al listar las citas cercanas' });
            } else {
                return res.json(resultados);
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

export const agendarCita = (req, res) => {
    const { fechaReservacion, pacienteId, descripcion } = req.body;

    if (!fechaReservacion || !pacienteId || !descripcion) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    const query = `
    INSERT INTO citas (fecha_reservacion, paciente_id, descripcion)
    VALUES (?, ?, ?);
    `;

    db.query(query, [fechaReservacion, pacienteId, descripcion], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al agendar una cita', error });
        } else {
            return res.status(201).json({ mensaje: 'Cita agregada exitosamente', citaId: results.insertId });
        }
    });
};

export const actualizarEstadoCita = (req, res) => {
    const { id } = req.params;
    const { nuevoEstado } = req.body;
    console.log("Datos recibidos en el servidor:", id, nuevoEstado);
    // Verifica que el nuevo estado sea válido (pendiente, procesada, cancelada)
    if (!["pendiente", "procesada", "cancelada"].includes(nuevoEstado)) {
        return res.status(400).json({ mensaje: "Estado de cita no válido" });
    }

    const query = `
        UPDATE citas
        SET estado_cita = ?
        WHERE id = ?;
    `;

    try {
        db.query(query, [nuevoEstado, id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ mensaje: "Error al actualizar el estado de la cita" });
            } else {
                return res.status(200).json({ mensaje: "Estado de cita actualizado exitosamente" });
            }
        });
    } catch (error) {
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};