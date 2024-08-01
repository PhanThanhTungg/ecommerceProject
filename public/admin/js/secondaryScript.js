const buttonChangePassword = document.querySelector(".button-change-password")
if(buttonChangePassword){
  buttonChangePassword.addEventListener("click",()=>{
    const form = document.querySelector(".change-password-group")
    form.classList.toggle("d-none")
  })
}