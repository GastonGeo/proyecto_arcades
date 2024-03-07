const express = require('express');
const router = express.Router();
const listadoModel = require('./../../models/listadoModel');



router.get('/', async function (req, res, next) {
    const listado = await listadoModel.getListado();
    res.render('admin/listado', {
        layout: '/admin/layout',
        usuario: req.session.nombre,
        listado
    });
});


router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await listadoModel.deleteNovedadById(id);
    res.redirect('/admin/listado')
});

module.exports = router;