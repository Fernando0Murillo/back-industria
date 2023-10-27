import { db } from "../db.js"


export const listaProveedor = (req, res) => {

    const lista = 'SELECT * FROM proveedor'

    try {
        db.query(lista, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al listar los proveedore' });
            } else {
                return res.json(results)
            }
        })
    } catch (error) {

    }
}


export const eliminarProveedor = (req, res) => {
    const { id } = req.params;
    const lista = `DELETE FROM proveedor WHERE id = ?`

    try {
        db.query(lista, [id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al eliminar los proveedore' });
                return;
            } else {
                if (results.affectedRows === 0) {
                    return res.status(404).json({ mensaje: 'No se encontró el proveedor' });
                } else {
                    return res.json({ mensaje: 'Proveedor eliminado exitosamente' });
                }
            }
        })
    } catch (error) {

    }
}

