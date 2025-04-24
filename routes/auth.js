import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/users.js';  // Adjust the path if needed

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) return res.status(400).json({ mensaje: 'El usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    usuario = new Usuario({ nombre, email, contraseña: contraseñaHash });
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

    const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esCorrecta) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

export default router;
