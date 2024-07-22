
module.exports = async(req,totalProduct,currentPage, limit)=>{
  const objectPagination = {
    currentPage: currentPage,
    limit: limit
  }
  if(req.query.page) objectPagination.currentPage = parseInt(req.query.page)
    //typeof req.query.page -> String

  objectPagination.totalPage = Math.ceil(totalProduct/limit)
  
  objectPagination.skip = (objectPagination.currentPage-1)*limit
  return objectPagination
}