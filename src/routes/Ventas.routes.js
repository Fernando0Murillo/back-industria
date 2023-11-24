import { Router } from 'express';
import { listaVentas, crearVenta, eliminarVenta, actualizarVenta } from '../controllers/Ventas.controllers.js';

const routesVentas = Router();

// Rutas para operaciones CRUD de ventas
routesVentas.get('/lista-ventas', listaVentas);
routesVentas.post('/agregar-venta', crearVenta);
routesVentas.delete('/eliminar-venta/:id', eliminarVenta);
routesVentas.put('/actualizar-venta/:id', actualizarVenta);

export default routesVentas;
