import { Router } from 'express';
import { verificarToken } from '../controllers/Auth.controllers.js'
import { listaProveedor, eliminarProveedor, crearProvedor } from '../controllers/Proveedor.controllers.js'


const routesProveedor = Router();

routesProveedor.get('/lista-proveedores', listaProveedor)
routesProveedor.delete('/eliminar-proveedor/:id', eliminarProveedor)

routesProveedor.post('/agregar-proveedor', crearProvedor);


export default routesProveedor;