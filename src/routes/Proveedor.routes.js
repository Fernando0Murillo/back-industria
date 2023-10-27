import { Router } from 'express';
import { verificarToken } from '../controllers/Auth.controllers.js'
import { listaProveedor } from '../controllers/Proveedor.controllers.js'


const routerProveedor = Router();

routerProveedor.get('/proveedores', verificarToken, listaProveedor);


export default routerProveedor;