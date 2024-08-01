module.exports.calNewPrice = (products)=>{
  products.forEach(product=>{
    product.newPrice = (product.price*(100-product.discountPercentage)/100).toFixed(0)
  })
  return products
}