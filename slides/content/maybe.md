# Improve the config

```js
var path = require("path");
//...
resolve: {
  root: path.join(__dirname, "js")
}
```

* The resolve option configures how webpack loads modules
* Root tells webpack where your modules load from, so can just...

```js
var camelot = require("camelot");
```

* Change your entry now though too

```
entry: ["./js/index"]
```

---

# Context

```js
context: "./js",
entry: ['./index.js'],
```

* If you have a relative path to an entry
* Context sets the path it's relative to

---

# So far...

```js
var path = require("path");

module.exports = {
  context: "./js",
  entry: ['index'],
  resolve: {
    extensions: [".js"],
    root: path.join(__dirname, "js")
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
};

```
