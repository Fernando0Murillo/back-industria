import { db } from "../db.js"


export const listarProductos = (req, res) => {
    db.query('SELECT * FROM productos', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al listar productos' });
        }
        res.status(200).json(rows);
    });
}

export const agregarProductos = (req, res) => {
    const { nombre_producto, cantidad, descripcion, precio_unitario, proveedor_id } = req.body;
    // Inserta un nuevo producto en la base de datos
    const query = 'INSERT INTO productos (nombre_producto, cantidad, descripcion, precio_unitario, proveedor_id) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nombre_producto, cantidad, descripcion, precio_unitario, proveedor_id], (err, result) => {
        console.log(err);
        if (err) {
            return res.status(500).json({ error: 'Error al agregar producto' });
        }
        res.status(201).json({ message: 'Producto agregado con éxito' });
    });
}


export const eliminarProducto = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM productos WHERE id = ?';
    // Realiza una consulta para eliminar un producto específico por su ID
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    });
}


export const contadorDeProductoMinimo = (req, res) => {
    // Obtén la cantidad mínima desde req.query o cualquier otra fuente según tus necesidades
    const cantidadMinima = 2;

    // Realiza una consulta a la base de datos para contar productos que tienen una cantidad menor o igual a cantidadMinima
    db.query('SELECT COUNT(*) AS cantidad FROM productos WHERE cantidad <= ?', [cantidadMinima], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al contar productos' });
        }

        // Si no hay productos que cumplan con la condición, rows[0].cantidad será 0.
        const cantidad = rows[0].cantidad;

        // Solo envía la respuesta si la cantidad es mayor que cero.
        if (cantidad > 0) {
            res.status(200).json({ cantidad });
        } else {
            res.status(200).json({ message: 'No hay productos con cantidad menor o igual a la cantidad mínima.' });
        }
    });
}

export const actualizarProductos = (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, cantidad, descripcion, precio_unitario, proveedor_id } = req.body;
        if (id == undefined || nombre_producto == undefined || cantidad == undefined || descripcion == undefined || precio_unitario == undefined || proveedor_id == undefined) {
            res.status(404).json({ message: "Error en la peticion" });
        }
        const producto = { nombre_producto, cantidad, descripcion, precio_unitario, proveedor_id};
        db.query("UPDATE productos SET ? where id=?", [producto, id])
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}