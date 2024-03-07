const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const listadoModel = require('../models/listadoModel'); 


/* GET home page. */
router.get('/', async function(req, res, next) {
  const listado = await listadoModel.getListado(); 
  res.render('index', { listado });
});


 



router.post('/', async (req, res, next) => {

  console.log(req.body) // estoy capturando datos? //

  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const mensaje = req.body.mensaje;

  const obj = {
    to: 'geogastono@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + " " + apellido + " se contactó con nosotros. Tiene este correo: " + email + ". <br> Envió el siguiente mensaje: " + mensaje 
  }; // cierra obj 

  const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: process.env.SMTP_PORT,
     auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS

     }
  }) // cierra transporter


  const info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado con éxito!', 
  });

});

module.exports = router;
