const config = require('config')
const knex = require('knex')

class ContenedorSQL{

    constructor(table){
     
     this.dbConnection =  knex(config.get('optionsMySql'))
     this.table = table
    }
   
   
     async getAll(){ 
        return new Promise((res,rej)=>{
            this.dbConnection(this.table)
                .then((rows)=>{
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })
                     
    }
     

    async getById(idItem){
        return new Promise((res,rej)=>{
            this.dbConnection(this.table).where("id",idItem)  
                .then((rows)=>{
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })
        
    }


    async save(item){   
        return new Promise((res,rej)=>{
            this.dbConnection(this.table).insert(item)
                .then((rows)=>{
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })  
    }


    
    async update(item,idBuscado){     
        return new Promise((res,rej)=>{
            this.dbConnection(this.table).where("id",idBuscado).update(item) 
                .then((rows)=>{
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })       
        
    }



    async delete(id){
        return new Promise((res,rej)=>{
            this.dbConnection(this.table).where("id",id).del()         
                .then((rows)=>{
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })       
        
    }

    async eliminarProductoDelCarrito(idCarrito,idProducto){
        return new Promise((res,rej)=>{
            this.dbConnection('productoscarrito')
                .where("idProducto",idProducto)
                .andWhere('idCarrito', idCarrito)
                .del()         
                .then((rows)=>{
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })       
        
    }


    async AgregarProductoAlCarrito(idCarrito,producto){  
        let item = {
            idCarrito:idCarrito,
            idProducto:producto.id
        } 
        return new Promise((res,rej)=>{
            this.dbConnection('productoscarrito').insert(item)
                .then((rows)=>{
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })
             
    }
 

    async getCarritoConProductos(id){
        return new Promise((res,rej)=>{
            this.dbConnection(this.table)
                .raw('Call GetCarritoConProductos(${id});')  
                .then((rows)=>{
                    console.log(rows)
                 res(rows)
            }).catch((err)=>{
                rej(console.log(err))
                console.log(err.sqlMessage)
                console.log(err.sql)
            }).finally(()=>{
              //  this.dbConnection.destroy()
            })
                  
        })       
        
    }


    disconnect(){
        this.dbConnection.destroy()
    }
}

module.exports = ContenedorSQL
 