/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _camelot = __webpack_require__(1);

	var _camelot2 = _interopRequireDefault(_camelot);

	var Events = new _camelot2["default"]();
	var first = function first(_ref) {
	  var name = _ref.name;
	  return "foo " + name;
	};
	Events.on("foo", first);
	Events.on("foo", function (_ref2) {
	  var name = _ref2.name;
	  return "bar " + name;
	});
	Events.on("foo", function (_ref3) {
	  var name = _ref3.name;
	  return "baz " + name;
	});
	Events.on("bar", function (_ref4) {
	  var name = _ref4.name;
	  return console.log("bazinga " + name);
	});
	Events.on("baz", function (name, address) {
	  return console.log("" + name + ": " + address);
	});

	Events.before("bar", function () {
	  return console.log("before");
	});
	Events.after("bar", function (results) {
	  return console.log("after", results);
	});

	Promise.all(Events.trigger("foo", { name: "bazinga" })).then(function (values) {
	  console.log(values);

	  // Events.off("foo", first);

	  //Events.off("foo");

	  //console.log(Events.topics);
	});

	Events.trigger("bar", { name: "foo" });
	Events.trigger("baz", "jonathan", 37179);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _emitter = __webpack_require__(2);

	var _emitter2 = _interopRequireDefault(_emitter);

	var Camelot = (function (_Emitter) {
	  function Camelot() {
	    _classCallCheck(this, Camelot);

	    if (_Emitter != null) {
	      _Emitter.apply(this, arguments);
	    }
	  }

	  _inherits(Camelot, _Emitter);

	  _createClass(Camelot, [{
	    key: "eatHam",
	    value: function eatHam() {}
	  }]);

	  return Camelot;
	})(_emitter2["default"]);

	exports["default"] = Camelot;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Topic = function Topic(_ref) {
	  var topic = _ref.topic;
	  var fn = _ref.fn;
	  var _ref$opts = _ref.opts;
	  var opts = _ref$opts === undefined ? {} : _ref$opts;

	  _classCallCheck(this, Topic);

	  this.topic = topic;
	  this.fn = fn;
	  this.opts = opts;
	};

	var Emitter = (function () {
	  function Emitter() {
	    _classCallCheck(this, Emitter);

	    this.topics = new Map();
	    this.befores = new Map();
	    this.afters = new Map();
	  }

	  _createClass(Emitter, [{
	    key: "before",
	    value: function before(name, fn) {
	      this.befores.set(name, fn);
	    }
	  }, {
	    key: "after",
	    value: function after(name, fn) {
	      this.afters.set(name, fn);
	    }
	  }, {
	    key: "on",
	    value: function on(name, fn) {
	      var _ref2 = arguments[2] === undefined ? { context: window } : arguments[2];

	      var context = _ref2.context;

	      var set = undefined;

	      if (!(set = this.topics.get(name))) {
	        set = new Set();
	        this.topics.set(name, set);
	      }

	      var topic = new Topic({
	        topic: "t_" + set.size,
	        fn: fn, opts: opts, context: context
	      });

	      set.add(topic);
	    }
	  }, {
	    key: "off",
	    value: function off(name, fn) {
	      if (!name && !fn) {
	        return this.topics.clear();
	      } else if (!fn) {
	        return this.topics["delete"](name);
	      }

	      var topics = this.topics.get(name);
	      var remove = (function () {
	        var _remove = [];
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = topics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var topic = _step.value;

	            if (fn === topic.fn) {
	              _remove.push(topic);
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator["return"]) {
	              _iterator["return"]();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        return _remove;
	      })();
	      remove.forEach(function (t) {
	        return topics["delete"](t);
	      });
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(name, data) {
	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }

	      var _this = this;

	      var topics = (function () {
	        var _topics = [];
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = _this.topics.get(name)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var topic = _step2.value;

	            _topics.push({ context: topic.context, fn: topic.fn });
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
	              _iterator2["return"]();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }

	        return _topics;
	      })();

	      if (args.length) args.unshift(data);else args = [data];

	      var results = (function () {
	        var _results = [];
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          var _loop = function () {
	            var topic = _step3.value;

	            _results.push(new Promise(function (resolve) {
	              setTimeout(function () {
	                var before = _this.befores.get(name);
	                if (before) before.apply(topic.context, args);

	                var result = topic.fn.apply(topic.context, args);

	                resolve(result);
	              }, 0);
	            }));
	          };

	          for (var _iterator3 = topics[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            _loop();
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
	              _iterator3["return"]();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }

	        return _results;
	      })();

	      var after = this.afters.get(name);
	      if (after) Promise.all(results).then(function (r) {
	        return after(r);
	      });

	      return results;
	    }
	  }]);

	  return Emitter;
	})();

	exports["default"] = Emitter;
	module.exports = exports["default"];

/***/ }
/******/ ]);