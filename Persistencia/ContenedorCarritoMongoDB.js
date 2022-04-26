const mongoose = require('mongoose');
const model = require('../models/CarritoMongoDb');    
const carrito = require('../Business/Carrito')
const config = require('config')
const mongoConnectionString = config.get('mongoDB.connection')  

class ContenedorCarritoMongo{
    
    
    constructor(){
        //const URL = 'mongodb://localhost:27017/ecommerce2'
        const URL = mongoConnectionString
        let rta = mongoose.connect(URL, {});   
        console.log(rta);
        console.log('Base de datos conectada');
    }
   
     

    async getById(id){
      return await model.findById(id)
    }


    async save(carrito){
        const modelCarrito = model(carrito);
        return await modelCarrito.save();
        
    }


    async delete(id){
        await model.findByIdAndRemove(id)      
    }


    async AgregarProductoAlCarrito(idCarrito,producto){
        let carrito = await this.getCarritoById(idCarrito)
        carrito.productos.push(producto)
        this.editarCarrito(carrito,carrito._id)       
    } 


    async eliminarProductoDelCarrito(idCarrito,idProducto){
        let carrito = await this.getCarritoById(idCarrito)
        carrito.productos = carrito.productos.filter(prod =>prod._id != idProducto)
        this.editarCarrito(carrito,carrito._id)
    }


     async editarCarrito(carrito,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,carrito)           
    }
}

module.exports = ContenedorCarritoMongo