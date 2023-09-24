const errorMessage = document.querySelector('#message')
function showErrorMessage (errorText) {
        errorMessage.textContent = errorText
        errorMessage.classList.remove('hidden')
}

function hideErrorMessage(){
    errorMessage.textContent = ""
    errorMessage.classList.add("hidden")
}