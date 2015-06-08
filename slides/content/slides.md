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

1. WebPack
1. Babel
1. ES2015

* Work together through examples

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

* Create a `lab2` directory
* Create a `webpack.config.js`

---

# First `webpack.config.js`

```js
module.exports = {
  entry: {
    index: "./js/index.js"
  },
  output: {
    path: "./dist",
    filename: "bundle.js"
  }
};
```

* Easy so far
* Path, and filename, sure, but what's an `entry`?

???

Entries are places you start loading an app from

---

# Multiple Entries

```js
module.exports = {
  entry: {
    index: "./js/index.js",
    foo: "./js/bar.js"
  }
  output: {
    path: "./dist",
    filename: "bundle.js"
  }
};
```
* Can pass an object of name/path pairs if you want multiples
* Can also just do an array if you don't need multiple bundles

---
# First entry file

* Write in commonjs, or AMD out of the gate

--

```js
// js/index.js

console.log("obligatory hello world");
```

* Create `js/index.js`

---

# Dependencies

```js
var Camelot = function() {
  console.log("On second thought, let's not go to Camelot. Tis' a silly place...");
};

module.exports = Camelot;
```

* Create `js/camelot.js`

---

# require

```js
// js/index.js
var Camelot = require("./camelot.js");

var camelot = new Camelot();
```

* You can import other files with `require`

---

# Run webpack

```shell
webpack
```

* Should get a bundled file at `dist/bundle.js`

---
class: center, middle

# yaaaay

![](images/rejoicing.gif)

---

# Loader's

* WebPack is an all the things bundler
* Use loaders to bring in bundle file types through different loaders

---

# Loader's

```js
module: {
  loaders: [{
    test: /\.scss$/,
    loader: "style!css!sass"
  }]
}
```

* The `test` looks for `scss`
* Goes through the `sass-loader`, the `css-loader`, and the `style-loader` (explain shortly)
* Tons of loaders (coffee, less, handlebars, etc)

---

# Install loader

```shell
npm install style-loader css-loader sass-loader
```

* Install a few modules

---

# Create a stylesheet

```css
body {
  background: red;
}
```

* Create `sass/app.scss`

---

# Here's the crazy part

```js
// js/index.js
require("../sass/app.scss");

var Camelot = require("./camelot.js");

var camelot = new Camelot();
```

---

class: center, middle

# Sad?

![](images/sad.gif)

---

class: center, middle

# It's cool, you get used to it...

---

# Style Loader

