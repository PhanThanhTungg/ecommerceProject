// filter theo status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
  const url = new URL(window.location.href)
  buttonStatus.forEach(item=>{
    item.addEventListener('click', ()=>{
      const status = item.getAttribute("button-status")
      if(status) url.searchParams.set("status", status)
      else url.searchParams.delete("status")

      window.location.href = url.href
     
    })
  })

  //Add class active cho filter status
  const status = url.searchParams.get("status")||""
  const buttonActive = document.querySelector(`[button-status="${status}"]`)
  if(buttonActive){
    buttonActive.classList.add('active')
  }
  //end-Add class active cho filter status
}
//end-filter theo status


//form search
const formSearch = document.querySelector(".formSearch")
if(formSearch){
  formSearch.addEventListener("submit", (e)=>{
    e.preventDefault()
    const keyword = e.target.elements["keyword"].value
    const url = new URL(window.location.href)
    if(keyword){
      url.searchParams.set("keyword", keyword)
      
    }
    else{
      url.searchParams.delete("keyword")
    }
    window.location.href = url.href
  })
}
//end-form search

//pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]")
if(listButtonPagination.length>0){
  listButtonPagination.forEach(item=>{
    item.addEventListener('click', ()=>{
      const destinationPage = item.getAttribute("button-pagination")
      const url = new URL(window.location.href)
      url.searchParams.set("page", destinationPage)
      window.location.href = url.href
    })
  })
}
//end-pagination

//button-changeStatus
const buttonChangeStatus = document.querySelectorAll("[status]")
buttonChangeStatus.forEach(item=>{
  const formChangeStatus = document.querySelector(".form-change-status")
  item.addEventListener('click', ()=>{
    const [status, id] =[item.getAttribute("status"), item.getAttribute("id")]
    const desStatus = status=="active"?"inactive":"active"
    formChangeStatus.action+= `/${desStatus}/${id}?_method=PATCH`
    formChangeStatus.submit()
  })
})
//end button-changeStatus

//handle tick of checkbox-multi
const tableCheckBoxMulti = document.querySelector(".tableCheckBoxMulti")
const inputCheckAll = tableCheckBoxMulti.querySelector("input[name='checkall']")
const inputCheckBoxs = tableCheckBoxMulti.querySelectorAll("input[name='id']")

inputCheckAll.addEventListener('click', ()=>{
  if(inputCheckAll.checked == true) inputCheckBoxs.forEach(item => item.checked = true)
  else inputCheckBoxs.forEach(item => item.checked = false)
})

inputCheckBoxs.forEach(item=>{
  item.addEventListener('click', ()=>{
    const inputTicked = tableCheckBoxMulti.querySelectorAll("input[name='id']:checked")
    if(inputCheckBoxs.length == inputTicked.length){
      inputCheckAll.checked = true
    }
    else inputCheckAll.checked = false
  })
})

//end-handle tick of checkbox-multi

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
const inputChangeMulti = formChangeMulti.querySelector("input")
formChangeMulti.addEventListener('submit',(e)=>{
  e.preventDefault()

  const inputTicked = tableCheckBoxMulti.querySelectorAll("input[name='id']:checked")
  if(inputTicked.length){

    const typeChange = e.target.elements["type"].value

    if(typeChange=="deleteAll"){
      const confirmVal = confirm("Bạn có chắc muốn xóa tất?")
      if(!confirmVal) return
    }

    let listId
    if(typeChange=="changePosition"){
      listId = [...inputTicked].map(item=>{
        const pos = item.closest("tr").querySelector("[name='position']").value
        return `${item.value}-${pos}`
      })
    }
    else listId = [...inputTicked].map(item=>item.value)
    
    inputChangeMulti.value = listId.join(",")

    formChangeMulti.submit()
  }
  else alert("Chọn ít nhất 1 ô")
})
//end - form change multi

//Delete item
const buttonDeletes = document.querySelectorAll(".buttonDeleteItem")
const formDetele = document.querySelector(".formDeleteItem")
buttonDeletes.forEach(buttonDelete=>{
  buttonDelete.addEventListener('click', ()=>{
    const confirmVal = confirm("Bạn có chắc muốn xóa?")
    if(confirmVal){
      const idItem = buttonDelete.getAttribute("id")
      formDetele.action+=`${idItem}?_method=DELETE`
      formDetele.submit()
    }
  })
})
//end-Delete item

// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  let time = parseInt(showAlert.getAttribute("data-time"))
  
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time)

  const closeAlert = showAlert.querySelector("[close-alert]")
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}
// End show-alert