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

//update quantity for cart
const inputUpdateQuantitys = document.querySelectorAll("input[name='quantity']")
if(inputUpdateQuantitys){
  inputUpdateQuantitys.forEach(input=>{
    input.addEventListener("change", ()=>{
      const id = input.getAttribute("item-id")
      const quantity = input.value
      window.location.href = `/cart/update/${id}/${quantity}`
    })
  })
}

//end - update quantity for cart