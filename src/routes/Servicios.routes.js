import { Router } from 'express';
import { listaServicios, crearServicio, eliminarServicio, actualizarServicio } from '../controllers/Servicios.controllers.js';

const routesServicios = Router();

// Rutas para operaciones CRUD de servicios
routesServicios.get('/lista-servicios', listaServicios);
routesServicios.post('/agregar-servicio', crearServicio);
routesServicios.delete('/eliminar-servicio/:id', eliminarServicio);
routesServicios.put('/actualizar-servicio/:id', actualizarServicio);

export default routesServicios;