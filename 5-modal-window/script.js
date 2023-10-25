'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal')
const btnsShowModal = document.querySelectorAll('.show-modal')
// const haveHidden = modal.classList.contains('hidden')

function hasHidden(){
    return modal.classList.contains('hidden')
}

function modalClose(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
function modalOpen(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
for(let i = 0; i < btnsShowModal.length; i++){
    btnsShowModal[i].addEventListener('click',modalOpen);   
}

btnCloseModal.addEventListener('click',() => {
    haveHidden() ? '' : modalClose() 
} )

document.addEventListener('keydown', (event) => {
    const keyboardFeatures = {
        Escape(){
            modalClose()
        }
    }
    let key = event.key;

    const closeFunction = keyboardFeatures[key]
    if(closeFunction){       
        hasHidden() ? '' : closeFunction()
    }
})
