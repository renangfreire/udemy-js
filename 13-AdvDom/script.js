'use strict';



const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const navLinks = document.querySelector('.nav__links')
const allSections = document.querySelectorAll('.section')

const imgsTargets = document.querySelectorAll('img[data-src]')


const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const operationsTabs = document.querySelector('.operations__tab-container');
const operationsContent = document.querySelectorAll('.operations__content')

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click', openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page Navigation

btnScrollTo.addEventListener('click', function(e){
  section1.scrollIntoView({behavior: "smooth"})
})

// This is Bad practice, because if existing many links, they will contain various listeners, and application can be crashing.
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({behavior: "smooth"})
//   })
// })

// 1. Add EventListener to common parent element
// 2. Determine what element originated the event

navLinks.addEventListener('click', function(e){
  e.preventDefault()
  // Matching Strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: "smooth"})
  }
})

// Tabbed Component
operationsTabs.addEventListener('click', function(e){
  // this is a button?
  if(!e.target.classList.contains('btn')) return
    //Get active button
    const buttonActive = this.querySelector('.operations__tab--active') 

    //remove active classes
    buttonActive.classList.remove('operations__tab--active')
    operationsContent.forEach((el) => el.classList.remove('operations__content--active'))

    // active tab
    e.target.classList.add('operations__tab--active')
  
    // activate content area
    const selectedContentArea = this.parentNode.querySelector(`.operations__content--${e.target.dataset.tab}`)

    selectedContentArea.classList.add('operations__content--active')
})


// Menu Fade animation
const fadeAnimation = function(typeFade, e){
  if(!e.target.classList.contains('nav__link')){
   return
  }

  const link = e.target
  const siblings = [...this.querySelectorAll('.nav__link')].filter(el => e.target.textContent !== el.textContent)
  const logo = this.querySelector('.nav__logo')
 
  const intensityOpacity = typeFade == 'fadeIn' ? 0.5 : 1


  siblings.forEach(el => el.style.opacity = intensityOpacity)
  logo.style.opacity = intensityOpacity
}

nav.addEventListener('mouseover', fadeAnimation.bind(nav, 'fadeIn'))

nav.addEventListener('mouseout', fadeAnimation.bind(nav, 'fadeOut'))

// Sticky Navigation
const initialCords = section1.getBoundingClientRect();
let navStickyActive


//Using Scroll event

const stickyNavigation = function(e){
    if(window.scrollY > initialCords.top ){
      if(navStickyActive){
        return
        }
        nav.classList.add('sticky')
        nav.animate([
          {opacity: '0', top: '-100px'},
          {opacity: '1', top: '0'}
        ], {duration:500, iterations: 1})
        navStickyActive = true
        navFixedActive = false
      return
     }

     if(!navFixedActive){
      nav.animate([
        {opacity: '1', top: '0'},
        {opacity: '0', top: '-100px'}
        ], 
        
      {duration:500, iterations: 1})
      setTimeout(() => nav.classList.remove('sticky'), 450)
       navStickyActive = false
       navFixedActive = true
          return
     }
    }
    
     // Tem alguma forma melhor de fazer isso?
     // procurei mas nao achei, talvez eu deva procurar melhor


// window.addEventListener('scroll', stickyNavigation)

//// Stick Navigation: Using Intersection Observer API (BETTER WAY)

// const obsCallBack = function(entries, observer){
//   entries.forEach(entry => console.log(entry))
// }

// const obsOptions = {
//     root: null,
//     threshold: [0, .6]
// }

// const observer = new IntersectionObserver(obsCallBack, obsOptions)

// observer.observe(section1)


const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries){

  const [entry] = entries

  if(!entry.isIntersecting){
    if(navStickyActive) return
      nav.classList.add('sticky')
      nav.animate([
        {opacity: '0', top: '-100px'},
        {opacity: '1', top: '0'}
      ], {duration:500, iterations: 1})
      navStickyActive = !navStickyActive
    return
   }
   if(entry.isIntersecting){
    if(!navStickyActive) return
    nav.animate([
      {opacity: '1', top: '0'},
      {opacity: '0', top: '-100px'}
      ], 
      
    {duration:500, iterations: 1})
    setTimeout(() => nav.classList.remove('sticky'), 450)
     navStickyActive = !navStickyActive
        return
   }
  }

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header)

// Observer é pique um Listener, mas o modo como ele responde é totalmente diferente, ao invés de ser com uma tecla
// ele responde a algum acontecimento na pag


// Reveal Sections

const revealSection = function(entries, observer){
  const [entry] = entries

  if(!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden')

  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})

allSections.forEach((section) => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// Lazy Loading Images

const lazyLoading = function(entries, observer){
  
  const [entry] = entries

  if(!entry.isIntersecting) return
  
  // replace src with data-src
  entry.target.setAttribute('src', entry.target.dataset.src)
  
  //remove class lazy
  // EventListener help people, are using a bad wi-fi.
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img')
    })

    observer.unobserve(entry.target)
  
}

const imgObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgsTargets.forEach((img) => {
  imgObserver.observe(img)
})

