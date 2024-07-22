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



//form search
