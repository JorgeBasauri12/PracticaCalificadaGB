/*
    ruta: '/api/productos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProductos, 
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/producto.controller')


const router = Router();

router.get( '/', getProductos );

router.post( '/',
    [
        check('productonombre','El nombre del producto es necesario').not().isEmpty(),
        check('preciounitario','El precio del producto es necesario').not().isEmpty(),
        check('categoria','El id de categoria debe de ser válido').isMongoId(),
        check('proveedor','El id del proveedor debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearProducto 
);

router.put( '/:id',
    [
        validarJWT,
        check('productonombre','El nombre del producto es necesario').not().isEmpty(),
        check('preciounitario','El precio del producto es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarProducto
);

router.delete( '/:id',
    eliminarProducto
);



module.exports = router;