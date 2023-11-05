import { Router } from 'express';
import { login, regitrarse, salir, home, verificarToken } from '../controllers/Auth.controllers.js'

import { eliminarProveedor, listaProveedor, crearProvedor, actualizarProveedor } from '../controllers/Proveedor.controllers.js';
import { listaPaciente } from '../controllers/Paciente.controllers.js';


const router = Router()

router.post('/login', login)

router.post('/registro', regitrarse)

router.get('/verificar-token', verificarToken)

router.post('/salir', salir);

router.get('/home', verificarToken, home)

// Rutas para proveedor
router.get('/proveedor', listaProveedor)
router.delete('/eliminar-proveedor/:id', eliminarProveedor)
router.post('/agregar-proveedor', crearProvedor)
router.put('/actualizar-proveedor/:id', actualizarProveedor)



// Rutas para pasiente
router.get('/paciente', listaPaciente)
export default router;