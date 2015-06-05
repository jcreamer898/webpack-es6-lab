name: intro
class: center, middle

# ES2015 + WebPack
## The search for the holy grail

<img src="images/grail.jpg" style="width: 20em" />

---
class: center, middle

# What is your name?

![](images/name.gif)

---
name: whoami
class: left

# whoami

* Jonathan Creamer
* Senior Front End Engineer at Lonely Planet

<img src="images/lonelyplanet_bw.png" style="width: 10em" />

* Love JavaScript
* Nashville, TN

---
name: agenda

# Agenda

1. ES2015
1. Getting Started with WebPack
1. Babel-Loader
1. Other Loaders

---

# ES6/2015

* We've been stuck in ES5 since 2009
* ES6 has been a long process
* Technically it's now ES2015

---

# ES2015 things to cover

* Arrow Methods
* Classes
* Modules
* Template Strings
* Destructuring
* Splats
* Default Function Args
* Destructuring in function
* Let, Const, var

---
class: center, middle

# WebPack

---
class: left

# One bundler to rule them all

* WebPack bundles things, lots of things

--

* &#10003; JS

--

* &#10003; CSS, LESS, SASS, SCSS

--

* &#10003; Handlebars

--

* &#10003; Images

---
class: center, middle
# What else can you bundle?

![](images/duck.gif)
---
class: left

# Get Started

### Node.js (or io... whatevs)

1. Best on Mac/Linux is [NVM](https://github.com/creationix/nvm)
1. Winders has it's own [exe](https://nodejs.org/)...
1. [IO.js](https://iojs.org/en/index.html) is also an option (for now)

---
# Get WebPack

```shell
npm install -g webpack
```

* `-g` installs globally
---

# Lab 1

1. Make sure node is running
1. Install WebPack

---
class: center, middle

# First thing to know...

---
class: center, middle

# You might want to...

![](images/runaway.gif)

---
class: center, middle

# But it's worth it to stick around

---
class: left

# First things first

* Create a `webpack.config.js`

---

# First `webpack.config.js`

```js
module.exports = {
  entry: ['./js/index.js'],
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
};
```

* Easy so far
* Path, and filename, sure, but what's an `entry`?

???

Entries are places you start loading an app from

---
# First entry file

* Write in commonjs, or AMD out of the gate

--

```js
// js/index.js

module.exports = function() {
  console.log("obligatory Hello world!");
};
```

* Create `js/index.js`

---

# require

```js
// js/index.js
var camelot = require("./camelot.js");

module.exports = function() {
  console.log("obligatory Hello world!");
};
```

* You can import other files with `require`
* Create `js/camelot.js`

---

# Dependencies

```js
var Camelot = function() {};

module.exports = Camelot;
```

* Put that content in `camelot.js`

---
class: center, middle

# yaaaay

![](images/rejoicing.gif)

---

# Improve the config

```js
resolve: {
  extensions: [".js"]
}
```

* Now you don't have to type `.js` in your `require`'s

```js
var camelot = require("./camelot");
```

---


---
