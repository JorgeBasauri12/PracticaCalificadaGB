const express= require ('express');//síntaxis para importar modulos en node.js
require('dotenv').config();
const {dbConection} =require('./config/database');
const cors = require('cors');
//crear servidor
const app=express();
//estableciendo la configuración de cors
app.use(cors());
//crear la conexión a la BD
dbConection();
//verificando variables de entorno
console.log(process.env);
// Creando 
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg: 'Bienvenidos a node'
    });
})
//codigo para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log('Servidor Node.js desplegado en el puerto: '+process.env.PORT);
})
// usuario - password BD
// adminproject - IJjwrU2xO7eei8kH