name: intro
class: center, middle

# ES2015 + WebPack
## The search for the holy grail

<img src="images/grail.jpg" style="width: 20em" />

Slides if you want to cheat... http://bit.ly/webpack-es6-lab

---
class: center, middle

# There are some...

![](images/callme.gif)

---
name: whoami
class: left

# whoami

* Jonathan Creamer
* Senior Front End Developer at Lonely Planet

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

# It's all about the bundles

* [WebPack](http://http://webpack.github.io/) bundles things, lots of things

--

* &#10003; JS

--

* &#10003; CSS, LESS, SASS, SCSS

--

* &#10003; Handlebars

--

* &#10003; Images

--

* &#10003; .......


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
* Break apart your assets into separate bundles
* Put all this content in `webpack.config.js`

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

---
# First entry file

* Write in commonjs, or AMD out of the gate
* We'll do commonjs

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
  console.log("On second thought, let's not go to Camelot. 'Tis a silly place...");
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

# WebPack Watch

* Can run `webpack --watch` to compile as you change things

---
class: center, middle

# yaaaay

![](images/rejoicing.gif)

---

# Loaders

* WebPack is an all the things bundler
* Use loaders to bring in and bundle different kinds of files types

---
class: center, middle

# Loaders

---

# Loaders

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
* Go ahead and add this to your webpack config

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
  background: #ccc;
}
```

* Create `sass/app.scss`

---

# Here's the crazy part

```js
// js/index.js
require("../sass/app.scss");

var Camelot = require("./camelot");

var camelot = new Camelot();
```

* require css in my js file?!
* Now run `webpack`
* You might be sad...

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
* A la [instagram](https://www.youtube.com/watch?v=VkTCL6Nqm6Y)

---

# Like `<link />`?

```js
loaders: [{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
}]
```

* Can also use the [Extract Text](https://github.com/webpack/extract-text-webpack-plugin) plugin
* Will generate a css file per entry

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

* Create an `index.html` file
* It won't be pretty, but it should work eh?

---
class: center, middle


# More options and plugins

---

# Alias

```js
resolve: {
  alias: {
    backbone: "/path/to/backbone.js"
  }
}
```

* Can set up alias'

---

# debug

```js
debug: true,
devtool: "eval"
```

* Shows debug information
* `eval`, `source-map`, `hidden-source-map`, and several others

---

# Library Target

```
output: {
  libraryTarget: "commonjs" // for node
}
```

* AMD, UMD, CommonJS, CommonJS2, and Var (default).

???

* Switch lab2 to commonjs and run with node

---
class: center, middle

# How I feel when I write commonjs code that gets transpiled to AMD...


![](images/newt.gif)

---

# Plugins

* Lots of different WebPack plugins
* Help extract styles, common code, uglify, ngmin, etc
* Here's the [list](http://webpack.github.io/docs/list-of-plugins.html)

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
* Can include vendor modules

---

# arthur.js

```js
var Camelot = require("./camelot");

module.exports = function() {
  console.log("Arthur king of the Britains");
};
```

* Add that content to `js/arthur.js`

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

* Add to bottom of webpack config
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

# Try it!

* Run `webpack` and hope for the best...

---
class: center, middle

# yaaaay

![](images/rejoicing.gif)

---

# So much more!


* This hopefully peaks your interest
* So much more you can do
* Chunking, uglifying, dependency injection, localization, etc

---

class: center, middle

# ES6/2015

---
class: left

# ES6/2015

* We've been stuck in ES5 since 2009
* ES6 has been a long process
* Originally ESHarmony after ES5
* Technically it's now [ES2015](https://esdiscuss.org/topic/javascript-2015)

---

# ES2015 things to cover

* Classes
* Modules
* Arrow Functions
* Let, Const, var
* Default Function Args
* Splats
* Destructuring
* Destructuring in functions
* Comprehensions
* Template Strings
* There's even [more](https://github.com/lukehoban/es6features), but only these today!

---

# ES2015 things to cover

* Going to go over those a bit
* Then we'll build a small pub/sub module called `Camelot`

---
class: center, middle

# So what, it's not like I can use it in IE...

![](images/oneday.gif)

---

# Babel

* [Babel](http://babeljs.io) is a "transpiler"
* "Transpiles" ES6 to ES5 for browser support
* Best part, you can use a WebPack loader!
* [Try it!](https://babeljs.io/repl/)


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
* Can pass query params to all loaders to set options
* Allows for ALL ES6 and ES7 features with `stage=0`

---

# Instructions

```js
var path = require("path");

