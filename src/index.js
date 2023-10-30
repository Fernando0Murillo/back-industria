import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import routes from './routes/Auth.routes.js';
import proveedor from './routes/Proveedor.routes.js';


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
app.use('/proveedor', proveedor);