* Starts at `sass-loader`, which compiles to css
* `css-loader` accepts css
* Sends to `style-loader`
* Inlines the styles
* Ala [instagram](https://www.youtube.com/watch?v=VkTCL6Nqm6Y)

---

# Like `<link />`?

```js
loaders: [{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
}]
```

* Can also use the [Extract Text](https://github.com/webpack/extract-text-webpack-plugin) plugin

---

# WebPack Watch

* Can run `webpack --watch` to compile as you change things

---

# Let's see it so far

```html
<!DOCTYPE html>
<html>
<body>
  <script src="dist/bundle.js"></script>
</body>
</html>
```

---

# Library Target

```
output: {
  libraryTarget: "commonjs" // for node
}
```

* AMD, UMD, CommonJS, CommonJS2, and Var (default).
* Not doing this, just worth knowing

???

* Switch lab2 to commonjs and run with node

---

# Plugins

* Lots of different WebPack plugins
* Help extract styles, common code, etc

---

# CommonsChunk

```js
var path = require("path"),
    webpack = require("webpack");

module.exports = {
  entry: {
    common: [] // Could start w/ jquery, underscore, etc,
    index: "./js/index",
    arthur: "./js/arthur"
  },
```

* `npm install webpack`
* Add a new files `js/arthur`  
* Add it and a common to entries
* Can include all vendor files

---

# CommonsChunk

```js
  output: {
    path: "./dist",
    filename: "[name].js"
  },
```
* `[name]` inserts the entry name and creates a file

---

# CommonsChunk

```js
  plugins: [new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    minChunks: 2
  })]
};

```

* Add to bottom
* 2 or more uses adds to common

---

# Should look like this now...

```js
var path = require("path"),
    webpack = require("webpack");

module.exports = {
  entry: {
    common: [],
    index: "./js/index",
    arthur: "./js/arthur"
  },
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: "style!css!sass"
    }]
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    minChunks: 2
  })]
};

```

---

#

---

class: center, middle

# ES6/2015

---
class: left

# ES6/2015

* We've been stuck in ES5 since 2009
* ES6 has been a long process
* Technically it's now ES2015

---

# ES2015 things to cover

* Classes
* Modules
* Arrow Methods
* Let, Const, var
* Default Function Args
* Splats
* Destructuring
* Destructuring in functions
* Template Strings

---

# ES2015 things to cover

* Going to go over those a bit
* Then we'll build a small pub/sub module called `Camelot`

---

# Babel

* [Babel](http://babeljs.io) is a "transpiler"
* Transpiles ES6 to ES5 for browser support
* You can use a WebPack loader!

---

# Babel Loader

```shell
npm install --save-dev babel-loader
```

* Install it first

---

# Babel Loader

```js
module: {
  loaders: [{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: "babel?stage=0"
  }]
}
```

* Looks for all JS except modules
* Can pass query params to all loaders
* Allows for ALL ES6 and ES7 features with `stage=0`

---

# Instructions

```js
var path = require("path");

module.exports = {
  entry: {
    app: "app"
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel?stage=0"
    }]
  }
};
```

* Create new lab folder, copy existing `webpack.config.js` and modify
* Add an `app.js` file, and we'll come back to it shortly

---

# Current way of functions

```js
// u = 3fa
var calculateVelocityOfSwallow = function(type) {
  var strouhal = .3,
      amplitude = .22,
      frequency = 15,
      velocity = 0;

  if (type === "african") {
    frequency = 18;
  } else if (type === "european") {
    frequency = 15;
  }

  velocity = strouhal * frequency * amplitude;

  return velocity;
};
```

* How we do things now...

---

# New variable types

```js
// u = 3fa
var calculateVelocityOfSwallow = function(type = "african") {
  const strouhal = .3,
    amplitude = .22;

  let frequency = 15;

  if (type === "african") {
    frequency = 18;
  } else if (type === "european") {
    frequency = 15;
  }

  let velocity = strouhal * frequency * amplitude;

  return velocity;
};
```

* Use `const` when you know a value won't change
* Use `let` for everything though
* Use `var` sparingly and only for legacy applications
* No more hoisting, hurray!
* Source for [airspeed velocity](http://style.org/unladenswallow/)

---

# Arrow Functions

```js
let calculateVelocityOfSwallow = (type = "african") => {
  // ...
};
```

* Or

```js
setTimeout(() => console.log("1 second later..."), 1000);
```

* Don't need `{}` if it's a 1 liner, implicit return
* Automatically assigns `this`
* `type` defaults to "african"

---

# Object Keys

```js
let url = "/foo",
    timeout = 300;

let options = { url, timeout }; // { url: url, timeout: timeout }
```

* If you're using the same key as a value, just ignore the value

---

# Dynamic Object Keys

```js
let topic = {
  "topic_" + Math.random() * 100: "foo"
};
```

* Can have a dynamic key now

---

# Destructuring

```js
let options = {
  url: "/foo",
  timeout: 100
};

let { url, timeout } = options;

setTimeout(() => {
  $.ajax({
    url
  });
}, timeout);
```

* You "destructure" the object into variables

---

# Destructuring in function params

```js
let API = {};

API.get = ({ url, timeout } = { timeout: 0 } ) => {
  // ...
};

API.get({
  url: "/foo"
});
```

* Set `url` and `timeout` variables based on an object
* Default the `timeout` to 0

---

# Spat, and Rest

```js
// js/camelot.js
trigger(name, ...args) {
  // ...
}
```
```js
let camelot = new Camelot();

camelot.trigger("eat.ham", { jam: "jam" });

// or

camelot.trigger("eat.ham", "and", "jam", "and", "spam" });
// name="eat.ham" args = ["jam", "and", "spam"]
```

* The `...args` is called a *rest* parameter
* Everything after "and", comes in as an array
---

# `class`

```js
// old way
function Emitter() {}

Emitter.prototype.on = function() {
  // ...
};

module.exports = Emitter;
```

* Use the `prototype` to add methods

---

# `class`

```js
// old way
class Emitter {
  constructor() {

  }
  on(name, fn, opts = {}) {}
  off(name, fn, opts = {}) {}
  trigger(name, ...args) {} // we'll get to the "..."
}

module.exports = Emitter;
```

* Sugar for adding things to the prototype
* No colons either
* Add this code to `js/emitter.js`

---

# `class` inheritance

```js
class Camelot extends Emitter {
  constructor() {
    this.on("arrival", this.eatHam);
  }
  eatHam() {
    console.log("We eat ham and jam and spam a lot.");
  }
}
```

* Use the `extends` keyword to inherit from the `Emitter`
* Can use `super` to call inherited methods if overrides are needed
* Create a new file called `js/camelot.js` and add that code
---

# ES6 Modules

```js
class Emitter {
  // ...
}

export default Emitter;
```

* `default` keyword sets what happens when you `import` this module
* Most common way to export, but there are others
* Go back and add default export to `js/emitter`

---

# `import`

```js
import Emitter from "./utils/emitter";

class Camelot extends Emitter {

}

export default Camelot;
```

* Use `import` to import the module in `js/camelot`
* Export `Camelot` as default

---

# Other types of exports

```js
export function swallow () {

};

export function shrubbery() {

};
```

* Still have to use old `function` here

---

# Back in app

```js
import Camelot from "./camelot";

let camelot = new Camelot();

console.log("on second thought...");
```

* Add all this code to `app.js`
* Run `webpack`

---
