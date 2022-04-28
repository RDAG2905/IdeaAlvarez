const mongoose = require('mongoose');
const model = require('../models/CarritoMongoDb');    
const carrito = require('../Business/CarritoMongo')
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
   
     
    //el nombre es para que se polimórfico con el  sql 
    async getCarritoConProductos(id){
      return await model.findById(id)
    }


    async saveCarrito(){
        let unCarrito = new carrito()
        const modelCarrito = model(unCarrito);
        return await modelCarrito.save();
        
    }


    async delete(id){
        await model.findByIdAndRemove(id)      
    }


    async AgregarProductoAlCarrito(idCarrito,producto){
        let carrito = await this.getCarritoConProductos(idCarrito)
        carrito.productos.push(producto)
        this.editarCarrito(carrito,carrito._id)       
    } 


    async eliminarProductoDelCarrito(idCarrito,idProducto){
        let carrito = await this.getCarritoConProductos(idCarrito)
        carrito.productos = carrito.productos.filter(prod =>prod._id != idProducto)
        this.editarCarrito(carrito,carrito._id)
    }


     async editarCarrito(carrito,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,carrito)           
    }
}

module.exports = ContenedorCarritoMongo