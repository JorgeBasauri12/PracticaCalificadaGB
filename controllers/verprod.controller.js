const { response } = require("express");
const bcrypt = require('bcryptjs');
const Producto = require ('../models/ProductoModel');
const { generarJWT } =  require('../helpers/jwt')
const loginprod = async(req, res= response)=> {
    const {productonombre, proveedor} = req.body;
    try {        
        // Verificar al proveedor por su email
        const productoDB = await Producto.findOne({ productonombre });
        if ( !productoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
                //considerar la utilizacion de este mensaje
            });
        }
        // Verificar contraseña
        //const validPassword = bcrypt.compareSync( password, proveedorDB.password );
        const productoPDB = await Producto.findOne({ proveedor });
        if ( !productoPDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Id proveedor no válido'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( productoDB.id );
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
module.exports = {
    loginprod,
}