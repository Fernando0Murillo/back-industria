import { Router } from 'express';
import {login, regitrarse, salir, home,verificarToken} from '../controllers/Auth.controllers.js'
// import { verificarToken } from '../middlewares/Auth.middlewares.js';

const router = Router()

router.post('/login',login)

router.post('/registro',regitrarse)

router.get('/verificar-token',verificarToken)

router.post('/salir',salir);

router.get('/home',verificarToken,home)

export default router;