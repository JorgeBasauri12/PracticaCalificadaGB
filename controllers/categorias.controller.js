const { response } = require('express');
const bcrypt = require('bcryptjs');
const Categoria = require('../models/CategoriaModel');

const getCategorias = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [categoria, total] = await Promise.all([
        Categoria
            .find({}, 'categorianombre descripcion img')
            .skip(desde) //variable de paginacion
            .limit(limite), // cuantos valores traer
        Categoria.countDocuments()
    ]);
    

    res.json({
        ok:true,
        categoria,
        total
    });
}
const crearCategoria = async(req, res=response)=>{

    //console.log(req.body);
    const {categorianombre, descripcion, password} = req.body;

    try {

        const existeCategoria = await Categoria.findOne({categorianombre});
        if(existeCategoria){
            return res.status(400).json({
                ok:false,
                msg: 'La categoria ya ha sido registrada'
            });
        }

        //creamos un objeto de la clase model Usuario
        const categoria = new Categoria(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        categoria.password = bcrypt.hashSync(password, salt);

        //indicamos a mongoose que registre al usuario en la bd
        await categoria.save();

        
        res.json({
            ok:true,
            categoria
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
}
const actualizarCategoria = async (req, res= response)=>{
    const uid = req.params.id;
        
    try {
        const categoriaDB = await Categoria.findById(uid);

        if (!categoriaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe categoria con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {password, categorianombre, descripcion, ...campos} = req.body;
        if(categoriaDB.categorianombre !== categorianombre){
            const existecategorianombre = await Categoria.findOne({categorianombre});
            if (existecategorianombre){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese nombre de categoria'
                });
            }
        }
        campos.categorianombre = categorianombre;
               
        //actualizacion de datos
        const categoriaActualizada = await Categoria.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            categoria: categoriaActualizada
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar categoria'
        });
    }
}

const eliminarCategoria = async(req, res=response) =>{
    const uid = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(uid);
        if(!categoriaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }

        await Categoria.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Categoria eliminada de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar categoria'
        });
    }
}
module.exports = {
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}