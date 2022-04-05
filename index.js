import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

// Creación de aplicación de Express
const app = express();

// Le decimos a Express que vamos a trabajar con formatos JSON
app.use(express.json());              

// "Permitimos" que Express pueda leer las variables de entorno definidas
dotenv.config();

// Conexión a MongoDB Atlas
conectarDB();
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request está permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));  
        }
    }
}

app.use(cors(corsOptions));

// Redireccionamiento
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor local corriendo en el puerto ${PORT}`);
});