// Slider Component
const slides = document.querySelectorAll('.slide')
const sliderBtnLeft = document.querySelector('.slider__btn--left')
const sliderBtnRight = document.querySelector('.slider__btn--right')
const dotsContainer = document.querySelector('.dots') 

let currentSlide = 0
const maxSlide = slides.length

const createDots = function(){
  slides.forEach((el,i) => {
    // Inserting and Creating Element with InsertAdjacent
    dotsContainer.insertAdjacentHTML('beforeend', `<button class='dots__dot ${i == currentSlide ? 'dots__dot--active' : ''}' data-slide='${i}'></button>`)

    // Creating Element with JS Basic
    // const dot = document.createElement('button')
    // dot.classList.add('dots__dot')
    // dot.dataset.slide = i

    // dotsContainer.append(dot)
  })
}() // <-- InstaRunning 

const activeDot = function(slide){
  dotsContainer.querySelectorAll('.dots__dot')
  .forEach(el => {
    if(el.dataset.slide == slide){
      el.classList.add('dots__dot--active')
      return
    }
    el.classList.remove('dots__dot--active')
  })
}

const goToSlide = function(slide){
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide) }%)`
  })
  activeDot(slide)
}

function nextSlide(){
  if(currentSlide == maxSlide-1){
    currentSlide = 0
  } else{
    currentSlide++
  }
  goToSlide(currentSlide)
}

function prevSlide(){
  if(currentSlide == 0){
    currentSlide = maxSlide-1
  } else{
    currentSlide--
  }
  goToSlide(currentSlide)
}

function selectDot(e){
  if(!e.target.classList.contains('dots__dot')) return  
  currentSlide = e.target.dataset.slide

  goToSlide(currentSlide)
}

sliderBtnLeft.addEventListener('click', prevSlide)
sliderBtnRight.addEventListener('click', nextSlide)
dotsContainer.addEventListener('click', selectDot)

document.addEventListener('keydown', (e) => {
  if(e.key == 'ArrowLeft'){
    prevSlide()
  }
  e.key == 'ArrowRight' && nextSlide()
})


/////////////////////////////////////////////////

// Creating and inserting Elements

// const message = document.createElement('div')
// message.classList.add('cookie-message');

// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

// //header.prepend(message)
// header.append(message)
// //header.append(message.cloneNode(true)) // if need use more one time 

// // header.before(message)
// // header.after(message)


// // Delete Elements
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.remove()
//   // message.parentElement.removeChild(message)
// })


// // Styling Elements
// message.style.backgroundColor = '#37383d'
// message.style.width = '100%'
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px' 

// document.documentElement.style.setProperty('--color-primary' , 'orange')

// //Attributes
// const logo = document.querySelector('#logo')
// console.log(logo.alt)
// console.log(logo.src) // definitive LINK
// console.log(logo.getAttribute('src')) // relative LINK

// //Non-standard
// console.log(logo.designer) // return null
// console.log(logo.getAttribute('designer')) //return correct Attribute

// const linkDefinitive = document.querySelector(".twitter-link")
// const linkRelative = document.querySelector(".nav__link")

// //both return correct LINK
// console.log(linkDefinitive.href)
// console.log(linkDefinitive.getAttribute('href'))

// console.log(linkRelative.href)
// console.log(linkRelative.getAttribute('href'))

// // Data Attributes
// console.log(logo.dataset.versionNumber)

// // Classes
// logo.classList.add('c', 'j')
// logo.classList.remove('c', 'j')
// logo.classList.toggle('c')
// logo.classList.contains('c') // not includes

// // Don't use, because it overwritten all existing classes
// // logo.className = 'jonas'

// const btnScrollTo = document.querySelector('.btn--scroll-to')
// const section1 = document.querySelector('#section--1')

// btnScrollTo.addEventListener('click', function(e){
//   const s1coords = section1.getBoundingClientRect(); //get element coords

//   // Scrolling
//   //  window.scrollTo({
//   //   left: s1coords.left + window.scrollX, 
//   //   top: s1coords.top +  window.scrollY,
//   //   behavior: 'smooth'
//   // }) // old method
//   section1.scrollIntoView({behavior: "smooth"})
// })

// const h1 = document.querySelector('h1')

// const eventH1 = function(){
//   const audio = document.querySelector('audio')
//   audio.play()

//   h1.removeEventListener('mouseenter', eventH1)
// }

// h1.addEventListener('mouseenter', eventH1 )

// h1.onclick = function(){
//   alert('onClick: Great! you are reading the heading :D')
// }

// const randomInt = (max,min) => Math.floor(Math.random() * (max- min + 1) + min)
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()
//   // //Stop propagation
//   // e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function(){
//   this.style.backgroundColor = randomColor()
// })

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor()
// })

// const h1 = document.querySelector('h1')

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.children)
// console.log(h1.childNodes)
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'red'
// console.log(h1.firstChild)
// console.log(h1.lastChild)

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('header').style.background = 'var(--gradient-primary)'

// // Going sideways: siblings 
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)