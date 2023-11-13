import { Router } from 'express';
import { agendarCita, listaCitas, actualizarEstadoCita} from '../controllers/Cita.controller.js';

const routesCita = Router();

routesCita.post('/agendar-cita', agendarCita);
routesCita.get('/lista-cita', listaCitas);
routesCita.put('/actualizar-estado-cita/:id', actualizarEstadoCita);

export default routesCita;