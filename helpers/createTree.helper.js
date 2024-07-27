let count = 1

function createTree(arr, parentId = "") {
  const tree = []
  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      item.index = count++
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
  count = 1
  const result = createTree(arr)
  return result
}




