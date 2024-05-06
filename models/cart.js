const fs = require("fs")
const path = require("path")

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
  
module.exports = class cart {
    static addProduct(id,productPrice) {
        fs.readFile(p,(err,fileContent) => {
            let cart = {product: [], totalPrice : 0}
            if(err){
                cart = JSON.parse(fileContent)
            }
            const existingProIndex = cart.product.findIndex(
                prod => prod.id === id
            )
            const existingPro = cart.product(pro => pro.id === id)
            let updatePro
            if(existingPro){
                updatePro = {...existingPro}
                updatePro.qty = updatePro.qty + 1
                cart.product = [...cart.product]
                cart.product[existingProIndex] = updatePro
            }else{
                updatePro = { id:id , qty:1}
                cart.product = [...cart.product,updatePro]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.watchFile(p,JSON.stringify(cart),err => {
                console.log(err)
            })
        })
    }

}