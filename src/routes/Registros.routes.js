import { Router } from 'express';
import { obtenerRegistrosBitacora } from '../controllers/Registros.controllers';


const routesRegistro = Router();

routesRegistro.get('/bitacora', obtenerRegistrosBitacora);


export default routesRegistro;