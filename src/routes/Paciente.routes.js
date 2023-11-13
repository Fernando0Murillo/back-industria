import { Router } from 'express';
import { verificarToken } from '../controllers/Auth.controllers.js'
import { listaPaciente, crearPaciente,contarPacientes,eliminarPaciente,actualizarPaciente } from '../controllers/Paciente.controllers.js';


const routesPaciente = Router();

routesPaciente.get('/lista-pacientes', listaPaciente)
routesPaciente.post('/agregar-paciente',crearPaciente)
routesPaciente.get('/cantidad-pacientes',contarPacientes)
routesPaciente.delete('/eliminar-paciente/:id',eliminarPaciente)
routesPaciente.put('/actualizar-paciente/:id', actualizarPaciente);

export default routesPaciente;