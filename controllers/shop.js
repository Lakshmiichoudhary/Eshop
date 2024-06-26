const Product = require('../models/product');
const Cart = require('../models/cart') 

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows,fieldData])=>{
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/products'
      });
    })
    .catch(err=> console.log(err))
};

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail",{
        product : product,
        pageTitle : product.title,
        path : "/products"
      })
    })
    .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows,fieldData])=>{
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err=> console.log(err))
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId
  console.log("Product ID:", prodId);
  Product.findById(prodId,product => {
    Cart.addProduct(prodId,product.price)
  })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
