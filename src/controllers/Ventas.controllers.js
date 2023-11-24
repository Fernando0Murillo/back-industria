import { db } from "../db.js";

// Listar todas las ventas
export const listaVentas = (req, res) => {
  const query = 'SELECT * FROM registro_ventas';

  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al listar las ventas' });
    } else {
      return res.json(results);
    }
  });
};

// Eliminar una venta por ID
export const eliminarVenta = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM registro_ventas WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al eliminar la venta' });
    } else {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró la venta' });
      } else {
        return res.json({ message: 'Venta eliminada exitosamente' });
      }
    }
  });
};

// Crear una nueva venta
export const crearVenta = (req, res) => {
  const { cita_id, paciente_id, servicio, costo, detalles_venta } = req.body;

  if (!cita_id || !paciente_id || !servicio || !costo) {
    return res.status(400).json({ message: 'Falta información requerida para la venta' });
  }

  const query = 'INSERT INTO registro_ventas (cita_id, paciente_id, servicio, costo, detalles_venta) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [cita_id, paciente_id, servicio, costo, detalles_venta], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al agregar una venta' });
    } else {
      return res.status(200).json({ message: 'Venta agregada exitosamente' });
    }
  });
};

// Actualizar una venta por ID
export const actualizarVenta = (req, res) => {
  const { id } = req.params;
  const { cita_id, paciente_id, servicio, costo, detalles_venta } = req.body;

  if (!cita_id || !paciente_id || !servicio || !costo) {
    return res.status(400).json({ message: 'Falta información requerida para la venta' });
  }

  const query = 'UPDATE registro_ventas SET cita_id = ?, paciente_id = ?, servicio = ?, costo = ?, detalles_venta = ? WHERE id = ?';
  db.query(query, [cita_id, paciente_id, servicio, costo, detalles_venta, id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al actualizar la venta' });
    } else {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró la venta' });
      } else {
        return res.json({ message: 'Venta actualizada exitosamente' });
      }
    }
  });
};
