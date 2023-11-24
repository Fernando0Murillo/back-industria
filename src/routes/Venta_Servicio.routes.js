import { Router } from 'express';
import { agregarServicioAVenta, eliminarServicioDeVenta, obtenerServiciosDeVenta } from '../controllers/Venta_Servicio.controllers.js';

const routesServiciosVentas = Router();

// Rutas para operaciones de servicios asociados a ventas
routesServiciosVentas.post('/agregar-servicio-a-venta', agregarServicioAVenta);
routesServiciosVentas.delete('/eliminar-servicio-de-venta', eliminarServicioDeVenta);
routesServiciosVentas.get('/servicios-de-venta/:id', obtenerServiciosDeVenta);

export default routesServiciosVentas;
