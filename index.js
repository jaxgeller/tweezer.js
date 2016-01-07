import Tweezer from 'tweezer.js'
import {easeInOutQuad, easeOutBounce} from 'ez.js'

let animatedHeight = document.querySelector('#animate-height')
let shouldGrow = true
let isRunning = false
function grow(b) {
  if (b)
    return animatedHeight.getBoundingClientRect().height * 3
  else
    return animatedHeight.getBoundingClientRect().height / 3
}

document.querySelector('#animate-height-button').onclick = () => {
  if (!isRunning) {
    new Tweezer({
      start: animatedHeight.getBoundingClientRect().height,
      end: grow(shouldGrow)
    })
    .on('tick', v=> animatedHeight.style.height = v +'px')
    .on('done', ()=> {
      shouldGrow = !shouldGrow
      isRunning = false
    })
    .begin()
    isRunning = true
  }
}


let countUp = document.querySelector('#count-up')
let countUpButton = document.querySelector('#count-up-button')
let c = new Tweezer({
  start: 0,
  end: 123456
}).on('tick', v=> countUp.textContent = v)
.on('done', ()=> countUpButton.textContent = "All done counting to 123456!")
countUpButton.onclick = function(){c.begin()}


let moveAcrossScreen = document.querySelector('#move-across-screen')
let moveAcrossScreenButton = document.querySelector('#move-across-screen-button')
let m = new Tweezer({
  start: 0,
  end: window.innerWidth - moveAcrossScreen.getBoundingClientRect().left -moveAcrossScreen.getBoundingClientRect().width,
  easing: easeOutBounce
}).on('tick', v=> moveAcrossScreen.style.transform = 'translateX('+v +'px)')

moveAcrossScreenButton.onclick = function(){m.begin()}

let jump = document.querySelector('#jump-button')
let footer = document.querySelector('footer')
jump.onclick = function() {
  new Tweezer({
    start: window.scrollY,
    end: footer.getBoundingClientRect().top + window.scrollY
  }).on('tick', v => window.scrollTo(0, v)).begin()
}

document.querySelector('#jump-to-top').onclick = function() {
  new Tweezer({
    start: window.scrollY,
    end: 0
  }).on('tick', v => window.scrollTo(0, v)).begin()
}

