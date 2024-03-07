const express = require('express');
const router = express.Router();
const listadoModel = require('./../../models/listadoModel');



router.get('/', async function (req, res, next) {
    const listado = await listadoModel.getListado();
    res.render('admin/listado', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        listado
    });
});


router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await listadoModel.deleteNovedadById(id);
    res.redirect('/admin/listado')
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await listadoModel.insertNovedad(req.body);
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
        const obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
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


module.exports = router;