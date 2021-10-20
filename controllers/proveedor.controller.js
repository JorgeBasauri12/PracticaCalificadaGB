const {response} = require('express');
const bcrypt = require('bcryptjs');
const Proveedor = require('../models/ProveedorModel');


const getProveedor = async(req, res)=>{
    const proveedor = await Proveedor.find({}, 'Companynombre Contactnombre pais');
    res.json({
        ok:true,
        proveedor
    });
}
const crearProveedor = async(req, res=response)=>{
    //console.log(req.body);
    const {password,Companynombre,Contactnombre, pais} = req.body;
    try {
        const existeCompanynombre = await Proveedor.findOne({Companynombre});
        if(existeCompanynombre){
            return res.status(400).json({
                ok:false,
                msg: 'El nombre de la compañia ya ha sido registrado'
            });
        }
        //creamos un objeto de la clase model Usuario
        const proveedor = new Proveedor(req.body);
        //Encriptar contraseña
        const salt= bcrypt.genSaltSync();
        proveedor.password= bcrypt.hashSync(password,salt);
        //indicamos a mongoose que registre al usuario en la bd
        await proveedor.save();
        res.json({
            ok:true,
            proveedor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }   
}
const actualizarProveedor = async (req, res= response)=>{
    const uid = req.params.id;        
    try {
        const proveedorDB = await Proveedor.findById(uid);
        if (!proveedorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un proveedor con ese id'
            });
        }
        //Codigo previo a la actualizacion 
        const {Companynombre,password ,Contactnombre, pais, ...campos} = req.body;
        if(proveedorDB.password !== password){
            const existeContactnombre = await Proveedor.findOne({Contactnombre});
            if (existeContactnombre){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un proveedor con este email'
                });
            }
        }
        campos.Companynombre = Companynombre;
        //actualizacion de datos
        const usuarioProveedor = await Proveedor.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok:true,
            proveedor: usuarioProveedor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar proveedor'
        });
    }
}
const eliminarProveedor = async(req, res=response) =>{
    const uid = req.params.id;
    try {
        const proveedorDB = await Proveedor.findById(uid);
        if(!proveedorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un proveedor con ese id'
            });
        }
        await Proveedor.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Proveedor eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar proveedor'
        });
    }
}
module.exports = {
    getProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,
}