import { db } from "../db.js";

// Agregar un servicio a una venta específica
export const agregarServicioAVenta = (req, res) => {
  const { venta_id, servicio_id } = req.body;

  if (!venta_id || !servicio_id) {
    return res.status(400).json({ message: 'Falta información requerida para agregar servicio a la venta' });
  }

  const query = 'INSERT INTO venta_servicio (venta_id, servicio_id) VALUES (?, ?)';
  db.query(query, [venta_id, servicio_id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al agregar servicio a la venta' });
    } else {
      return res.status(200).json({ message: 'Servicio agregado a la venta exitosamente' });
    }
  });
};

// Eliminar un servicio de una venta específica
export const eliminarServicioDeVenta = (req, res) => {
  const { venta_id, servicio_id } = req.body;

  if (!venta_id || !servicio_id) {
    return res.status(400).json({ message: 'Falta información requerida para eliminar servicio de la venta' });
  }

  const query = 'DELETE FROM venta_servicio WHERE venta_id = ? AND servicio_id = ?';
  db.query(query, [venta_id, servicio_id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al eliminar servicio de la venta' });
    } else {
      return res.status(200).json({ message: 'Servicio eliminado de la venta exitosamente' });
    }
  });
};

// Obtener los servicios asociados a una venta específica
export const obtenerServiciosDeVenta = (req, res) => {
  const { venta_id } = req.params;

  if (!venta_id) {
    return res.status(400).json({ message: 'Falta el ID de la venta para obtener servicios asociados' });
  }

  const query = 'SELECT * FROM servicio WHERE id IN (SELECT servicio_id FROM venta_servicio WHERE venta_id = ?)';
  db.query(query, [venta_id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener servicios de la venta' });
    } else {
      return res.status(200).json(results);
    }
  });
};
