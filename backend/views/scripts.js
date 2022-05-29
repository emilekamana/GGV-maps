const myModal = document.getElementById('addModal')
const myInput = document.getElementById('openButton')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

// Viewing/opening the model
