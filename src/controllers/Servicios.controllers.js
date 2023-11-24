import { db } from "../db.js";

// Listar todos los servicios
export const listaServicios = (req, res) => {
  const query = 'SELECT * FROM servicio';

  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al listar los servicios' });
    } else {
      return res.json(results);
    }
  });
};

// Eliminar un servicio por ID
export const eliminarServicio = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM servicio WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al eliminar el servicio' });
    } else {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró el servicio' });
      } else {
        return res.json({ message: 'Servicio eliminado exitosamente' });
      }
    }
  });
};

// Crear un nuevo servicio
export const crearServicio = (req, res) => {
  const { nombre_servicio, descripcion, precio_unitario } = req.body;

  if (!nombre_servicio) {
    return res.status(400).json({ message: 'Nombre del servicio es requerido' });
  }

  const query = 'INSERT INTO servicio (nombre_servicio, descripcion, precio_unitario) VALUES (?, ?, ?)';
  db.query(query, [nombre_servicio, descripcion, precio_unitario], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al agregar un servicio' });
    } else {
      return res.status(200).json({ message: 'Servicio agregado exitosamente' });
    }
  });
};

// Actualizar un servicio por ID
export const actualizarServicio = (req, res) => {
  const { id } = req.params;
  const { nombre_servicio, descripcion, precio_unitario } = req.body;

  if (!nombre_servicio) {
    return res.status(400).json({ message: 'Nombre del servicio es requerido' });
  }

  const query = 'UPDATE servicio SET nombre_servicio = ?, descripcion = ?, precio_unitario = ? WHERE id = ?';
  db.query(query, [nombre_servicio, descripcion, precio_unitario, id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al actualizar el servicio' });
    } else {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'No se encontró el servicio' });
      } else {
        return res.json({ message: 'Servicio actualizado exitosamente' });
      }
    }
  });
};