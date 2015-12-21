# Tweenzy.js

A simple utility to easily create performant tweening.

### Usage

+ Create a new instance
+ Specify options
+ Attach to the emitter
+ Run the tween

```es6
import Tweenzy from 'tweenzy'

let div = document.querySelector('div')

// create new instance

let animatedHeight = new Tweenzy({
  duration: 1000,         // in ms
  start: 0,               // the start tween value
  end: 1000,              // end tween value
  ease: ease-in-out-quad  // pass in easing function, see details below
})

// attach to the emmiter
animatedHeight.on('tick', val => div.style.height = `${val}px`)

// begin the tweening
animatedHeight.begin()
```

### Installation

##### Npm

Add it to your `package.json`, and make sure to load it in using a module loader like browserify or webpack.

```shell
$   npm install tweenzy --save
```

##### Bower

Install via the bower commandline tool

```shell
$   bower install tweenzy
```

##### Script

Download the dist folder and copy this to your HTML

```html
<script src="dist/tweenzy.min.js"></script>
```

### Examples

These examples will assume you have imported the library as Tweenzy.

##### Animate the height of a div on a button click

```es6
let div = document.querySelector('div')
let animatedHeight = new Tweenzy({ start: 0, end: 1000})
animatedHeight.on('tick', val => div.style.height = `${val}px`)

let button = document.querySelector('button').addEventListener('click', animatedHeight.begin)
```

##### Move an item across the screen

```es6
let div = document.querySelector('div')
let moveLeft = new Tweenzy({ start: 0, end: window.innerWidth})
moveLeft.on('tick', val => div.style.left = `${val}px`)

moveLeft.begin()
```

##### Scroll reveal a height of a div

```es6
let div = document.querySelector('div')
let revealed = new Tweenzy({ start: 0, end: 250})
revealed.on('tick', val => div.style.height = `${val}px`)

let hasFired = false;
window.addEventListener('scroll', ()=> {
  let rect = div.getBoundingClientRect()

  if (rect.top < 0 && !hasFired) {
    revealed.begin()
    hasFired = true;
  }
})
```

### Configuration

##### Base options

###### Duration

The duration in milliseconds of how long the tween should take.

###### Start

The start value of the tween. For example, if you want to animate a height from 0 to 100, start would be 0.

###### End

The end value of the tween. For example, if you want to animate a height from 0 to 100, end would be 100.

###### Ease

An easing function that returns the tween values. This can be any easing function that takes in the following parameters in this order: time elapsed, start, difference, duration. You can see examples [here](https://github.com/jaxgeller/ez.js/blob/master/ez.js).

##### Emitter
