const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const listadoModel = require('../models/listadoModel'); 
const cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next) {
  var listado = await listadoModel.getListado();

    
    listado = listado.map(novedad => {
        if (novedad.img_id) {
            var imagen = cloudinary.image(novedad.img_id, {
                width: 400,
                height: 400,
                crop: 'fill'
            });
            return {
                ...novedad,
                imagen
            }
        } else {
            return {
                ...novedad,
                imagen:  '<img src="/images/noimage.jpg" style="max-width: 200px; max-height: 200px;">' 
            }
        }
    });
    listado = listado.slice(0,5); //selecciona los primeros 5 elementos del array
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
