const { response } = require('express');

const Producto = require('../models/ProductoModel');

const getProductos = async(req, res = response) => {

    const productos = await Producto.find()
                                .populate('categoria','categorianombre')
                                .populate('proveedor','Companynombre')


    res.json({
        ok: true,
        productos: productos
    })
}

const crearProducto = async (req, res = response) => {

    const uid = req.uid;
    const producto = new Producto({
        categoria: uid,
        ...req.body
    });


    try {

        const productoDB = await producto.save();        
        res.json({
            ok: true,
            producto: productoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear producto, consulte con el administrador'
        })
    }


}

const actualizarProducto = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const producto = await Producto.findById( id );

        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        const cambiosProducto = {
            ...req.body,
            categoria: uid
        }

        const ProductoActualizado = await Producto.findByIdAndUpdate( id, cambiosProducto, { new: true } );


        res.json({
            ok: true,
            producto: ProductoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar producto, consulte con el administrador'
        })
    }

}

const eliminarProducto = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const producto = await Producto.findById( id );

        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        await Producto.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Producto borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Producto no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}