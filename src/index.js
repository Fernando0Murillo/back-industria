import express from "express";
import routes from './routes/Auth.routes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();
app.listen(3000);
//Cofiguración de cors para que establesca la conexión solo en este dominio
app.use(cors(
    {
        // origin: 'http://localhost:5173',
        origin: 'https://6535f768062e1b7120119fe5--candid-empanada-23da7c.netlify.app',
        credentials: true
    }
));
app.use(express.json())
app.use(cookieParser());
console.log('Server en el puerto ', 3000)

app.use('/', routes);