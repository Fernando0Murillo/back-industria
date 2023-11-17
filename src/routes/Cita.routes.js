import { Router } from 'express';
import { agendarCita, listaCitas, actualizarEstadoCita,listarCitasCercanas} from '../controllers/Cita.controller.js';

const routesCita = Router();

routesCita.post('/agendar-cita', agendarCita);
routesCita.get('/lista-cita', listaCitas);
routesCita.put('/actualizar-estado-cita/:id', actualizarEstadoCita);
routesCita.get('/listar-citas-cercanas', listarCitasCercanas);


export default routesCita;