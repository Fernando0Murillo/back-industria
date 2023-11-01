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

export const crearProvedor = (req, res) => {
    // console.log('me leo');
    const { nombre, numeroTelefono, correo, direccion } = req.body;
    if (!nombre || !correo) {
        return res.status(400).json({ message: 'Nombre y correo son requeridos' });
    }
    const query = 'Insert into proveedor (nombre,numeroTelefono,correo,direccion) value(?,?,?,?)';

    try {
        db.query(query, [nombre, numeroTelefono, correo, direccion], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ mensaje: 'Error al agregar un proveedor' });
            } else {
                return res.status(200).json({ mensaje: 'proveedeor agregado exitosamente' });
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'error interno del servidor' });
    }
}

export const actualizarProveedor = (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, numeroTelefono, correo, direccion } = req.body;

        if (id == undefined || nombre == undefined || numeroTelefono == undefined || correo == undefined || direccion == undefined) {
            res.status(404).json({ message: "Error en la peticion" });
        }
        const proveedor = { nombre, numeroTelefono, correo, direccion };
        db.query("UPDATE proveedor SET ? WHERE id=?", [proveedor, id]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}