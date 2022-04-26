    
class ProductosRepository{

    constructor(){
        this.primerId = 1  
        this.productos = [
            {
                id : 1,
                timestamp: 1644520980721,
                nombre : "Harina 000",
                descripción : "Harina de trigo",
                código : 123001,
                foto : "url.jpg",
                precio : 90,
                stock: 25
            },
            {
                id : 2,
                timestamp: 1644520980721,
                nombre : "Misiones",
                descripción : "Yerba Mate",
                código : 123002,
                foto : "url.jpg",
                precio : 390,
                stock: 20
            }
        ]         
    }
   
    getProducts(){this.productos}
     
    getProductById(idProducto){
        let producto = this.productos.find(pr => pr.id == idProducto) 
        if(producto){
            return producto
        }else{
            return
            {
                error : 'Producto Inexistente'
            }
        }   
    }

    saveProduct(producto){
        if (this.productos.length == 0){
            producto.id = this.primerId
         }else{
             let ids = this.productos.map(p=>p.id)            
             let maxId = Math.max(...ids)
             producto.id = maxId + 1
         }
         producto.timestamp = Date.now()
         this.productos.push(producto) 
         console.log(this.productos)
         return this.productos.find(x => x.id == producto.id )
    }


    editarProducto(producto,idBuscado){     
        let product = this.productos.find(p=>p.id==idBuscado)    
        
        if(product){
            product.timestamp = producto.timestamp
            product.nombre = producto.nombre
            product.descripción = producto.descripción
            product.código = producto.código
            product.foto = producto.foto
            product.precio = producto.precio
            product.stock = producto.stock
            return product
        }
        return null
       
    }


    eliminarProducto(id){
        let existe = this.productos.find( pr => pr.id == id)
        if(!existe){
            return null
        }else{
            this.productos = this.productos.filter(prd => prd.id != id)
            return existe
        }
        
    }
}

module.exports = ProductosRepository
 