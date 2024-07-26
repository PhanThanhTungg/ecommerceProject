let count = 1
function createTree(arr, parentId = "") {
  const tree = []
  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      item.index = count
      count+=1
      const children = createTree(arr, item.id)
      if (children.length > 0) {
        item.children = children
      }
      tree.push(item)
    }
  })
  return tree
}

module.exports = (arr)=>{
  count = 0
  const result = createTree(arr)
  return result
}

