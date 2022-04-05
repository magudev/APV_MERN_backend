import Paciente from '../models/Paciente.js';
import mongoose from 'mongoose';

// AGREGA UN NUEVO PACIENTE
const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);   
    }

}

// OBTIENE TODOS LOS PACIENTES DE UN VETERINARIO
const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.json(pacientes);
    
}

// OBTENER UN PACIENTE
const obtenerPaciente =  async (req, res) => {
   
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    
    if (!paciente) {
        return res.status(404).json({ msg: 'No encontrado'});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Acción no válida, pillín '});
    }

    res.json(paciente);

}

// ACTUALIZAR UN PACIENTE
const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    
    if (!paciente) {
        return res.status(404).json({ msg: 'No encontrado'});
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Acción no válida, pillín'});
    }

    // Actualiza paciente (únicamente los campos que se envíen)
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);    
    } catch (error) {
        console.log(error);
    }

}

// ELIMINAR UN PACIENTE
const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Id no válido');
        return res.status(403).json({ msg: error.message });
    }
 
    const paciente = await Paciente.findById(id);
 
    if (!paciente) {
        const error = new Error('Paciente no encontrado');
        return res.status(404).json({ msg: error.message });
    }
 
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({ msg: error.message });
    }
 
    try {
        await paciente.deleteOne();
        res.json({ msg: 'Paciente eliminado' });
 
    } catch (error) {
        console.log(error);
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente, 
    actualizarPaciente,
    eliminarPaciente
}