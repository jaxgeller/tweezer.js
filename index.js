import Tweezer from 'tweezer.js'
import {easeInOutQuad, easeOutBounce} from 'ez.js'


let animatedHeight = document.querySelector('#animate-height')
let animateHeightButton = document.querySelector('#animate-height-button')
let a = new Tweezer({
  start: animatedHeight.getBoundingClientRect().height,
  end: animatedHeight.getBoundingClientRect().height * 3
})
.on('tick', v=> animatedHeight.style.height = v +'px')
.on('done', ()=> animatedHeight.textContent = "All done!")

animateHeightButton.onclick = function(){a.begin()}


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
jump.onclick = function() {
  new Tweezer({
    start: window.scrollY,
    end: document.body.clientHeight - window.innerHeight
  }).on('tick', v => window.scrollTo(0, v)).begin()
}
