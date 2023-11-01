import { Router } from 'express';
import { verificarToken } from '../controllers/Auth.controllers.js'
import { listaProveedor, eliminarProveedor, crearProvedor, actualizarProveedor } from '../controllers/Proveedor.controllers.js'


const routesProveedor = Router();

routesProveedor.get('/lista-proveedores', listaProveedor)
routesProveedor.delete('/eliminar-proveedor/:id', eliminarProveedor)
routesProveedor.post('/agregar-proveedor', crearProvedor)
routesProveedor.put('/actualizar-Proveedor/:id', actualizarProveedor)


export default routesProveedor;