import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import routes from './routes/Auth.routes.js';
import routesProveedor from './routes/Proveedor.routes.js';
import routesPaciente from "./routes/Paciente.routes.js";
import routesCita from "./routes/Cita.routes.js";
import routesProductos from "./routes/Productos.routes.js";
import routesServicios from "./routes/Servicios.routes.js";
import routesVentas from "./routes/Ventas.routes.js";
import routesServiciosVentas from "./routes/Venta_Servicio.routes.js";




const app = express();
app.listen(3000);
//Cofiguración de cors para que establesca la conexión solo en este dominio
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json())
app.use(cookieParser());
console.log('Server en el puerto ', 3000)

app.use('/', routes);
app.use('/proveedor', routesProveedor);
app.use('/paciente', routesPaciente);
app.use('/citas', routesCita);
app.use('/productos',routesProductos);
app.use('/servicios', routesServicios);
app.use('/ventas', routesVentas);
app.use('/ventas-servicios', routesServiciosVentas);


