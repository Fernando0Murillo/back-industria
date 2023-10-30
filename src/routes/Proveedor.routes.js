import { Router } from 'express';
import { verificarToken } from '../controllers/Auth.controllers.js'
import { listaProveedor, eliminarProveedor, crearProvedor } from '../controllers/Proveedor.controllers.js'


const proveedor = Router();

proveedor.get('/lista-proveedores', listaProveedor)
proveedor.delete('/eliminar-proveedor/:id', eliminarProveedor)

proveedor.post('/agregar-proveedor', crearProvedor);


export default proveedor;