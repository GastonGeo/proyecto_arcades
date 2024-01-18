const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Arcade House' });
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
