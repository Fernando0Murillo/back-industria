import { Router } from 'express';

import { agregarProductos, eliminarProducto, listarProductos, contadorDeProductoMinimo, actualizarProductos } from '../controllers/Productos.controller.js';

const routesProductos = Router();

routesProductos.get('/lista-productos', listarProductos)
routesProductos.post('/agregar-producto', agregarProductos)
routesProductos.delete('/eliminar-producto/:id', eliminarProducto)
routesProductos.get('/cantidades-productos', contadorDeProductoMinimo)
routesProductos.put('/actualizar-producto/:id', actualizarProductos)

export default routesProductos;