import { db } from "../db.js"

export const obtenerRegistrosBitacora = (req, res) => {
    const query = 'SELECT * FROM bitacora ORDER BY fecha DESC';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener registros de bitácora:', err);
            res.status(500).json({ error: 'Error al obtener registros de bitácora' });
        } else {
            res.status(200).json(result);
        }
    });
};