//Shows error messages
const errorMessage = document.querySelector('#message')
function showErrorMessage (errorText) {
        errorMessage.textContent = errorText
        errorMessage.classList.remove('hidden')
}
//hides error messages
function hideErrorMessage(){
    errorMessage.textContent = ""
    errorMessage.classList.add("hidden")
}