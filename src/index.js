import express from "express";
import routes from './routes/Auth.routes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

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
console.log('Server en el puerto ',3000)

app.use('/', routes);