module.exports = {
  entry: {
    app: "./js/app"
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
      velocity = 0,
      frequency;

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
* No "block scope"
* Everything gets hoisted anyways so we declare stuff up top
* Source for [airspeed velocity](http://style.org/unladenswallow/)

---

# New variable types

```js
// u = 3fa
let calculateVelocityOfSwallow = function(type = "african") {
  const strouhal = .3,
        amplitude = .22;

  let frequency = null;

  if (type === "african") {
    frequency = 18;
  } else if (type === "european") {
    frequency = 15;
  } else {
    let message = "We're only talking about swallows here, not " + type;
    throw message;
  }

  let velocity = strouhal * frequency * amplitude;

  return velocity;
};
```

* Use `const` when you know a value won't change
* Use `let` for everything though
* Use `var` sparingly and only for legacy applications

---
class: center, middle

# Swallows...

![](images/swallows.gif)

---

# `for`

```js
for (let i = 0; i < swallowCount; i++) {
  // ...
}
i; // undefined
```

* There's now block scope
* Can declare variables inside `if`, `for`, `while`, etc.
* The `i` is defined only for the loop

---

# Arrow Functions
```js
setTimeout(() => console.log("1 second later..."), 1000);
```

* Don't need `{}` if it's a 1 liner, implicit return
* Automatically assigns `this`

---

# Default Parameters!

```js
let calculateVelocityOfSwallow = (type = "african") => {
  // ...
};
```

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

# Destructuring

```js
let options = {
  url: "/foo",
  timeout: 100
};

// ...

let { url, timeout } = options;

setTimeout(() => {
  $.ajax({
    url
  });
}, timeout);
```

* This one can be mind blowing
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

# String Templates

```js
let king = "Arthur";

console.log(`I am ${king}. King of the Britains!`);
```

* No more string concatenation!

---
class: center, middle

# Let's try out some stuff

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
// mo betta way
class Emitter {
  constructor() {
    this.topics = {};  
  }
  on(name, fn, { context } = {}) {}
  off(name, fn, opts = {}) {}
  trigger(name, ...args) {}
}

module.exports = Emitter;
```

* Sugar for adding things to the prototype
* No colons either
* Constructor runs when you use `new`
* Add this code to `js/emitter.js`

---
class: center, middle

# You mean I don't have to deal with prototypes anymore??

![](images/mercy.gif)

---

# Rest parameter
```js
trigger(name, ...args) {}
```

```js
let emitter = new Emitter();

emitter.trigger("eat.ham", { jam: "jam" });
// name="eat.ham" args = [{ jam: "jam" }]

emitter.trigger("eat.ham", "and", "jam", "and", "spam" });
// name="eat.ham" args = ["and", "jam", "and", "spam"]
```

* The `...args` is called a *rest* parameter
* Everything after "and", comes in as an array

---

# `on`

```js
on(name, fn, { context } = {}) {
  let topics = this.topics[name] = this.topics[name] || [];

  topics.push({
    topic: `t_${Object.keys(topics).length + 1}`,
    fn, context
  });
}
```

* Let's implement the `on` method in the emitter

---

# `class` inheritance

```js
class Camelot extends Emitter {
  constructor() {
    super();

    this.on("arrival", this.eatHam, { context: this });
  }
  eatHam() {
    console.log("We eat ham and jam and spam a lot.");
  }
}
```

* Have to call `super` to call the `Emitter`'s constructor first
* Use the `extends` keyword to inherit from the `Emitter`
* Can use `super` to call inherited methods if overrides are needed
* Create a new file called `js/camelot.js` and add that code
---

# Comprehensions

```js
trigger(name, ...args) {
  let results = this.topics[name]
    .filter((topic) => topic.fn)
    .map((topic) => topic.fn.apply(topic.context, args));
  });
}
```

* With Comprehensions...

```js
trigger(name, ...args) {
  let topics = this.topics[name];

  let results = [for (topic of topics)
    if (topic.fn) topic.fn.apply(topic.context, args)];

  return results;
}
```

* **NOTE:** This is experimental, but really fun...
* Can iterate something and return an array
* More on [Comprehensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions)
* Add this to `js/emitter`

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
import Emitter from "./emitter";

class Camelot extends Emitter {

}

export default Camelot;
```

* Use `import` to import the module in `js/camelot`
* Export `Camelot` as default

---

# Other types of exports

```js
// ni.js
export function swallow () {

};

export default function shrubbery() {

};
```

* Still have to use old `function` here
* A few [others](http://www.2ality.com/2014/09/es6-modules-final.html) too...
* Mix defaults too

```js
import { swallow } from "./ni.js";
```

* Use destructuring to import

---

# Back in app

```js
import Camelot from "./camelot";

var camelot = new Camelot();
camelot.trigger("arrival");

```

* Add all this code to `app.js`
* Add `libraryTarget: "commonjs"`
* Run `webpack`, then `node dist/app`

---
class: center, middle

# Done

![](images/silly_place.gif)

---

# Contact me!

* We do Rails, Grunt, WebPack, ES6.
* Would love to chat about code, or if you want a job, talk to me!
* [@jcreamer898](http://twitter.com/jcreamer898)
* [@lplabs](http://twitter.com/lplabs)
* [@lonelyplanet](http://twitter.com/lonelyplanet)
* [jonathan.creamer@lonelyplanet.com](mailto:jonathan.creamer@lonelyplanet.com)
* http://bit.ly/webpack-es6-lab
