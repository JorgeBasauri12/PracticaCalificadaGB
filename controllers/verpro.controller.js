const { response } = require("express");
const bcrypt = require('bcryptjs');
const Proveedor = require ('../models/ProveedorModel');
const { generarJWT } =  require('../helpers/jwt')
const loginpro = async(req, res= response)=> {
    const { Companynombre, password } = req.body;
    try {        
        // Verificar al proveedor por su email
        const proveedorDB = await Proveedor.findOne({ Companynombre });
        if ( !proveedorDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Proveedor no encontrado'
                //considerar la utilizacion de este mensaje
            });
        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, proveedorDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( proveedorDB.id );
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
    loginpro,
}