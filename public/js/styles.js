const showTextarea = document.querySelector('#show-textarea');
const textArea = document.querySelector('#text-area')

showTextarea.addEventListener('click', () => {
    textArea.classList.toggle('.text-area')
})