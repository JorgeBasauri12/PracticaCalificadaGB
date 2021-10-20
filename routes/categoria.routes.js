/*
    Categoria
    ruta: '/api/categorias'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categorias.controller')


const router = Router();

router.get( '/', getCategorias );

router.post( '/',
    [
        check('categorianombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    crearCategoria
);

router.put( '/:id',
    [
        validarJWT,
        check('categorianombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCategoria
);

router.delete( '/:id',
    eliminarCategoria
);



module.exports = router;