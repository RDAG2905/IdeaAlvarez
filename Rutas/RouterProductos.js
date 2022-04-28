const express = require('express')
const { tipoPersistencia } = require('../config/default')
const { Router } = express
const router = Router()
const repository = require('../Dao/ProductosDaoMongoDB')
const productosDao = new repository()
const error = 'producto no encontrado' 
const daoFactory = require('../Dao/DaoFactory')
const config = require('config');

const tipoPersistenciaProductoMongo = config.get('tipoPersistencia.persistenciaA')
const tipoPersistenciaCarritoMongo = config.get('tipoPersistencia.persistenciaB')
//const tipoPersistenciaProductoSql = config.get('tipoPersistencia.persistenciaC')
//const tipoPersistenciaProductoSql = config.get(tipoPersistencia.persistenciaC)
const tipoPersistenciaCarritoSql = config.get('tipoPersistencia.persistenciaD')



const getDao = (tipoPersistencia)=>{
    let factory = new daoFactory(tipoPersistencia) 
    return factory.getDao();
}

router.get('/:id?',(req,res)=>{
   let idProducto = req.params.id    
   let dao = getDao(config.get('tipoPersistencia.persistenciaC'))
   
        if(!idProducto){
                    dao.getAll()
                        .then(productos =>
                            res.send({productos})
                        )
                        .catch(error=>res.send({error}))
                
        }else{
                    dao.getById(idProducto)
                        .then(producto =>
                            res.send({producto})
                        )
                        .catch(error => 
                            res.send({error}))                           
        }
   
})



router.post('/',(req,res)=>{
    let productoNuevo = req.body
    let dao = getDao(config.get('tipoPersistencia.persistenciaC'))
    dao.save(productoNuevo)
        .then(productoCreado =>
            res.send({productoCreado}) 
        )
        .catch( error =>
            res.send({error})       
        )
    
})



router.put('/:id',(req,res)=>{
   let idProducto = req.params.id    
   let productoEdicion = req.body
   let dao = getDao(config.get('tipoPersistencia.persistenciaC'))
            dao.update(productoEdicion,idProducto)
                .then( productoEditado =>
                      res.send({productoEditado})
                )
                .catch( error =>
                      res.send({error})
                )    
})


router.delete('/:id',(req,res)=>{
   let id = req.params.id
   let dao = getDao(config.get('tipoPersistencia.persistenciaC'))
                 dao.delete(id)
                    .then(productoEliminado =>
                        res.send({productoEliminado}))
                    .catch(error=>
                        res.send({error})
                    )
    
})

module.exports = router