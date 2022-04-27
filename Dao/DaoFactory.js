const productosDaoMongo = require('../Dao/ProductosDaoMongoDB')
const carritosDaoMongo = require('../Dao/CarritosDaoMongoDB')
const productosDaoSQL = require('../Dao/ProductosDaoSQL')
const carritosDaoSQL = require('../Dao/CarritosDaoSQL')
const modelProductoMongo = require('../models/ProductoMongoDB');  
const modelCarritoMongo = require('../models/CarritoMongoDb');  
const config = require('config');
const optionsMySql = require('../optionsMySql')

class DaoFactory{

    constructor(tipo){
        this.tipoPersistencia = tipo
    }
    
   
    getDao(){
        if (this.tipoPersistencia == 'productoSql') {            
            return new productosDaoSQL('productos')
        }else
        if (this.tipoPersistencia == 'carritoSql') {
            return new carritosDaoSQL('carritos')
        }else 
        if (this.tipoPersistencia == 'productoMongo') {
            return new productosDaoMongo()
        }else
         if (this.tipoPersistencia == 'carritoMongo') {
            return new carritosDaoMongo()
        }
     

    }


}

module.exports = DaoFactory