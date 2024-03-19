const express = require('express');
const router = express.Router();
const listadoModel = require('./../../models/listadoModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



router.get('/', async function (req, res, next) {

    var listado = await listadoModel.getListado();

    listado = listado.map(novedad => {
        if (novedad.img_id) {
            var imagen = cloudinary.image(novedad.img_id, {
                width: 40,
                height: 40,
                crop: 'fill'
            });
            return {
                ...novedad,
                imagen
            }
        } else {
            return {
                ...novedad,
                imagen: ''
            }
        }
    });

    res.render('admin/listado', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        listado
    });
});


router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;

    let novedad = await listadoModel.getNovedadById(id);
    if (novedad.img_id) {
        await (destroy(novedad.img_id));
    }

    await listadoModel.deleteNovedadById(id);
    res.redirect('/admin/listado')
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});


// agregar  

router.post('/agregar', async (req, res, next) => {
    try {

        var img_id = '';

        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }




        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await listadoModel.insertNovedad({
                ...req.body,
                img_id
            });
            res.redirect('/admin/listado')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })

        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la novedad'
        })
    }
})

// Modificar 

router.get('/modificar/:id', async (req, res, next) => {
    const id = req.params.id;
    const novedad = await listadoModel.getNovedadById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});


router.post('/modificar', async (req, res, next) => {
    try {
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }
        const obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            img_id
        }


        console.log(obj)
        await listadoModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/listado')
    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la novedad'
        })
    }
})

router.get('/eliminar/:id', async (req, res, next)  => {
    var id = req.params.id;

    let novedad = await listadoModel.getNovedadById(id);
    if (novedad.img_id) {
        await (destroy(novedad.img_id));
    }

    await listadoModel.deletelistadoById(id);
    res.redirect('/admin/listado')
} );



module.exports = router;