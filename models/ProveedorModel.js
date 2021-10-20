const {Schema, model} = require('mongoose');
//Definicion del esquema para la coleccion de Usuario
const ProveedorSchema = Schema({
    Companynombre:{
        type: String,
        required: true,
        unique: true
    },
    Contactnombre:{
        type: String,
        required: true        
    },
    pais:{
        type: String,
        require: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
});
//Configuracion opcional para cambiar el _id por uid
//Este cambio es solo para fines visuales, la bd permanece con _id
ProveedorSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model ('Proveedor', ProveedorSchema);