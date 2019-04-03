# Tweezer.js

[![Tweezer.js on NPM](https://img.shields.io/npm/v/tweezer.js.svg?style=flat-square)](https://www.npmjs.com/package/tweezer.js) [![Tweezer.js Downloads on NPM](https://img.shields.io/npm/dm/tweezer.js.svg?style=flat-square)](https://www.npmjs.com/package/tweezer.js) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

A small, dependency-free, ES6 library for smooth animations. [Demo](https://tweezer-js-demo.stackblitz.io/).

Tweezer.js is the last tweening library you'll ever need. It provides the building blocks for any animation, allowing you to construct beautiful animations simply and without the need of requiring lots of other dependencies like smoothScroll, countUp.js, and GSAP.

## Install

Tweezer was developed with a modern JavaScript workflow in mind. To use it, it's recommended you have a build system in place that can transpile ES6, and bundle modules. For a minimal boilerplate that fulfills those requirements, check out [outset](https://github.com/callmecavs/outset) or the [gh-pages branch](https://github.com/jaxgeller/tweezer.js/tree/gh-pages) of this repo.

To install, run

```bash
$ npm install tweezer.js --save
```

## Use

Two parameters are required to start Tweezer, a `start` and an `end` value, the rest is optional. Tweezer works by emitting tweened values from `start` to `end` via the `tick` event. **It is up to you on how to use these values.**

Below are all of the default configuration options. Note: **all methods can be chained.**

```javascript
import Tweezer from 'tweezer.js'

new Tweezer({
    start: 0,
    end: 0,
    duration: 1000,
    easing: (t, b, c, d) => {
      if ((t/=d/2) < 1) return c/2*t*t + b
      return -c/2 * ((--t)*(t-2) - 1) + b
    }
})
.on('tick', value => {
  // do something with value
})
.on('done', ()=> {
  // all done
})
.stop() // this stops the tweening
.begin() // this fires the tweening
```

## Examples and Use Cases

##### Add a Tweened Count Up Button

```javascript
let countUpText = document.querySelector('#count-up')
let countUpButton = document.querySelector('#count-up-button')

countUpButton.onclick = ()=> {
  new Tweezer({
    start: 0,
    end: 123456
  })
  .on('tick', v=> countUpText.textContent = v)
  .begin()
}
```

##### Smooth Scroll to an Element

```javascript
let button = document.querySelector('#jump-button')
let elementYouWantToScrollTo = document.querySelector('#element')

button.onclick = ()=> {
  new Tweezer({
    start: window.scrollY,
    end: elementYouWantToScrollTo.getBoundingClientRect().top + window.scrollY
  })
  .on('tick', v => window.scrollTo(0, v))
  .begin()
}
```

`start` is the current scroll position. `end` is set to the top of the element plus the current scroll position,
which will yield the document Y position of the element.

##### Move an Element Across the Screen

```javascript
let mover = document.querySelector('#move-across-screen')
let moverButton = document.querySelector('#move-across-screen-button')

moverButton.onclick = ()=> {
  new Tweezer({
    start: mover.getBoundingClientRect().left,
    end: window.innerWidth - mover.getBoundingClientRect().width
  })
  .on('tick', v=> {
    mover.style.transform = `translate3d(${v}px, 0, 0)`
  })
  .begin()
}
```

## Configuration

Tweezer only has a couple of options, but these options can be very powerful. Again, only required options to run tweezer are `start` and `end`. And all methods are chainable.

### Start and End

```javascript
new Tweezer({
  start: 0,
  end: 9000
})
```

These are integers that define a start of tween and an end of tween. `start` can be greater than or less than `end` for tweening up and down.

### Easings

```javascript
new Tweezer({
  easing: (t, b, c, d) => {
    if ((t/=d/2) < 1) return c/2*t*t + b
    return -c/2 * ((--t)*(t-2) - 1) + b
  }
})
```

The default easing is `easeInOut`.  If you'd like to add your own easing, implement a function that takes in four parameters: `t, b, c, d` and returns a single integer. For examples of easings, checkout [ez.js](https://github.com/jaxgeller/ez.js).  Parameters explained below.

```
t: current time,
b: beginning value,
c: change in value,
d: duration
```

### Tweeners

By setting the `start` and `end` properties, Tweezer uses a default tweener that simply tweens directly from `start` to `end`.  This behavior can be overridden by explicitly specifying a `tweener` in the config instead.  There is only one alternate tweener currently, called `MultiTweener`.  This tweener allows you to tween several different values simultaneously and in sync.

```javascript
import Tweezer from 'tweezer.js'
import { MultiTweener } from 'tweezer.js/dist/multi-tweener'

new Tweezer({
    tweener: new MultiTweener({
        starts: [0, 500, -100],
        ends: [50, 400, 0]
    })
})
.on('tick', ([v1, v2, v3]) => {
    el1.style.top = v1;
    el2.style.top = v2;
    el3.style.top = v3;
})
.begin()
```

### Using the Emitter

To handle events, use the `.on(handlerName, callback)` method.

##### Tick Event

This is where you'll do the bulk of animation by handling the values return by Tweezer. With these values you can do anything like transforming and manipulating DOM elements.It will fire every 16ms via `requestAnimationFrame`.

```javascript
new Tweezer({
  start: 0,
  end: 9000
})
.on('tick', v => el.style.transform = `transform3d(v, 0, 0)`)
```

##### End Event

This event fires when tweening has reached the `end` value.  All tweening is complete when this event is fired.

```javascript
new Tweezer({
  start: 0,
  end: 9000
})
.on('done', v => alert('All Done!'))
```

### Begin the Tween

To start tweening, just run the `begin()` method.

### Stopping the Tween

If you'd like to stop tweening for whatever reason, call the `stop` method. This will reset everything and cancel the animation frame from firing.

## Browser Support

Tweezer.js depends on the following browser APIs:

* [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

Consequently, it supports the following natively:

* Chrome 24+
* Firefox 23+
* Safari 6.1+
* Opera 15+
* IE 10+
* iOS Safari 7.1+
* Android Browser 4.4+

To add support for older browsers, consider including [polyfills/shims](https://gist.github.com/paulirish/1579671) for the APIs listed above. There are no plans to include any in the library, in the interest of file size.

## What is Tweening?

A tween is when you animate something with some kind of [easing](http://easings.net/). Any time you want to animate something smoothly with JS, you need to tween it. For example, you can tween count-up-buttons, smooth scrolling, and the height of elements. Instead of requiring libraries for all of these same functions, you can use this library as a utility to build out these examples.

## License

[MIT](https://github.com/jaxgeller/tweezer.js/blob/master/LICENSE). © 2017 Jackson Geller

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
