module.exports = (query)=>{
  let regex = ""
  const keySearch = query["keyword"] //req.query.keyword
  if(keySearch) regex = new RegExp(keySearch, "i")
  //return các chuỗi có chứa keysearch không phân biệt hoa thường
  return {keySearch, regex}
}