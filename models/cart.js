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
            let cart = {products: [], totalPrice : 0}
            if(!err){
                cart = JSON.parse(fileContent)
            }
            const existingProIndex = cart.products.findIndex(prod => prod.id === id);
            const existingPro = cart.products[existingProIndex]
            let updatePro
            if(existingPro){
                updatePro = {...existingPro}
                updatePro.qty = updatePro.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProIndex] = updatePro
            }else{
                updatePro = { id:id , qty:1}
                cart.products = [...cart.products,updatePro]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p,JSON.stringify(cart),err => {
                console.log(err)
            })
        })
    }

}