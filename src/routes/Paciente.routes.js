import { Router } from 'express';
import { verificarToken } from '../controllers/Auth.controllers.js'
import { listaPaciente, crearPaciente  } from '../controllers/Paciente.controllers.js';


const routesPaciente = Router();

routesPaciente.get('/lista-pacientes', listaPaciente)
routesPaciente.post('/agregar-paciente',crearPaciente)


export default routesPaciente;