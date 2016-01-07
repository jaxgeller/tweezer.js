import Tweezer from 'tweezer.js'

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
let shouldCount = true
let cIsRunning = false
function counter(shouldCount) {
  if (shouldCount)
    return {start: 0, end: 123456}
  else
    return {start: 123456, end: 0}
}
document.querySelector('#count-up-button').onclick = ()=> {
  if (!cIsRunning) {
    new Tweezer(counter(shouldCount))
      .on('done', () => {
        shouldCount = !shouldCount
        cIsRunning = false
      })
      .on('tick', v=> countUp.textContent = v)
      .begin()
    cIsRunning = true
  }
}



let moveAcrossScreen = document.querySelector('#move-across-screen')
let moveAcrossScreenButton = document.querySelector('#move-across-screen-button')
let shouldMove = true
let isMoving = false
let leftEdge = window.innerWidth - moveAcrossScreen.getBoundingClientRect().left
function move(shouldMove) {
  console.log(leftEdge)
  if (shouldMove) {
    return {
      start: 0,
      end:  leftEdge - moveAcrossScreen.getBoundingClientRect().width
    }
  }
  else {
    return {
      end: 0,
      start: parseInt(moveAcrossScreen.style.transform.split('(')[1])
    }
  }
}




moveAcrossScreenButton.onclick = function(){
  if (!isMoving) {
    let m = new Tweezer(move(shouldMove))
    .on('tick', v=> moveAcrossScreen.style.transform = 'translateX('+v +'px)')
    .on('done', ()=> {shouldMove = !shouldMove; console.log(shouldMove); isMoving = false})
    m.begin()
    isMoving = true
  }
}















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

