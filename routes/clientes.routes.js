/*
    ruta: '/api/clientes'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getClientes, 
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/clientes.controller')


const router = Router();

router.get( '/', getClientes );

router.post( '/',
    [
        check('clientenombre','El nombre del cliente es necesario').not().isEmpty(),
        check('telefono','El telefono del cliente es necesario').not().isEmpty(),
        check('usuario','El id de categoria debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearCliente 
);

router.put( '/:id',
    [
        validarJWT,
        check('clientenombre','El nombre del cliente es necesario').not().isEmpty(),
        check('telefono','El telefono del cliente es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarCliente
);

router.delete( '/:id',
    eliminarCliente
);



module.exports = router;