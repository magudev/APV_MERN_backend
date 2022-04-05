import express from 'express';
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword } from '../controllers/veterinarioController.js';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// RUTAS RELACIONADAS A VETERINARIO

// Rutas 'públicas' (no necesitas estar autenticado para acceder a ellas)
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);

router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);
// router.route('/olvide-passwork/:token').get(comprobarToken).post(nuevoPassword);

// Área privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);


export default router;