var Circos =
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

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _defaultsDeep = __webpack_require__(1);

	var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

	var _forEach = __webpack_require__(99);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _keys = __webpack_require__(103);

	var _keys2 = _interopRequireDefault(_keys);

	var _isArray = __webpack_require__(76);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _d3Selection = __webpack_require__(108);

	var _layout = __webpack_require__(109);

	var _layout2 = _interopRequireDefault(_layout);

	var _render2 = __webpack_require__(178);

	var _render3 = _interopRequireDefault(_render2);

	var _Text = __webpack_require__(191);

	var _Text2 = _interopRequireDefault(_Text);

	var _Highlight = __webpack_require__(288);

	var _Highlight2 = _interopRequireDefault(_Highlight);

	var _Histogram = __webpack_require__(289);

	var _Histogram2 = _interopRequireDefault(_Histogram);

	var _Chords = __webpack_require__(290);

	var _Chords2 = _interopRequireDefault(_Chords);

	var _Heatmap = __webpack_require__(292);

	var _Heatmap2 = _interopRequireDefault(_Heatmap);

	var _Line = __webpack_require__(293);

	var _Line2 = _interopRequireDefault(_Line);

	var _Scatter = __webpack_require__(294);

	var _Scatter2 = _interopRequireDefault(_Scatter);

	var _Stack = __webpack_require__(295);

	var _Stack2 = _interopRequireDefault(_Stack);

	__webpack_require__(296);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultConf = {
	  width: 700,
	  height: 700,
	  container: 'circos',
	  defaultTrackWidth: 10
	};

	var Core = function () {
	  function Core(conf) {
	    _classCallCheck(this, Core);

	    this.tracks = {};
	    this._layout = null;
	    this.conf = (0, _defaultsDeep2.default)(conf, defaultConf);
	    this.svg = (0, _d3Selection.select)(this.conf.container).append('svg');
	  }

	  _createClass(Core, [{
	    key: 'removeTracks',
	    value: function removeTracks(trackIds) {
	      var _this = this;

	      if (typeof trackIds === 'undefined') {
	        map(this.tracks, function (track, id) {
	          _this.svg.select('.' + id).remove();
	        });
	        this.tracks = {};
	      } else if (typeof trackIds === 'string') {
	        this.svg.select('.' + trackIds).remove();
	        delete this.tracks[trackIds];
	      } else if ((0, _isArray2.default)(trackIds)) {
	        (0, _forEach2.default)(trackIds, function (trackId) {
	          svg.select('.' + trackId).remove();
	          delete this.tracks[trackId];
	        });
	      } else {
	        console.warn('removeTracks received an unhandled attribute type');
	      }

	      return this;
	    }
	  }, {
	    key: 'layout',
	    value: function layout(conf, data) {
	      this._layout = new _layout2.default(conf, data);
	      return this;
	    }
	  }, {
	    key: 'chords',
	    value: function chords(id, conf, data) {
	      this.tracks[id] = new _Chords2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'heatmap',
	    value: function heatmap(id, conf, data) {
	      this.tracks[id] = new _Heatmap2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'highlight',
	    value: function highlight(id, conf, data) {
	      this.tracks[id] = new _Highlight2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'histogram',
	    value: function histogram(id, conf, data) {
	      this.tracks[id] = new _Histogram2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'line',
	    value: function line(id, conf, data) {
	      this.tracks[id] = new _Line2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'scatter',
	    value: function scatter(id, conf, data) {
	      this.tracks[id] = new _Scatter2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'stack',
	    value: function stack(id, conf, data) {
	      this.tracks[id] = new _Stack2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'text',
	    value: function text(id, conf, data) {
	      this.tracks[id] = new _Text2.default(this, conf, data);
	      return this;
	    }
	  }, {
	    key: 'render',
	    value: function render(ids, removeTracks) {
	      (0, _render3.default)(ids, removeTracks, this);
	    }
	  }]);

	  return Core;
	}();

	var Circos = function Circos(conf) {
	  var instance = new Core(conf);
	  return instance;
	};

	module.exports = Circos;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(2),
	    baseRest = __webpack_require__(3),
	    customDefaultsMerge = __webpack_require__(25),
	    mergeWith = __webpack_require__(96);

	/**
	 * This method is like `_.defaults` except that it recursively assigns
	 * default properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaults
	 * @example
	 *
	 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
	 * // => { 'a': { 'b': 2, 'c': 3 } }
	 */
	var defaultsDeep = baseRest(function(args) {
	  args.push(undefined, customDefaultsMerge);
	  return apply(mergeWith, undefined, args);
	});

	module.exports = defaultsDeep;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(4),
	    overRest = __webpack_require__(5),
	    setToString = __webpack_require__(6);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(2);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(7),
	    shortOut = __webpack_require__(24);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(8),
	    defineProperty = __webpack_require__(9),
	    identity = __webpack_require__(4);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(11),
	    getValue = __webpack_require__(23);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(12),
	    isMasked = __webpack_require__(20),
	    isObject = __webpack_require__(19),
	    toSource = __webpack_require__(22);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    isObject = __webpack_require__(19);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(14),
	    getRawTag = __webpack_require__(17),
	    objectToString = __webpack_require__(18);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(15);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(16);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(14);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(21);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(15);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(26),
	    isObject = __webpack_require__(19);

	/**
	 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
	 * objects into destination objects that are passed thru.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to merge.
	 * @param {Object} object The parent object of `objValue`.
	 * @param {Object} source The parent object of `srcValue`.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 * @returns {*} Returns the value to assign.
	 */
	function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
	  if (isObject(objValue) && isObject(srcValue)) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, objValue);
	    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
	    stack['delete'](srcValue);
	  }
	  return objValue;
	}

	module.exports = customDefaultsMerge;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(27),
	    assignMergeValue = __webpack_require__(57),
	    baseFor = __webpack_require__(59),
	    baseMergeDeep = __webpack_require__(61),
	    isObject = __webpack_require__(19),
	    keysIn = __webpack_require__(90);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	module.exports = baseMerge;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(28),
	    stackClear = __webpack_require__(36),
	    stackDelete = __webpack_require__(37),
	    stackGet = __webpack_require__(38),
	    stackHas = __webpack_require__(39),
	    stackSet = __webpack_require__(40);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(29),
	    listCacheDelete = __webpack_require__(30),
	    listCacheGet = __webpack_require__(33),
	    listCacheHas = __webpack_require__(34),
	    listCacheSet = __webpack_require__(35);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(32);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(31);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(28);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(28),
	    Map = __webpack_require__(41),
	    MapCache = __webpack_require__(42);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(43),
	    mapCacheDelete = __webpack_require__(51),
	    mapCacheGet = __webpack_require__(54),
	    mapCacheHas = __webpack_require__(55),
	    mapCacheSet = __webpack_require__(56);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(44),
	    ListCache = __webpack_require__(28),
	    Map = __webpack_require__(41);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(45),
	    hashDelete = __webpack_require__(47),
	    hashGet = __webpack_require__(48),
	    hashHas = __webpack_require__(49),
	    hashSet = __webpack_require__(50);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(46);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(46);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(46);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(46);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(52);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(53);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(52);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(52);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(52);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(58),
	    eq = __webpack_require__(32);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(9);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(60);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(57),
	    cloneBuffer = __webpack_require__(62),
	    cloneTypedArray = __webpack_require__(64),
	    copyArray = __webpack_require__(67),
	    initCloneObject = __webpack_require__(68),
	    isArguments = __webpack_require__(73),
	    isArray = __webpack_require__(76),
	    isArrayLikeObject = __webpack_require__(77),
	    isBuffer = __webpack_require__(80),
	    isFunction = __webpack_require__(12),
	    isObject = __webpack_require__(19),
	    isPlainObject = __webpack_require__(82),
	    isTypedArray = __webpack_require__(83),
	    toPlainObject = __webpack_require__(87);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(15);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(65);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(66);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(15);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(69),
	    getPrototype = __webpack_require__(70),
	    isPrototype = __webpack_require__(72);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(71);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(74),
	    isObjectLike = __webpack_require__(75);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    isObjectLike = __webpack_require__(75);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(78),
	    isObjectLike = __webpack_require__(75);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(12),
	    isLength = __webpack_require__(79);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(15),
	    stubFalse = __webpack_require__(81);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    getPrototype = __webpack_require__(70),
	    isObjectLike = __webpack_require__(75);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(84),
	    baseUnary = __webpack_require__(85),
	    nodeUtil = __webpack_require__(86);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    isLength = __webpack_require__(79),
	    isObjectLike = __webpack_require__(75);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(16);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(88),
	    keysIn = __webpack_require__(90);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(89),
	    baseAssignValue = __webpack_require__(58);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(58),
	    eq = __webpack_require__(32);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(91),
	    baseKeysIn = __webpack_require__(94),
	    isArrayLike = __webpack_require__(78);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(92),
	    isArguments = __webpack_require__(73),
	    isArray = __webpack_require__(76),
	    isBuffer = __webpack_require__(80),
	    isIndex = __webpack_require__(93),
	    isTypedArray = __webpack_require__(83);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19),
	    isPrototype = __webpack_require__(72),
	    nativeKeysIn = __webpack_require__(95);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(26),
	    createAssigner = __webpack_require__(97);

	/**
	 * This method is like `_.merge` except that it accepts `customizer` which
	 * is invoked to produce the merged values of the destination and source
	 * properties. If `customizer` returns `undefined`, merging is handled by the
	 * method instead. The `customizer` is invoked with six arguments:
	 * (objValue, srcValue, key, object, source, stack).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   if (_.isArray(objValue)) {
	 *     return objValue.concat(srcValue);
	 *   }
	 * }
	 *
	 * var object = { 'a': [1], 'b': [2] };
	 * var other = { 'a': [3], 'b': [4] };
	 *
	 * _.mergeWith(object, other, customizer);
	 * // => { 'a': [1, 3], 'b': [2, 4] }
	 */
	var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
	  baseMerge(object, source, srcIndex, customizer);
	});

	module.exports = mergeWith;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(3),
	    isIterateeCall = __webpack_require__(98);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(32),
	    isArrayLike = __webpack_require__(78),
	    isIndex = __webpack_require__(93),
	    isObject = __webpack_require__(19);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(100),
	    baseEach = __webpack_require__(101),
	    castFunction = __webpack_require__(107),
	    isArray = __webpack_require__(76);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(102),
	    createBaseEach = __webpack_require__(106);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(59),
	    keys = __webpack_require__(103);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(91),
	    baseKeys = __webpack_require__(104),
	    isArrayLike = __webpack_require__(78);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(72),
	    nativeKeys = __webpack_require__(105);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(71);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(78);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(4);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = castFunction;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-selection/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var xhtml = "http://www.w3.org/1999/xhtml";

	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};

	var namespace = function(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	};

	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}

	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}

	var creator = function(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	};

	var nextId = 0;

	function local() {
	  return new Local;
	}

	function Local() {
	  this._ = "@" + (++nextId).toString(36);
	}

	Local.prototype = local.prototype = {
	  constructor: Local,
	  get: function(node) {
	    var id = this._;
	    while (!(id in node)) if (!(node = node.parentNode)) return;
	    return node[id];
	  },
	  set: function(node, value) {
	    return node[this._] = value;
	  },
	  remove: function(node) {
	    return this._ in node && delete node[this._];
	  },
	  toString: function() {
	    return this._;
	  }
	};

	var matcher = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};

	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector
	        || element.msMatchesSelector
	        || element.mozMatchesSelector
	        || element.oMatchesSelector;
	    matcher = function(selector) {
	      return function() {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}

	var matcher$1 = matcher;

	var filterEvents = {};

	exports.event = null;

	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}

	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}

	function contextListener(listener, index, group) {
	  return function(event1) {
	    var event0 = exports.event; // Events can be reentrant (e.g., focus).
	    exports.event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      exports.event = event0;
	    }
	  };
	}

	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}

	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}

	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}

	var selection_on = function(typename, value, capture) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }

	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	};

	function customEvent(event1, listener, that, args) {
	  var event0 = exports.event;
	  event1.sourceEvent = exports.event;
	  exports.event = event1;
	  try {
	    return listener.apply(that, args);
	  } finally {
	    exports.event = event0;
	  }
	}

	var sourceEvent = function() {
	  var current = exports.event, source;
	  while (source = current.sourceEvent) current = source;
	  return current;
	};

	var point = function(node, event) {
	  var svg = node.ownerSVGElement || node;

	  if (svg.createSVGPoint) {
	    var point = svg.createSVGPoint();
	    point.x = event.clientX, point.y = event.clientY;
	    point = point.matrixTransform(node.getScreenCTM().inverse());
	    return [point.x, point.y];
	  }

	  var rect = node.getBoundingClientRect();
	  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	};

	var mouse = function(node) {
	  var event = sourceEvent();
	  if (event.changedTouches) event = event.changedTouches[0];
	  return point(node, event);
	};

	function none() {}

	var selector = function(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	};

	var selection_select = function(select) {
	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	};

	function empty() {
	  return [];
	}

	var selectorAll = function(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	};

	var selection_selectAll = function(select) {
	  if (typeof select !== "function") select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, parents);
	};

	var selection_filter = function(match) {
	  if (typeof match !== "function") match = matcher$1(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	};

	var sparse = function(update) {
	  return new Array(update.length);
	};

	var selection_enter = function() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	};

	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}

	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};

	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};

	var keyPrefix = "$"; // Protect against keys like “__proto__”.

	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;

	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}

	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;

	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}

	var selection_data = function(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }

	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") value = constant(value);

	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);

	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	};

	var selection_exit = function() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	};

	var selection_merge = function(selection) {

	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Selection(merges, this._parents);
	};

	var selection_order = function() {

	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }

	  return this;
	};

	var selection_sort = function(compare) {
	  if (!compare) compare = ascending;

	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }

	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }

	  return new Selection(sortgroups, this._parents).order();
	};

	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	var selection_call = function() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	};

	var selection_nodes = function() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	};

	var selection_node = function() {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }

	  return null;
	};

	var selection_size = function() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	};

	var selection_empty = function() {
	  return !this.node();
	};

	var selection_each = function(callback) {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }

	  return this;
	};

	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}

	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}

	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}

	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}

	var selection_attr = function(name, value) {
	  var fullname = namespace(name);

	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }

	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	};

	var defaultView = function(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	};

	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}

	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}

	var selection_style = function(name, value, priority) {
	  var node;
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : defaultView(node = this.node())
	          .getComputedStyle(node, null)
	          .getPropertyValue(name);
	};

	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}

	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}

	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}

	var selection_property = function(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	};

	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}

	function classList(node) {
	  return node.classList || new ClassList(node);
	}

	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}

	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};

	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}

	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}

	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}

	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}

	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}

	var selection_classed = function(name, value) {
	  var names = classArray(name + "");

	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }

	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	};

	function textRemove() {
	  this.textContent = "";
	}

	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}

	var selection_text = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	};

	function htmlRemove() {
	  this.innerHTML = "";
	}

	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}

	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}

	var selection_html = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	};

	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}

	var selection_raise = function() {
	  return this.each(raise);
	};

	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}

	var selection_lower = function() {
	  return this.each(lower);
	};

	var selection_append = function(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	};

	function constantNull() {
	  return null;
	}

	var selection_insert = function(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	};

	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}

	var selection_remove = function() {
	  return this.each(remove);
	};

	var selection_datum = function(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	};

	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;

	  if (event) {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }

	  node.dispatchEvent(event);
	}

	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}

	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}

	var selection_dispatch = function(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	};

	var root = [null];

	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}

	function selection() {
	  return new Selection([[document.documentElement]], root);
	}

	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};

	var select = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	};

	var selectAll = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection([selector == null ? [] : selector], root);
	};

	var touch = function(node, touches, identifier) {
	  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

	  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	    if ((touch = touches[i]).identifier === identifier) {
	      return point(node, touch);
	    }
	  }

	  return null;
	};

	var touches = function(node, touches) {
	  if (touches == null) touches = sourceEvent().touches;

	  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
	    points[i] = point(node, touches[i]);
	  }

	  return points;
	};

	exports.creator = creator;
	exports.local = local;
	exports.matcher = matcher$1;
	exports.mouse = mouse;
	exports.namespace = namespace;
	exports.namespaces = namespaces;
	exports.select = select;
	exports.selectAll = selectAll;
	exports.selection = selection;
	exports.selector = selector;
	exports.selectorAll = selectorAll;
	exports.touch = touch;
	exports.touches = touches;
	exports.window = defaultView;
	exports.customEvent = customEvent;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cloneDeep = __webpack_require__(110);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _defaultsDeep = __webpack_require__(1);

	var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

	var _reduce = __webpack_require__(141);

	var _reduce2 = _interopRequireDefault(_reduce);

	var _forEach = __webpack_require__(99);

	var _forEach2 = _interopRequireDefault(_forEach);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var logger = console;
	var defaultConf = {
	  innerRadius: 250,
	  outerRadius: 300,
	  cornerRadius: 5,
	  gap: 0.04, // in radian
	  opacity: 1,
	  labels: {
	    position: 'center',
	    display: true,
	    size: 14,
	    color: '#000',
	    radialOffset: 20
	  },
	  ticks: {
	    display: true,
	    color: 'grey',
	    spacing: 10000000,
	    labels: true,
	    labelSpacing: 10,
	    labelSuffix: 'Mb',
	    labelDenominator: 1000000,
	    labelDisplay0: true,
	    labelSize: 10,
	    labelColor: '#000',
	    labelFont: 'default',
	    majorSpacing: 5,
	    size: {
	      minor: 2,
	      major: 5
	    }
	  },
	  onClick: null,
	  onMouseOver: null,
	  zIndex: 100
	};

	var Layout = function () {
	  function Layout(conf, data) {
	    var _this = this;

	    _classCallCheck(this, Layout);

	    if (!data) {
	      logger.log(2, 'no layout data', '');
	    }

	    this.conf = (0, _defaultsDeep2.default)(conf, (0, _cloneDeep2.default)(defaultConf));
	    this.data = data;
	    var agg = (0, _reduce2.default)(data, function (aggregator, block) {
	      block.offset = aggregator.offset;
	      aggregator.blocks[block.id] = {
	        label: block.label,
	        len: block.len,
	        color: block.color,
	        offset: aggregator.offset
	      };
	      aggregator.offset += block.len;
	      return aggregator;
	    }, { blocks: {}, offset: 0 });
	    this.blocks = agg.blocks;
	    this.size = agg.offset;

	    // thanks to sum of blocks' length, compute start and end angles in radian
	    (0, _forEach2.default)(this.data, function (block, index) {
	      _this.blocks[block.id].start = block.offset / _this.size * (2 * Math.PI - _this.data.length * _this.conf.gap) + index * _this.conf.gap;

	      _this.blocks[block.id].end = (block.offset + block.len) / _this.size * (2 * Math.PI - _this.data.length * _this.conf.gap) + index * _this.conf.gap;

	      block.start = block.offset / _this.size * (2 * Math.PI - _this.data.length * _this.conf.gap) + index * _this.conf.gap;

	      block.end = (block.offset + block.len) / _this.size * (2 * Math.PI - _this.data.length * _this.conf.gap) + index * _this.conf.gap;
	    });
	  }

	  _createClass(Layout, [{
	    key: 'getAngle',
	    value: function getAngle(blockId, unit) {
	      var position = this.blocks[blockId].start / this.size;
	      if (unit === 'deg') return angle * 360;

	      if (unit === 'rad') return position * 2 * Math.PI;

	      return null;
	    }
	  }, {
	    key: 'summary',
	    value: function summary() {
	      return (0, _reduce2.default)(this.data, function (summary, block) {
	        summary[block.id] = block.len;
	        return summary;
	      }, {});
	    }
	  }]);

	  return Layout;
	}();

	exports.default = Layout;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(111);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_SYMBOLS_FLAG = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}

	module.exports = cloneDeep;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(27),
	    arrayEach = __webpack_require__(100),
	    assignValue = __webpack_require__(89),
	    baseAssign = __webpack_require__(112),
	    baseAssignIn = __webpack_require__(113),
	    cloneBuffer = __webpack_require__(62),
	    copyArray = __webpack_require__(67),
	    copySymbols = __webpack_require__(114),
	    copySymbolsIn = __webpack_require__(118),
	    getAllKeys = __webpack_require__(121),
	    getAllKeysIn = __webpack_require__(123),
	    getTag = __webpack_require__(124),
	    initCloneArray = __webpack_require__(129),
	    initCloneByTag = __webpack_require__(130),
	    initCloneObject = __webpack_require__(68),
	    isArray = __webpack_require__(76),
	    isBuffer = __webpack_require__(80),
	    isObject = __webpack_require__(19),
	    keys = __webpack_require__(103);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(88),
	    keys = __webpack_require__(103);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(88),
	    keysIn = __webpack_require__(90);

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	module.exports = baseAssignIn;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(88),
	    getSymbols = __webpack_require__(115);

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(116),
	    stubArray = __webpack_require__(117);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	module.exports = getSymbols;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(88),
	    getSymbolsIn = __webpack_require__(119);

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	module.exports = copySymbolsIn;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(120),
	    getPrototype = __webpack_require__(70),
	    getSymbols = __webpack_require__(115),
	    stubArray = __webpack_require__(117);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	module.exports = getSymbolsIn;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(122),
	    getSymbols = __webpack_require__(115),
	    keys = __webpack_require__(103);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(120),
	    isArray = __webpack_require__(76);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(122),
	    getSymbolsIn = __webpack_require__(119),
	    keysIn = __webpack_require__(90);

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	module.exports = getAllKeysIn;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(125),
	    Map = __webpack_require__(41),
	    Promise = __webpack_require__(126),
	    Set = __webpack_require__(127),
	    WeakMap = __webpack_require__(128),
	    baseGetTag = __webpack_require__(13),
	    toSource = __webpack_require__(22);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 129 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(65),
	    cloneDataView = __webpack_require__(131),
	    cloneMap = __webpack_require__(132),
	    cloneRegExp = __webpack_require__(136),
	    cloneSet = __webpack_require__(137),
	    cloneSymbol = __webpack_require__(140),
	    cloneTypedArray = __webpack_require__(64);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(65);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(133),
	    arrayReduce = __webpack_require__(134),
	    mapToArray = __webpack_require__(135);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	module.exports = cloneMap;


/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ },
/* 134 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(138),
	    arrayReduce = __webpack_require__(134),
	    setToArray = __webpack_require__(139);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	module.exports = cloneSet;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ },
/* 139 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(14);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(134),
	    baseEach = __webpack_require__(101),
	    baseIteratee = __webpack_require__(142),
	    baseReduce = __webpack_require__(177),
	    isArray = __webpack_require__(76);

	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` thru `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not given, the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @see _.reduceRight
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;

	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}

	module.exports = reduce;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(143),
	    baseMatchesProperty = __webpack_require__(158),
	    identity = __webpack_require__(4),
	    isArray = __webpack_require__(76),
	    property = __webpack_require__(174);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(144),
	    getMatchData = __webpack_require__(155),
	    matchesStrictComparable = __webpack_require__(157);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(27),
	    baseIsEqual = __webpack_require__(145);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(146),
	    isObjectLike = __webpack_require__(75);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(27),
	    equalArrays = __webpack_require__(147),
	    equalByTag = __webpack_require__(153),
	    equalObjects = __webpack_require__(154),
	    getTag = __webpack_require__(124),
	    isArray = __webpack_require__(76),
	    isBuffer = __webpack_require__(80),
	    isTypedArray = __webpack_require__(83);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);

	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;

	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(148),
	    arraySome = __webpack_require__(151),
	    cacheHas = __webpack_require__(152);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(42),
	    setCacheAdd = __webpack_require__(149),
	    setCacheHas = __webpack_require__(150);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 149 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 151 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(14),
	    Uint8Array = __webpack_require__(66),
	    eq = __webpack_require__(32),
	    equalArrays = __webpack_require__(147),
	    mapToArray = __webpack_require__(135),
	    setToArray = __webpack_require__(139);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(121);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(156),
	    keys = __webpack_require__(103);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 157 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(145),
	    get = __webpack_require__(159),
	    hasIn = __webpack_require__(171),
	    isKey = __webpack_require__(162),
	    isStrictComparable = __webpack_require__(156),
	    matchesStrictComparable = __webpack_require__(157),
	    toKey = __webpack_require__(170);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(160);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(161),
	    toKey = __webpack_require__(170);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(76),
	    isKey = __webpack_require__(162),
	    stringToPath = __webpack_require__(164),
	    toString = __webpack_require__(167);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(76),
	    isSymbol = __webpack_require__(163);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    isObjectLike = __webpack_require__(75);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(165);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(166);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(42);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(168);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(14),
	    arrayMap = __webpack_require__(169),
	    isArray = __webpack_require__(76),
	    isSymbol = __webpack_require__(163);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 169 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(163);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(172),
	    hasPath = __webpack_require__(173);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 172 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(161),
	    isArguments = __webpack_require__(73),
	    isArray = __webpack_require__(76),
	    isIndex = __webpack_require__(93),
	    isLength = __webpack_require__(79),
	    toKey = __webpack_require__(170);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(175),
	    basePropertyDeep = __webpack_require__(176),
	    isKey = __webpack_require__(162),
	    toKey = __webpack_require__(170);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 175 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(160);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 177 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of
	 *  `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}

	module.exports = baseReduce;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = render;

	var _forEach = __webpack_require__(99);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _sortBy = __webpack_require__(179);

	var _sortBy2 = _interopRequireDefault(_sortBy);

	var _renderLayout = __webpack_require__(187);

	var _renderLayout2 = _interopRequireDefault(_renderLayout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function render() {
	  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var removeTracks = arguments[1];
	  var circos = arguments[2];

	  var renderAll = ids.length === 0;

	  var svg = circos.svg.attr('width', circos.conf.width).attr('height', circos.conf.height);

	  if (removeTracks) {
	    (0, _forEach2.default)(circos.tracks, function (track, trackId) {
	      svg.select('.' + trackId).remove();
	    });
	  }

	  var translated = svg.select('.all');
	  if (translated.empty()) {
	    translated = svg.append('g').attr('class', 'all').attr('transform', 'translate(\n          ' + parseInt(circos.conf.width / 2) + ',\n          ' + parseInt(circos.conf.height / 2) + '\n        )');
	  }

	  (0, _forEach2.default)(circos.tracks, function (track, trackId) {
	    if (renderAll || trackId in ids) {
	      track.render(circos, translated, trackId);
	    }
	  });
	  if (renderAll || 'layout' in ids) {
	    (0, _renderLayout2.default)(translated, circos);
	  }

	  // re-order tracks and layout according to z-index
	  var trackContainers = svg.selectAll('.all > g').remove();
	  var sortedTrackContainers = (0, _sortBy2.default)(trackContainers._groups[0], function (elt) {
	    return elt.getAttribute('z-index');
	  });

	  svg.select('.all').selectAll('g').data(sortedTrackContainers).enter().append(function (d) {
	    return d;
	  });

	  return circos;
	}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(180),
	    baseOrderBy = __webpack_require__(182),
	    baseRest = __webpack_require__(3),
	    isIterateeCall = __webpack_require__(98);

	/**
	 * Creates an array of elements, sorted in ascending order by the results of
	 * running each element in a collection thru each iteratee. This method
	 * performs a stable sort, that is, it preserves the original sort order of
	 * equal elements. The iteratees are invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {...(Function|Function[])} [iteratees=[_.identity]]
	 *  The iteratees to sort by.
	 * @returns {Array} Returns the new sorted array.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'fred',   'age': 48 },
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 },
	 *   { 'user': 'barney', 'age': 34 }
	 * ];
	 *
	 * _.sortBy(users, [function(o) { return o.user; }]);
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 *
	 * _.sortBy(users, ['user', 'age']);
	 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	 */
	var sortBy = baseRest(function(collection, iteratees) {
	  if (collection == null) {
	    return [];
	  }
	  var length = iteratees.length;
	  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
	    iteratees = [];
	  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
	    iteratees = [iteratees[0]];
	  }
	  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
	});

	module.exports = sortBy;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(120),
	    isFlattenable = __webpack_require__(181);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(14),
	    isArguments = __webpack_require__(73),
	    isArray = __webpack_require__(76);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(169),
	    baseIteratee = __webpack_require__(142),
	    baseMap = __webpack_require__(183),
	    baseSortBy = __webpack_require__(184),
	    baseUnary = __webpack_require__(85),
	    compareMultiple = __webpack_require__(185),
	    identity = __webpack_require__(4);

	/**
	 * The base implementation of `_.orderBy` without param guards.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	 * @param {string[]} orders The sort orders of `iteratees`.
	 * @returns {Array} Returns the new sorted array.
	 */
	function baseOrderBy(collection, iteratees, orders) {
	  var index = -1;
	  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

	  var result = baseMap(collection, function(value, key, collection) {
	    var criteria = arrayMap(iteratees, function(iteratee) {
	      return iteratee(value);
	    });
	    return { 'criteria': criteria, 'index': ++index, 'value': value };
	  });

	  return baseSortBy(result, function(object, other) {
	    return compareMultiple(object, other, orders);
	  });
	}

	module.exports = baseOrderBy;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(101),
	    isArrayLike = __webpack_require__(78);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 184 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.sortBy` which uses `comparer` to define the
	 * sort order of `array` and replaces criteria objects with their corresponding
	 * values.
	 *
	 * @private
	 * @param {Array} array The array to sort.
	 * @param {Function} comparer The function to define sort order.
	 * @returns {Array} Returns `array`.
	 */
	function baseSortBy(array, comparer) {
	  var length = array.length;

	  array.sort(comparer);
	  while (length--) {
	    array[length] = array[length].value;
	  }
	  return array;
	}

	module.exports = baseSortBy;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var compareAscending = __webpack_require__(186);

	/**
	 * Used by `_.orderBy` to compare multiple properties of a value to another
	 * and stable sort them.
	 *
	 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
	 * specify an order of "desc" for descending or "asc" for ascending sort order
	 * of corresponding values.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {boolean[]|string[]} orders The order to sort by for each property.
	 * @returns {number} Returns the sort order indicator for `object`.
	 */
	function compareMultiple(object, other, orders) {
	  var index = -1,
	      objCriteria = object.criteria,
	      othCriteria = other.criteria,
	      length = objCriteria.length,
	      ordersLength = orders.length;

	  while (++index < length) {
	    var result = compareAscending(objCriteria[index], othCriteria[index]);
	    if (result) {
	      if (index >= ordersLength) {
	        return result;
	      }
	      var order = orders[index];
	      return result * (order == 'desc' ? -1 : 1);
	    }
	  }
	  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	  // that causes it, under certain circumstances, to provide the same value for
	  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	  // for more details.
	  //
	  // This also ensures a stable sort in V8 and other engines.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
	  return object.index - other.index;
	}

	module.exports = compareMultiple;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(163);

	/**
	 * Compares values to sort them in ascending order.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {number} Returns the sort order indicator for `value`.
	 */
	function compareAscending(value, other) {
	  if (value !== other) {
	    var valIsDefined = value !== undefined,
	        valIsNull = value === null,
	        valIsReflexive = value === value,
	        valIsSymbol = isSymbol(value);

	    var othIsDefined = other !== undefined,
	        othIsNull = other === null,
	        othIsReflexive = other === other,
	        othIsSymbol = isSymbol(other);

	    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
	        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
	        (valIsNull && othIsDefined && othIsReflexive) ||
	        (!valIsDefined && othIsReflexive) ||
	        !valIsReflexive) {
	      return 1;
	    }
	    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
	        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
	        (othIsNull && valIsDefined && valIsReflexive) ||
	        (!othIsDefined && valIsReflexive) ||
	        !othIsReflexive) {
	      return -1;
	    }
	  }
	  return 0;
	}

	module.exports = compareAscending;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderLayout;

	var _d3Shape = __webpack_require__(188);

	var _d3Array = __webpack_require__(190);

	function renderLayoutLabels(conf, block) {
	  var radius = conf.innerRadius + conf.labels.radialOffset;

	  var labelArc = (0, _d3Shape.arc)().innerRadius(radius).outerRadius(radius).startAngle(function (d, i) {
	    return d.start;
	  }).endAngle(function (d, i) {
	    return d.end;
	  });

	  block.append('path').attr('fill', 'none').attr('stroke', 'none').attr('d', labelArc).attr('id', function (d) {
	    return 'arc-label' + d.id;
	  });

	  var label = block.append('text').style('font-size', '' + conf.labels.size + 'px').attr('text-anchor', 'middle');

	  // http://stackoverflow.com/questions/20447106/how-to-center-horizontal-and-vertical-text-along-an-textpath-inside-an-arc-usi
	  label.append('textPath').attr('startOffset', '25%').attr('xlink:href', function (d) {
	    return '#arc-label' + d.id;
	  }).style('fill', conf.labels.color).text(function (d) {
	    return d.label;
	  });
	}

	function renderLayoutTicks(conf, layout, instance) {
	  // Returns an array of tick angles and labels, given a block.
	  function blockTicks(d) {
	    var k = (d.end - d.start) / d.len;
	    return (0, _d3Array.range)(0, d.len, conf.ticks.spacing).map(function (v, i) {
	      return {
	        angle: v * k + d.start,
	        label: displayLabel(v, i)
	      };
	    });
	  }

	  function displayLabel(v, i) {
	    if (conf.ticks.labels === false) {
	      return null;
	    } else if (conf.ticks.labelDisplay0 === false && i === 0) {
	      return null;
	    } else if (i % conf.ticks.labelSpacing) {
	      return null;
	    } else {
	      return v / conf.ticks.labelDenominator + conf.ticks.labelSuffix;
	    }
	  }

	  var ticks = layout.append('g').selectAll('g').data(instance._layout.data).enter().append('g').selectAll('g').data(blockTicks).enter().append('g').attr('transform', function (d) {
	    return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ')' + 'translate(' + conf.outerRadius + ',0)';
	  });

	  ticks.append('line').attr('x1', 0).attr('y1', 1).attr('x2', function (d, i) {
	    if (i % conf.ticks.majorSpacing) {
	      return conf.ticks.size.minor;
	    } else {
	      return conf.ticks.size.major;
	    }
	  }).attr('y2', 1).style('stroke', conf.ticks.color);

	  ticks.append('text').attr('x', 8).attr('dy', '.35em').attr('transform', function (d) {
	    return d.angle > Math.PI ? 'rotate(180)translate(-16)' : null;
	  }).style('text-anchor', function (d) {
	    return d.angle > Math.PI ? 'end' : null;
	  }).style('font-size', '' + conf.ticks.labelSize + 'px').style('fill', conf.ticks.labelColor).text(function (d) {
	    return d.label;
	  });
	}

	function renderLayout(parentElement, instance) {
	  var conf = instance._layout.conf;
	  parentElement.select('.cs-layout').remove();

	  var layout = parentElement.append('g').attr('class', 'cs-layout').attr('z-index', conf.zIndex).on('click', conf.onClick);

	  var block = layout.selectAll('g').data(instance._layout.data).enter().append('g').attr('class', function (d) {
	    return d.id;
	  }).attr('opacity', conf.opacity);

	  var entry = (0, _d3Shape.arc)().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).cornerRadius(conf.cornerRadius).startAngle(function (d) {
	    return d.start;
	  }).endAngle(function (d) {
	    return d.end;
	  });

	  block.append('path').attr('d', entry).attr('fill', function (d) {
	    return d.color;
	  }).attr('id', function (d) {
	    return d.id;
	  });

	  if (conf.labels.display) {
	    renderLayoutLabels(conf, block);
	  }

	  if (conf.ticks.display) {
	    renderLayoutTicks(conf, layout, instance);
	  }
	}

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-shape/ Version 1.0.4. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(189)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Path) { 'use strict';

	var constant$1 = function(x) {
	  return function constant() {
	    return x;
	  };
	};

	var epsilon = 1e-12;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var tau = 2 * pi;

	function arcInnerRadius(d) {
	  return d.innerRadius;
	}

	function arcOuterRadius(d) {
	  return d.outerRadius;
	}

	function arcStartAngle(d) {
	  return d.startAngle;
	}

	function arcEndAngle(d) {
	  return d.endAngle;
	}

	function arcPadAngle(d) {
	  return d && d.padAngle; // Note: optional!
	}

	function asin(x) {
	  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
	}

	function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var x10 = x1 - x0, y10 = y1 - y0,
	      x32 = x3 - x2, y32 = y3 - y2,
	      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	  return [x0 + t * x10, y0 + t * y10];
	}

	// Compute perpendicular offset line of length rc.
	// http://mathworld.wolfram.com/Circle-LineIntersection.html
	function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	  var x01 = x0 - x1,
	      y01 = y0 - y1,
	      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
	      ox = lo * y01,
	      oy = -lo * x01,
	      x11 = x0 + ox,
	      y11 = y0 + oy,
	      x10 = x1 + ox,
	      y10 = y1 + oy,
	      x00 = (x11 + x10) / 2,
	      y00 = (y11 + y10) / 2,
	      dx = x10 - x11,
	      dy = y10 - y11,
	      d2 = dx * dx + dy * dy,
	      r = r1 - rc,
	      D = x11 * y10 - x10 * y11,
	      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
	      cx0 = (D * dy - dx * d) / d2,
	      cy0 = (-D * dx - dy * d) / d2,
	      cx1 = (D * dy + dx * d) / d2,
	      cy1 = (-D * dx + dy * d) / d2,
	      dx0 = cx0 - x00,
	      dy0 = cy0 - y00,
	      dx1 = cx1 - x00,
	      dy1 = cy1 - y00;

	  // Pick the closer of the two intersection points.
	  // TODO Is there a faster way to determine which intersection to use?
	  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

	  return {
	    cx: cx0,
	    cy: cy0,
	    x01: -ox,
	    y01: -oy,
	    x11: cx0 * (r1 / r - 1),
	    y11: cy0 * (r1 / r - 1)
	  };
	}

	var arc = function() {
	  var innerRadius = arcInnerRadius,
	      outerRadius = arcOuterRadius,
	      cornerRadius = constant$1(0),
	      padRadius = null,
	      startAngle = arcStartAngle,
	      endAngle = arcEndAngle,
	      padAngle = arcPadAngle,
	      context = null;

	  function arc() {
	    var buffer,
	        r,
	        r0 = +innerRadius.apply(this, arguments),
	        r1 = +outerRadius.apply(this, arguments),
	        a0 = startAngle.apply(this, arguments) - halfPi,
	        a1 = endAngle.apply(this, arguments) - halfPi,
	        da = Math.abs(a1 - a0),
	        cw = a1 > a0;

	    if (!context) context = buffer = d3Path.path();

	    // Ensure that the outer radius is always larger than the inner radius.
	    if (r1 < r0) r = r1, r1 = r0, r0 = r;

	    // Is it a point?
	    if (!(r1 > epsilon)) context.moveTo(0, 0);

	    // Or is it a circle or annulus?
	    else if (da > tau - epsilon) {
	      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
	      context.arc(0, 0, r1, a0, a1, !cw);
	      if (r0 > epsilon) {
	        context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
	        context.arc(0, 0, r0, a1, a0, cw);
	      }
	    }

	    // Or is it a circular or annular sector?
	    else {
	      var a01 = a0,
	          a11 = a1,
	          a00 = a0,
	          a10 = a1,
	          da0 = da,
	          da1 = da,
	          ap = padAngle.apply(this, arguments) / 2,
	          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : Math.sqrt(r0 * r0 + r1 * r1)),
	          rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	          rc0 = rc,
	          rc1 = rc,
	          t0,
	          t1;

	      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	      if (rp > epsilon) {
	        var p0 = asin(rp / r0 * Math.sin(ap)),
	            p1 = asin(rp / r1 * Math.sin(ap));
	        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	      }

	      var x01 = r1 * Math.cos(a01),
	          y01 = r1 * Math.sin(a01),
	          x10 = r0 * Math.cos(a10),
	          y10 = r0 * Math.sin(a10);

	      // Apply rounded corners?
	      if (rc > epsilon) {
	        var x11 = r1 * Math.cos(a11),
	            y11 = r1 * Math.sin(a11),
	            x00 = r0 * Math.cos(a00),
	            y00 = r0 * Math.sin(a00);

	        // Restrict the corner radius according to the sector angle.
	        if (da < pi) {
	          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	              ax = x01 - oc[0],
	              ay = y01 - oc[1],
	              bx = x11 - oc[0],
	              by = y11 - oc[1],
	              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
	              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
	          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
	        }
	      }

	      // Is the sector collapsed to a line?
	      if (!(da1 > epsilon)) context.moveTo(x01, y01);

	      // Does the sector’s outer ring have rounded corners?
	      else if (rc1 > epsilon) {
	        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

	        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

	        // Have the corners merged?
	        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);

	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r1, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	          context.arc(t1.cx, t1.cy, rc1, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }

	      // Or is the outer ring just a circular arc?
	      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

	      // Is there no inner ring, and it’s a circular sector?
	      // Or perhaps it’s an annular sector collapsed due to padding?
	      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

	      // Does the sector’s inner ring (or point) have rounded corners?
	      else if (rc0 > epsilon) {
	        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

	        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

	        // Have the corners merged?
	        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);

	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r0, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	          context.arc(t1.cx, t1.cy, rc0, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
	        }
	      }

	      // Or is the inner ring just a circular arc?
	      else context.arc(0, 0, r0, a10, a00, cw);
	    }

	    context.closePath();

	    if (buffer) return context = null, buffer + "" || null;
	  }

	  arc.centroid = function() {
	    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
	    return [Math.cos(a) * r, Math.sin(a) * r];
	  };

	  arc.innerRadius = function(_) {
	    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : innerRadius;
	  };

	  arc.outerRadius = function(_) {
	    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : outerRadius;
	  };

	  arc.cornerRadius = function(_) {
	    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : cornerRadius;
	  };

	  arc.padRadius = function(_) {
	    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), arc) : padRadius;
	  };

	  arc.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : startAngle;
	  };

	  arc.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : endAngle;
	  };

	  arc.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : padAngle;
	  };

	  arc.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	  };

	  return arc;
	};

	function Linear(context) {
	  this._context = context;
	}

	Linear.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: this._context.lineTo(x, y); break;
	    }
	  }
	};

	var curveLinear = function(context) {
	  return new Linear(context);
	};

	function x(p) {
	  return p[0];
	}

	function y(p) {
	  return p[1];
	}

	var line = function() {
	  var x$$1 = x,
	      y$$1 = y,
	      defined = constant$1(true),
	      context = null,
	      curve = curveLinear,
	      output = null;

	  function line(data) {
	    var i,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer;

	    if (context == null) output = curve(buffer = d3Path.path());

	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) output.lineStart();
	        else output.lineEnd();
	      }
	      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
	    }

	    if (buffer) return output = null, buffer + "" || null;
	  }

	  line.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : x$$1;
	  };

	  line.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : y$$1;
	  };

	  line.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), line) : defined;
	  };

	  line.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	  };

	  line.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	  };

	  return line;
	};

	var area = function() {
	  var x0 = x,
	      x1 = null,
	      y0 = constant$1(0),
	      y1 = y,
	      defined = constant$1(true),
	      context = null,
	      curve = curveLinear,
	      output = null;

	  function area(data) {
	    var i,
	        j,
	        k,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer,
	        x0z = new Array(n),
	        y0z = new Array(n);

	    if (context == null) output = curve(buffer = d3Path.path());

	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) {
	          j = i;
	          output.areaStart();
	          output.lineStart();
	        } else {
	          output.lineEnd();
	          output.lineStart();
	          for (k = i - 1; k >= j; --k) {
	            output.point(x0z[k], y0z[k]);
	          }
	          output.lineEnd();
	          output.areaEnd();
	        }
	      }
	      if (defined0) {
	        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	      }
	    }

	    if (buffer) return output = null, buffer + "" || null;
	  }

	  function arealine() {
	    return line().defined(defined).curve(curve).context(context);
	  }

	  area.x = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
	  };

	  area.x0 = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
	  };

	  area.x1 = function(_) {
	    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
	  };

	  area.y = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
	  };

	  area.y0 = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
	  };

	  area.y1 = function(_) {
	    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
	  };

	  area.lineX0 =
	  area.lineY0 = function() {
	    return arealine().x(x0).y(y0);
	  };

	  area.lineY1 = function() {
	    return arealine().x(x0).y(y1);
	  };

	  area.lineX1 = function() {
	    return arealine().x(x1).y(y0);
	  };

	  area.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), area) : defined;
	  };

	  area.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	  };

	  area.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	  };

	  return area;
	};

	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};

	var identity = function(d) {
	  return d;
	};

	var pie = function() {
	  var value = identity,
	      sortValues = descending,
	      sort = null,
	      startAngle = constant$1(0),
	      endAngle = constant$1(tau),
	      padAngle = constant$1(0);

	  function pie(data) {
	    var i,
	        n = data.length,
	        j,
	        k,
	        sum = 0,
	        index = new Array(n),
	        arcs = new Array(n),
	        a0 = +startAngle.apply(this, arguments),
	        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	        a1,
	        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	        pa = p * (da < 0 ? -1 : 1),
	        v;

	    for (i = 0; i < n; ++i) {
	      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	        sum += v;
	      }
	    }

	    // Optionally sort the arcs by previously-computed values or by data.
	    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

	    // Compute the arcs! They are stored in the original data's order.
	    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	        data: data[j],
	        index: i,
	        value: v,
	        startAngle: a0,
	        endAngle: a1,
	        padAngle: p
	      };
	    }

	    return arcs;
	  }

	  pie.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), pie) : value;
	  };

	  pie.sortValues = function(_) {
	    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	  };

	  pie.sort = function(_) {
	    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	  };

	  pie.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : startAngle;
	  };

	  pie.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : endAngle;
	  };

	  pie.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : padAngle;
	  };

	  return pie;
	};

	var curveRadialLinear = curveRadial(curveLinear);

	function Radial(curve) {
	  this._curve = curve;
	}

	Radial.prototype = {
	  areaStart: function() {
	    this._curve.areaStart();
	  },
	  areaEnd: function() {
	    this._curve.areaEnd();
	  },
	  lineStart: function() {
	    this._curve.lineStart();
	  },
	  lineEnd: function() {
	    this._curve.lineEnd();
	  },
	  point: function(a, r) {
	    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	  }
	};

	function curveRadial(curve) {

	  function radial(context) {
	    return new Radial(curve(context));
	  }

	  radial._curve = curve;

	  return radial;
	}

	function radialLine(l) {
	  var c = l.curve;

	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;

	  l.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };

	  return l;
	}

	var radialLine$1 = function() {
	  return radialLine(line().curve(curveRadialLinear));
	};

	var radialArea = function() {
	  var a = area().curve(curveRadialLinear),
	      c = a.curve,
	      x0 = a.lineX0,
	      x1 = a.lineX1,
	      y0 = a.lineY0,
	      y1 = a.lineY1;

	  a.angle = a.x, delete a.x;
	  a.startAngle = a.x0, delete a.x0;
	  a.endAngle = a.x1, delete a.x1;
	  a.radius = a.y, delete a.y;
	  a.innerRadius = a.y0, delete a.y0;
	  a.outerRadius = a.y1, delete a.y1;
	  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
	  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
	  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
	  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;

	  a.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };

	  return a;
	};

	var circle = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / pi);
	    context.moveTo(r, 0);
	    context.arc(0, 0, r, 0, tau);
	  }
	};

	var cross = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / 5) / 2;
	    context.moveTo(-3 * r, -r);
	    context.lineTo(-r, -r);
	    context.lineTo(-r, -3 * r);
	    context.lineTo(r, -3 * r);
	    context.lineTo(r, -r);
	    context.lineTo(3 * r, -r);
	    context.lineTo(3 * r, r);
	    context.lineTo(r, r);
	    context.lineTo(r, 3 * r);
	    context.lineTo(-r, 3 * r);
	    context.lineTo(-r, r);
	    context.lineTo(-3 * r, r);
	    context.closePath();
	  }
	};

	var tan30 = Math.sqrt(1 / 3);
	var tan30_2 = tan30 * 2;

	var diamond = {
	  draw: function(context, size) {
	    var y = Math.sqrt(size / tan30_2),
	        x = y * tan30;
	    context.moveTo(0, -y);
	    context.lineTo(x, 0);
	    context.lineTo(0, y);
	    context.lineTo(-x, 0);
	    context.closePath();
	  }
	};

	var ka = 0.89081309152928522810;
	var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
	var kx = Math.sin(tau / 10) * kr;
	var ky = -Math.cos(tau / 10) * kr;

	var star = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size * ka),
	        x = kx * r,
	        y = ky * r;
	    context.moveTo(0, -r);
	    context.lineTo(x, y);
	    for (var i = 1; i < 5; ++i) {
	      var a = tau * i / 5,
	          c = Math.cos(a),
	          s = Math.sin(a);
	      context.lineTo(s * r, -c * r);
	      context.lineTo(c * x - s * y, s * x + c * y);
	    }
	    context.closePath();
	  }
	};

	var square = {
	  draw: function(context, size) {
	    var w = Math.sqrt(size),
	        x = -w / 2;
	    context.rect(x, x, w, w);
	  }
	};

	var sqrt3 = Math.sqrt(3);

	var triangle = {
	  draw: function(context, size) {
	    var y = -Math.sqrt(size / (sqrt3 * 3));
	    context.moveTo(0, y * 2);
	    context.lineTo(-sqrt3 * y, -y);
	    context.lineTo(sqrt3 * y, -y);
	    context.closePath();
	  }
	};

	var c = -0.5;
	var s = Math.sqrt(3) / 2;
	var k = 1 / Math.sqrt(12);
	var a = (k / 2 + 1) * 3;

	var wye = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / a),
	        x0 = r / 2,
	        y0 = r * k,
	        x1 = x0,
	        y1 = r * k + r,
	        x2 = -x1,
	        y2 = y1;
	    context.moveTo(x0, y0);
	    context.lineTo(x1, y1);
	    context.lineTo(x2, y2);
	    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	    context.closePath();
	  }
	};

	var symbols = [
	  circle,
	  cross,
	  diamond,
	  square,
	  star,
	  triangle,
	  wye
	];

	var symbol = function() {
	  var type = constant$1(circle),
	      size = constant$1(64),
	      context = null;

	  function symbol() {
	    var buffer;
	    if (!context) context = buffer = d3Path.path();
	    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	    if (buffer) return context = null, buffer + "" || null;
	  }

	  symbol.type = function(_) {
	    return arguments.length ? (type = typeof _ === "function" ? _ : constant$1(_), symbol) : type;
	  };

	  symbol.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : constant$1(+_), symbol) : size;
	  };

	  symbol.context = function(_) {
	    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	  };

	  return symbol;
	};

	var noop = function() {};

	function point(that, x, y) {
	  that._context.bezierCurveTo(
	    (2 * that._x0 + that._x1) / 3,
	    (2 * that._y0 + that._y1) / 3,
	    (that._x0 + 2 * that._x1) / 3,
	    (that._y0 + 2 * that._y1) / 3,
	    (that._x0 + 4 * that._x1 + x) / 6,
	    (that._y0 + 4 * that._y1 + y) / 6
	  );
	}

	function Basis(context) {
	  this._context = context;
	}

	Basis.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 3: point(this, this._x1, this._y1); // proceed
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};

	var basis = function(context) {
	  return new Basis(context);
	};

	function BasisClosed(context) {
	  this._context = context;
	}

	BasisClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x2, this._y2);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x2, this._y2);
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
	      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
	      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};

	var basisClosed = function(context) {
	  return new BasisClosed(context);
	};

	function BasisOpen(context) {
	  this._context = context;
	}

	BasisOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
	      case 3: this._point = 4; // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};

	var basisOpen = function(context) {
	  return new BasisOpen(context);
	};

	function Bundle(context, beta) {
	  this._basis = new Basis(context);
	  this._beta = beta;
	}

	Bundle.prototype = {
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	    this._basis.lineStart();
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        j = x.length - 1;

	    if (j > 0) {
	      var x0 = x[0],
	          y0 = y[0],
	          dx = x[j] - x0,
	          dy = y[j] - y0,
	          i = -1,
	          t;

	      while (++i <= j) {
	        t = i / j;
	        this._basis.point(
	          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
	          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
	        );
	      }
	    }

	    this._x = this._y = null;
	    this._basis.lineEnd();
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};

	var bundle = (function custom(beta) {

	  function bundle(context) {
	    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	  }

	  bundle.beta = function(beta) {
	    return custom(+beta);
	  };

	  return bundle;
	})(0.85);

	function point$1(that, x, y) {
	  that._context.bezierCurveTo(
	    that._x1 + that._k * (that._x2 - that._x0),
	    that._y1 + that._k * (that._y2 - that._y0),
	    that._x2 + that._k * (that._x1 - x),
	    that._y2 + that._k * (that._y1 - y),
	    that._x2,
	    that._y2
	  );
	}

	function Cardinal(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}

	Cardinal.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: point$1(this, this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
	      case 2: this._point = 3; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};

	var cardinal = (function custom(tension) {

	  function cardinal(context) {
	    return new Cardinal(context, tension);
	  }

	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };

	  return cardinal;
	})(0);

	function CardinalClosed(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}

	CardinalClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};

	var cardinalClosed = (function custom(tension) {

	  function cardinal(context) {
	    return new CardinalClosed(context, tension);
	  }

	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };

	  return cardinal;
	})(0);

	function CardinalOpen(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}

	CardinalOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};

	var cardinalOpen = (function custom(tension) {

	  function cardinal(context) {
	    return new CardinalOpen(context, tension);
	  }

	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };

	  return cardinal;
	})(0);

	function point$2(that, x, y) {
	  var x1 = that._x1,
	      y1 = that._y1,
	      x2 = that._x2,
	      y2 = that._y2;

	  if (that._l01_a > epsilon) {
	    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	  }

	  if (that._l23_a > epsilon) {
	    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	  }

	  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	}

	function CatmullRom(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}

	CatmullRom.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: this.point(this._x2, this._y2); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;

	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }

	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; // proceed
	      default: point$2(this, x, y); break;
	    }

	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};

	var catmullRom = (function custom(alpha) {

	  function catmullRom(context) {
	    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	  }

	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };

	  return catmullRom;
	})(0.5);

	function CatmullRomClosed(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}

	CatmullRomClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;

	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }

	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$2(this, x, y); break;
	    }

	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};

	var catmullRomClosed = (function custom(alpha) {

	  function catmullRom(context) {
	    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	  }

	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };

	  return catmullRom;
	})(0.5);

	function CatmullRomOpen(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}

	CatmullRomOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;

	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }

	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$2(this, x, y); break;
	    }

	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};

	var catmullRomOpen = (function custom(alpha) {

	  function catmullRom(context) {
	    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	  }

	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };

	  return catmullRom;
	})(0.5);

	function LinearClosed(context) {
	  this._context = context;
	}

	LinearClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._point) this._context.closePath();
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    if (this._point) this._context.lineTo(x, y);
	    else this._point = 1, this._context.moveTo(x, y);
	  }
	};

	var linearClosed = function(context) {
	  return new LinearClosed(context);
	};

	function sign(x) {
	  return x < 0 ? -1 : 1;
	}

	// Calculate the slopes of the tangents (Hermite-type interpolation) based on
	// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	// NOV(II), P. 443, 1990.
	function slope3(that, x2, y2) {
	  var h0 = that._x1 - that._x0,
	      h1 = x2 - that._x1,
	      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	      p = (s0 * h1 + s1 * h0) / (h0 + h1);
	  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	}

	// Calculate a one-sided slope.
	function slope2(that, t) {
	  var h = that._x1 - that._x0;
	  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	}

	// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	function point$3(that, t0, t1) {
	  var x0 = that._x0,
	      y0 = that._y0,
	      x1 = that._x1,
	      y1 = that._y1,
	      dx = (x1 - x0) / 3;
	  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	}

	function MonotoneX(context) {
	  this._context = context;
	}

	MonotoneX.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 =
	    this._t0 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    var t1 = NaN;

	    x = +x, y = +y;
	    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
	      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
	    }

	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	    this._t0 = t1;
	  }
	};

	function MonotoneY(context) {
	  this._context = new ReflectContext(context);
	}

	(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	  MonotoneX.prototype.point.call(this, y, x);
	};

	function ReflectContext(context) {
	  this._context = context;
	}

	ReflectContext.prototype = {
	  moveTo: function(x, y) { this._context.moveTo(y, x); },
	  closePath: function() { this._context.closePath(); },
	  lineTo: function(x, y) { this._context.lineTo(y, x); },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
	};

	function monotoneX(context) {
	  return new MonotoneX(context);
	}

	function monotoneY(context) {
	  return new MonotoneY(context);
	}

	function Natural(context) {
	  this._context = context;
	}

	Natural.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        n = x.length;

	    if (n) {
	      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	      if (n === 2) {
	        this._context.lineTo(x[1], y[1]);
	      } else {
	        var px = controlPoints(x),
	            py = controlPoints(y);
	        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	        }
	      }
	    }

	    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	    this._x = this._y = null;
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};

	// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	function controlPoints(x) {
	  var i,
	      n = x.length - 1,
	      m,
	      a = new Array(n),
	      b = new Array(n),
	      r = new Array(n);
	  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	  a[n - 1] = r[n - 1] / b[n - 1];
	  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	  b[n - 1] = (x[n] + a[n - 1]) / 2;
	  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	  return [a, b];
	}

	var natural = function(context) {
	  return new Natural(context);
	};

	function Step(context, t) {
	  this._context = context;
	  this._t = t;
	}

	Step.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = this._y = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: {
	        if (this._t <= 0) {
	          this._context.lineTo(this._x, y);
	          this._context.lineTo(x, y);
	        } else {
	          var x1 = this._x * (1 - this._t) + x * this._t;
	          this._context.lineTo(x1, this._y);
	          this._context.lineTo(x1, y);
	        }
	        break;
	      }
	    }
	    this._x = x, this._y = y;
	  }
	};

	var step = function(context) {
	  return new Step(context, 0.5);
	};

	function stepBefore(context) {
	  return new Step(context, 0);
	}

	function stepAfter(context) {
	  return new Step(context, 1);
	}

	var slice = Array.prototype.slice;

	var none = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	    s0 = s1, s1 = series[order[i]];
	    for (var j = 0; j < m; ++j) {
	      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	    }
	  }
	};

	var none$1 = function(series) {
	  var n = series.length, o = new Array(n);
	  while (--n >= 0) o[n] = n;
	  return o;
	};

	function stackValue(d, key) {
	  return d[key];
	}

	var stack = function() {
	  var keys = constant$1([]),
	      order = none$1,
	      offset = none,
	      value = stackValue;

	  function stack(data) {
	    var kz = keys.apply(this, arguments),
	        i,
	        m = data.length,
	        n = kz.length,
	        sz = new Array(n),
	        oz;

	    for (i = 0; i < n; ++i) {
	      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	        si[j] = sij = [0, +value(data[j], ki, j, data)];
	        sij.data = data[j];
	      }
	      si.key = ki;
	    }

	    for (i = 0, oz = order(sz); i < n; ++i) {
	      sz[oz[i]].index = i;
	    }

	    offset(sz, oz);
	    return sz;
	  }

	  stack.keys = function(_) {
	    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : keys;
	  };

	  stack.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), stack) : value;
	  };

	  stack.order = function(_) {
	    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : order;
	  };

	  stack.offset = function(_) {
	    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
	  };

	  return stack;
	};

	var expand = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
	    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	  }
	  none(series, order);
	};

	var silhouette = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
	    s0[j][1] += s0[j][0] = -y / 2;
	  }
	  none(series, order);
	};

	var wiggle = function(series, order) {
	  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	      var si = series[order[i]],
	          sij0 = si[j][1] || 0,
	          sij1 = si[j - 1][1] || 0,
	          s3 = (sij0 - sij1) / 2;
	      for (var k = 0; k < i; ++k) {
	        var sk = series[order[k]],
	            skj0 = sk[j][1] || 0,
	            skj1 = sk[j - 1][1] || 0;
	        s3 += skj0 - skj1;
	      }
	      s1 += sij0, s2 += s3 * sij0;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    if (s1) y -= s2 / s1;
	  }
	  s0[j - 1][1] += s0[j - 1][0] = y;
	  none(series, order);
	};

	var ascending = function(series) {
	  var sums = series.map(sum);
	  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
	};

	function sum(series) {
	  var s = 0, i = -1, n = series.length, v;
	  while (++i < n) if (v = +series[i][1]) s += v;
	  return s;
	}

	var descending$1 = function(series) {
	  return ascending(series).reverse();
	};

	var insideOut = function(series) {
	  var n = series.length,
	      i,
	      j,
	      sums = series.map(sum),
	      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
	      top = 0,
	      bottom = 0,
	      tops = [],
	      bottoms = [];

	  for (i = 0; i < n; ++i) {
	    j = order[i];
	    if (top < bottom) {
	      top += sums[j];
	      tops.push(j);
	    } else {
	      bottom += sums[j];
	      bottoms.push(j);
	    }
	  }

	  return bottoms.reverse().concat(tops);
	};

	var reverse = function(series) {
	  return none$1(series).reverse();
	};

	exports.arc = arc;
	exports.area = area;
	exports.line = line;
	exports.pie = pie;
	exports.radialArea = radialArea;
	exports.radialLine = radialLine$1;
	exports.symbol = symbol;
	exports.symbols = symbols;
	exports.symbolCircle = circle;
	exports.symbolCross = cross;
	exports.symbolDiamond = diamond;
	exports.symbolSquare = square;
	exports.symbolStar = star;
	exports.symbolTriangle = triangle;
	exports.symbolWye = wye;
	exports.curveBasisClosed = basisClosed;
	exports.curveBasisOpen = basisOpen;
	exports.curveBasis = basis;
	exports.curveBundle = bundle;
	exports.curveCardinalClosed = cardinalClosed;
	exports.curveCardinalOpen = cardinalOpen;
	exports.curveCardinal = cardinal;
	exports.curveCatmullRomClosed = catmullRomClosed;
	exports.curveCatmullRomOpen = catmullRomOpen;
	exports.curveCatmullRom = catmullRom;
	exports.curveLinearClosed = linearClosed;
	exports.curveLinear = curveLinear;
	exports.curveMonotoneX = monotoneX;
	exports.curveMonotoneY = monotoneY;
	exports.curveNatural = natural;
	exports.curveStep = step;
	exports.curveStepAfter = stepAfter;
	exports.curveStepBefore = stepBefore;
	exports.stack = stack;
	exports.stackOffsetExpand = expand;
	exports.stackOffsetNone = none;
	exports.stackOffsetSilhouette = silhouette;
	exports.stackOffsetWiggle = wiggle;
	exports.stackOrderAscending = ascending;
	exports.stackOrderDescending = descending$1;
	exports.stackOrderInsideOut = insideOut;
	exports.stackOrderNone = none$1;
	exports.stackOrderReverse = reverse;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-path/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var pi = Math.PI;
	var tau = 2 * pi;
	var epsilon = 1e-6;
	var tauEpsilon = tau - epsilon;

	function Path() {
	  this._x0 = this._y0 = // start of current subpath
	  this._x1 = this._y1 = null; // end of current subpath
	  this._ = "";
	}

	function path() {
	  return new Path;
	}

	Path.prototype = path.prototype = {
	  constructor: Path,
	  moveTo: function(x, y) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	  },
	  closePath: function() {
	    if (this._x1 !== null) {
	      this._x1 = this._x0, this._y1 = this._y0;
	      this._ += "Z";
	    }
	  },
	  lineTo: function(x, y) {
	    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  quadraticCurveTo: function(x1, y1, x, y) {
	    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  arcTo: function(x1, y1, x2, y2, r) {
	    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	    var x0 = this._x1,
	        y0 = this._y1,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        x01 = x0 - x1,
	        y01 = y0 - y1,
	        l01_2 = x01 * x01 + y01 * y01;

	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);

	    // Is this path empty? Move to (x1,y1).
	    if (this._x1 === null) {
	      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }

	    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	    else if (!(l01_2 > epsilon)) {}

	    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	    // Equivalently, is (x1,y1) coincident with (x2,y2)?
	    // Or, is the radius zero? Line to (x1,y1).
	    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
	      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }

	    // Otherwise, draw an arc!
	    else {
	      var x20 = x2 - x0,
	          y20 = y2 - y0,
	          l21_2 = x21 * x21 + y21 * y21,
	          l20_2 = x20 * x20 + y20 * y20,
	          l21 = Math.sqrt(l21_2),
	          l01 = Math.sqrt(l01_2),
	          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	          t01 = l / l01,
	          t21 = l / l21;

	      // If the start tangent is not coincident with (x0,y0), line to.
	      if (Math.abs(t01 - 1) > epsilon) {
	        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	      }

	      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	    }
	  },
	  arc: function(x, y, r, a0, a1, ccw) {
	    x = +x, y = +y, r = +r;
	    var dx = r * Math.cos(a0),
	        dy = r * Math.sin(a0),
	        x0 = x + dx,
	        y0 = y + dy,
	        cw = 1 ^ ccw,
	        da = ccw ? a0 - a1 : a1 - a0;

	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);

	    // Is this path empty? Move to (x0,y0).
	    if (this._x1 === null) {
	      this._ += "M" + x0 + "," + y0;
	    }

	    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
	      this._ += "L" + x0 + "," + y0;
	    }

	    // Is this arc empty? We’re done.
	    if (!r) return;

	    // Is this a complete circle? Draw two arcs to complete the circle.
	    if (da > tauEpsilon) {
	      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	    }

	    // Otherwise, draw an arc!
	    else {
	      if (da < 0) da = da % tau + tau;
	      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	    }
	  },
	  rect: function(x, y, w, h) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
	  },
	  toString: function() {
	    return this._;
	  }
	};

	exports.path = path;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-array/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var ascending = function(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	};

	var bisector = function(compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;
	        else hi = mid;
	      }
	      return lo;
	    },
	    right: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;
	        else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	};

	function ascendingComparator(f) {
	  return function(d, x) {
	    return ascending(f(d), x);
	  };
	}

	var ascendingBisect = bisector(ascending);
	var bisectRight = ascendingBisect.right;
	var bisectLeft = ascendingBisect.left;

	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};

	var number = function(x) {
	  return x === null ? NaN : +x;
	};

	var variance = function(array, f) {
	  var n = array.length,
	      m = 0,
	      a,
	      d,
	      s = 0,
	      i = -1,
	      j = 0;

	  if (f == null) {
	    while (++i < n) {
	      if (!isNaN(a = number(array[i]))) {
	        d = a - m;
	        m += d / ++j;
	        s += d * (a - m);
	      }
	    }
	  }

	  else {
	    while (++i < n) {
	      if (!isNaN(a = number(f(array[i], i, array)))) {
	        d = a - m;
	        m += d / ++j;
	        s += d * (a - m);
	      }
	    }
	  }

	  if (j > 1) return s / (j - 1);
	};

	var deviation = function(array, f) {
	  var v = variance(array, f);
	  return v ? Math.sqrt(v) : v;
	};

	var extent = function(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b,
	      c;

	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = c = b; break; }
	    while (++i < n) if ((b = array[i]) != null) {
	      if (a > b) a = b;
	      if (c < b) c = b;
	    }
	  }

	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = c = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null) {
	      if (a > b) a = b;
	      if (c < b) c = b;
	    }
	  }

	  return [a, c];
	};

	var array = Array.prototype;

	var slice = array.slice;
	var map = array.map;

	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};

	var identity = function(x) {
	  return x;
	};

	var range = function(start, stop, step) {
	  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

	  var i = -1,
	      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	      range = new Array(n);

	  while (++i < n) {
	    range[i] = start + i * step;
	  }

	  return range;
	};

	var e10 = Math.sqrt(50);
	var e5 = Math.sqrt(10);
	var e2 = Math.sqrt(2);

	var ticks = function(start, stop, count) {
	  var step = tickStep(start, stop, count);
	  return range(
	    Math.ceil(start / step) * step,
	    Math.floor(stop / step) * step + step / 2, // inclusive
	    step
	  );
	};

	function tickStep(start, stop, count) {
	  var step0 = Math.abs(stop - start) / Math.max(0, count),
	      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	      error = step0 / step1;
	  if (error >= e10) step1 *= 10;
	  else if (error >= e5) step1 *= 5;
	  else if (error >= e2) step1 *= 2;
	  return stop < start ? -step1 : step1;
	}

	var sturges = function(values) {
	  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
	};

	var histogram = function() {
	  var value = identity,
	      domain = extent,
	      threshold = sturges;

	  function histogram(data) {
	    var i,
	        n = data.length,
	        x,
	        values = new Array(n);

	    for (i = 0; i < n; ++i) {
	      values[i] = value(data[i], i, data);
	    }

	    var xz = domain(values),
	        x0 = xz[0],
	        x1 = xz[1],
	        tz = threshold(values, x0, x1);

	    // Convert number of thresholds into uniform thresholds.
	    if (!Array.isArray(tz)) tz = ticks(x0, x1, tz);

	    // Remove any thresholds outside the domain.
	    var m = tz.length;
	    while (tz[0] <= x0) tz.shift(), --m;
	    while (tz[m - 1] >= x1) tz.pop(), --m;

	    var bins = new Array(m + 1),
	        bin;

	    // Initialize bins.
	    for (i = 0; i <= m; ++i) {
	      bin = bins[i] = [];
	      bin.x0 = i > 0 ? tz[i - 1] : x0;
	      bin.x1 = i < m ? tz[i] : x1;
	    }

	    // Assign data to bins by value, ignoring any outside the domain.
	    for (i = 0; i < n; ++i) {
	      x = values[i];
	      if (x0 <= x && x <= x1) {
	        bins[bisectRight(tz, x, 0, m)].push(data[i]);
	      }
	    }

	    return bins;
	  }

	  histogram.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
	  };

	  histogram.domain = function(_) {
	    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
	  };

	  histogram.thresholds = function(_) {
	    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
	  };

	  return histogram;
	};

	var quantile = function(array, p, f) {
	  if (f == null) f = number;
	  if (!(n = array.length)) return;
	  if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
	  if (p >= 1) return +f(array[n - 1], n - 1, array);
	  var n,
	      h = (n - 1) * p,
	      i = Math.floor(h),
	      a = +f(array[i], i, array),
	      b = +f(array[i + 1], i + 1, array);
	  return a + (b - a) * (h - i);
	};

	var freedmanDiaconis = function(values, min, max) {
	  values = map.call(values, number).sort(ascending);
	  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
	};

	var scott = function(values, min, max) {
	  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
	};

	var max = function(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;

	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	  }

	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
	  }

	  return a;
	};

	var mean = function(array, f) {
	  var s = 0,
	      n = array.length,
	      a,
	      i = -1,
	      j = n;

	  if (f == null) {
	    while (++i < n) if (!isNaN(a = number(array[i]))) s += a; else --j;
	  }

	  else {
	    while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) s += a; else --j;
	  }

	  if (j) return s / j;
	};

	var median = function(array, f) {
	  var numbers = [],
	      n = array.length,
	      a,
	      i = -1;

	  if (f == null) {
	    while (++i < n) if (!isNaN(a = number(array[i]))) numbers.push(a);
	  }

	  else {
	    while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) numbers.push(a);
	  }

	  return quantile(numbers.sort(ascending), 0.5);
	};

	var merge = function(arrays) {
	  var n = arrays.length,
	      m,
	      i = -1,
	      j = 0,
	      merged,
	      array;

	  while (++i < n) j += arrays[i].length;
	  merged = new Array(j);

	  while (--n >= 0) {
	    array = arrays[n];
	    m = array.length;
	    while (--m >= 0) {
	      merged[--j] = array[m];
	    }
	  }

	  return merged;
	};

	var min = function(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;

	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	  }

	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
	  }

	  return a;
	};

	var pairs = function(array) {
	  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
	  while (i < n) pairs[i] = [p, p = array[++i]];
	  return pairs;
	};

	var permute = function(array, indexes) {
	  var i = indexes.length, permutes = new Array(i);
	  while (i--) permutes[i] = array[indexes[i]];
	  return permutes;
	};

	var scan = function(array, compare) {
	  if (!(n = array.length)) return;
	  var i = 0,
	      n,
	      j = 0,
	      xi,
	      xj = array[j];

	  if (!compare) compare = ascending;

	  while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;

	  if (compare(xj, xj) === 0) return j;
	};

	var shuffle = function(array, i0, i1) {
	  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
	      t,
	      i;

	  while (m) {
	    i = Math.random() * m-- | 0;
	    t = array[m + i0];
	    array[m + i0] = array[i + i0];
	    array[i + i0] = t;
	  }

	  return array;
	};

	var sum = function(array, f) {
	  var s = 0,
	      n = array.length,
	      a,
	      i = -1;

	  if (f == null) {
	    while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.
	  }

	  else {
	    while (++i < n) if (a = +f(array[i], i, array)) s += a;
	  }

	  return s;
	};

	var transpose = function(matrix) {
	  if (!(n = matrix.length)) return [];
	  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	      row[j] = matrix[j][i];
	    }
	  }
	  return transpose;
	};

	function length(d) {
	  return d.length;
	}

	var zip = function() {
	  return transpose(arguments);
	};

	exports.bisect = bisectRight;
	exports.bisectRight = bisectRight;
	exports.bisectLeft = bisectLeft;
	exports.ascending = ascending;
	exports.bisector = bisector;
	exports.descending = descending;
	exports.deviation = deviation;
	exports.extent = extent;
	exports.histogram = histogram;
	exports.thresholdFreedmanDiaconis = freedmanDiaconis;
	exports.thresholdScott = scott;
	exports.thresholdSturges = sturges;
	exports.max = max;
	exports.mean = mean;
	exports.median = median;
	exports.merge = merge;
	exports.min = min;
	exports.pairs = pairs;
	exports.permute = permute;
	exports.quantile = quantile;
	exports.range = range;
	exports.scan = scan;
	exports.shuffle = shuffle;
	exports.sum = sum;
	exports.ticks = ticks;
	exports.tickStep = tickStep;
	exports.transpose = transpose;
	exports.variance = variance;
	exports.zip = zip;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _forEach = __webpack_require__(99);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _configs = __webpack_require__(287);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  style: {
	    value: {},
	    iteratee: true
	  }
	}, _configs.common, _configs.radial);

	var Text = function (_Track) {
	  _inherits(Text, _Track);

	  function Text(instance, conf, data) {
	    _classCallCheck(this, Text);

	    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, instance, conf, defaultConf, data, _dataParser.parsePositionTextData));
	  }

	  _createClass(Text, [{
	    key: 'renderDatumContainer',
	    value: function renderDatumContainer(instance, parentElement, name, data, conf) {
	      var track = parentElement.append('g').attr('class', name);
	      return this.renderBlock(track, data, instance._layout, conf);
	    }
	  }, {
	    key: 'renderDatum',
	    value: function renderDatum(parentElement, conf, layout, utils) {
	      var text = parentElement.selectAll('g').data(function (d) {
	        return d.values;
	      }).enter().append('g').append('text').text(function (d) {
	        return d.value;
	      }).attr('transform', function (d) {
	        var angle = utils.theta(d.position, layout.blocks[d.block_id]) * 360 / (2 * Math.PI) - 90;
	        return 'rotate(' + angle + ') translate(' + conf.innerRadius + ', 0)';
	      });
	      (0, _forEach2.default)(conf.style, function (value, key) {
	        text.style(key, value);
	      });
	      return text;
	    }
	  }]);

	  return Text;
	}(_Track3.default);

	exports.default = Text;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tooltip = __webpack_require__(193);

	var _range = __webpack_require__(204);

	var _range2 = _interopRequireDefault(_range);

	var _d3Dispatch = __webpack_require__(195);

	var _d3Shape = __webpack_require__(188);

	var _configUtils = __webpack_require__(209);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Track = function () {
	  function Track(instance, conf, defaultConf, data, dataParser) {
	    _classCallCheck(this, Track);

	    this.dispatch = (0, _d3Dispatch.dispatch)('mouseover', 'mouseout');
	    this.parseData = dataParser;
	    this.loadData(data, instance);
	    this.conf = (0, _configUtils.getConf)(conf, defaultConf, this.meta, instance);
	  }

	  _createClass(Track, [{
	    key: 'loadData',
	    value: function loadData(data, instance) {
	      var result = this.parseData(data, instance._layout.summary());
	      this.data = result.data;
	      this.meta = result.meta;
	    }
	  }, {
	    key: 'ratio',
	    value: function ratio(value, min, max, scope, reverse, logScale) {
	      var scaleLogBase = logScale ? 2.3 : 1;

	      if (min === max || value === min && !reverse || value === max && reverse) {
	        return 0;
	      }
	      if (value === max || value === min && reverse) {
	        return scope - 1;
	      }

	      var fraction = (value - min) / (max - min);

	      var x = Math.exp(1 / scaleLogBase * Math.log(fraction));

	      if (reverse) {
	        x = 1 - x;
	      }
	      return Math.floor(scope * x);
	    }
	  }, {
	    key: 'render',
	    value: function render(instance, parentElement, name) {
	      var _this = this;

	      parentElement.select('.' + name).remove();
	      var track = parentElement.append('g').attr('class', name).attr('z-index', this.conf.zIndex);
	      var datumContainer = this.renderDatumContainer(instance, track, name, this.data, this.conf);
	      if (this.conf.axes && this.conf.axes.display) {
	        this.renderAxes(datumContainer, this.conf, instance._layout, this.data);
	      }
	      var selection = this.renderDatum(datumContainer, this.conf, instance._layout, this);
	      if (this.conf.tooltipContent) {
	        (0, _tooltip.registerTooltip)(this, instance, selection, this.conf);
	      }
	      selection.on('mouseover', function (d, i, j) {
	        _this.dispatch.call('mouseover', _this, d);
	      });
	      selection.on('mouseout', function (d, i, j) {
	        _this.dispatch.call('mouseout', _this, d);
	      });

	      return this;
	    }
	  }, {
	    key: 'renderBlock',
	    value: function renderBlock(parentElement, data, layout, conf) {
	      var scope = conf.outerRadius - conf.innerRadius;
	      var block = parentElement.selectAll('.block').data(data).enter().append('g').attr('class', 'block').attr('transform', function (d) {
	        return 'rotate(' + layout.blocks[d.key].start * 360 / (2 * Math.PI) + ')';
	      });

	      if (conf.backgrounds) {
	        block.selectAll('.background').data(conf.backgrounds).enter().append('path').attr('class', 'background').attr('fill', function (background) {
	          return background.color;
	        }).attr('opacity', function (background) {
	          return background.opacity || 1;
	        }).attr('d', (0, _d3Shape.arc)().innerRadius(function (background) {
	          if (conf.direction === 'in') {
	            return conf.outerRadius - scope * background.start;
	          } else {
	            return conf.innerRadius + scope * background.start;
	          }
	        }).outerRadius(function (background) {
	          if (conf.direction == 'in') {
	            return conf.outerRadius - scope * background.end;
	          } else {
	            return conf.innerRadius + scope * background.end;
	          }
	        }).startAngle(function (d, i, j) {
	          return 0;
	        }).endAngle(function (d, i, j) {
	          return layout.blocks[data[j].key].end - layout.blocks[data[j].key].start;
	        }));
	      }

	      return block;
	    }
	  }, {
	    key: 'renderAxes',
	    value: function renderAxes(parentElement, conf, layout, data) {
	      var axes = (0, _range2.default)(conf.innerRadius, conf.outerRadius, conf.axes.minor.spacing);

	      var axis = (0, _d3Shape.arc)().innerRadius(function (d) {
	        return d.height;
	      }).outerRadius(function (d) {
	        return d.height;
	      }).startAngle(0).endAngle(function (d) {
	        return d.length;
	      });

	      return parentElement.selectAll('.axis').data(function (blockData) {
	        var block = layout.blocks[blockData.key];
	        return axes.map(function (height) {
	          return {
	            height: height,
	            length: block.end - block.start
	          };
	        });
	      }).enter().append('path').attr('opacity', conf.opacity).attr('class', 'axis').attr('d', axis).attr('stroke-width', function (d, i) {
	        return i % conf.axes.major.spacing === 0 ? conf.axes.major.thickness : conf.axes.minor.thickness;
	      }).attr('stroke', function (d, i) {
	        return i % conf.axes.major.spacing === 0 ? conf.axes.major.color : conf.axes.minor.color;
	      });
	    }
	  }, {
	    key: 'theta',
	    value: function theta(position, block) {
	      return position / block.len * (block.end - block.start);
	    }
	  }, {
	    key: 'x',
	    value: function x(d, layout, conf) {
	      var height = this.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
	      var r = conf.direction === 'in' ? conf.outerRadius - height : conf.innerRadius + height;

	      var angle = this.theta(d.position, layout.blocks[d.block_id]) - Math.PI / 2;
	      return r * Math.cos(angle);
	    }
	  }, {
	    key: 'y',
	    value: function y(d, layout, conf) {
	      var height = this.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
	      var r = conf.direction === 'in' ? conf.outerRadius - height : conf.innerRadius + height;

	      var angle = this.theta(d.position, layout.blocks[d.block_id]) - Math.PI / 2;
	      return r * Math.sin(angle);
	    }
	  }]);

	  return Track;
	}();

	exports.default = Track;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerTooltip = registerTooltip;

	var _d3Selection = __webpack_require__(108);

	__webpack_require__(194);

	__webpack_require__(200);

	function registerTooltip(track, instance, element, trackParams) {
	  console.log(instance.conf.container);
	  track.tip = (0, _d3Selection.select)(instance.conf.container).append('div').attr('class', 'tooltip').style('opacity', 0);

	  track.dispatch.on('mouseover', function (d) {
	    track.tip.html(trackParams.tooltipContent(d)).transition().style('opacity', .9).style('left', _d3Selection.event.pageX + 'px').style('top', _d3Selection.event.pageY - 28 + 'px');
	  });

	  track.dispatch.on('mouseout', function (d) {
	    track.tip.transition().duration(500).style('opacity', 0);
	  });
	}

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-transition/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(108), __webpack_require__(195), __webpack_require__(196), __webpack_require__(197), __webpack_require__(198), __webpack_require__(199)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-dispatch', 'd3-timer', 'd3-interpolate', 'd3-color', 'd3-ease'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Selection,d3Dispatch,d3Timer,d3Interpolate,d3Color,d3Ease) { 'use strict';

	var emptyOn = d3Dispatch.dispatch("start", "end", "interrupt");
	var emptyTween = [];

	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var RUNNING = 4;
	var ENDING = 5;
	var ENDED = 6;

	var schedule = function(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	};

	function init(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	  return schedule;
	}

	function set(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	  return schedule;
	}

	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	  return schedule;
	}

	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;

	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = d3Timer.timer(schedule, 0, self.time);

	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    self.timer.restart(start, self.delay, self.time);

	    // If the elapsed delay is less than our first sleep, start immediately.
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	  }

	  function start(elapsed) {
	    var i, j, n, o;

	    // If the state is not SCHEDULED, then we previously errored on start.
	    if (self.state !== SCHEDULED) return stop();

	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;

	      // While this element already has a starting transition during this frame,
	      // defer starting an interrupting transition until that transition has a
	      // chance to tick (and possibly end); see d3/d3-transition#54!
	      if (o.state === STARTED) return d3Timer.timeout(start);

	      // Interrupt the active transition, if any.
	      // Dispatch the interrupt event.
	      if (o.state === RUNNING) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }

	      // Cancel any pre-empted transitions. No interrupt event is dispatched
	      // because the cancelled transitions never started. Note that this also
	      // removes this transition from the pending list!
	      else if (+i < id) {
	        o.state = ENDED;
	        o.timer.stop();
	        delete schedules[i];
	      }
	    }

	    // Defer the first tick to end of the current frame; see d3/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    d3Timer.timeout(function() {
	      if (self.state === STARTED) {
	        self.state = RUNNING;
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });

	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;

	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }

	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;

	    while (++i < n) {
	      tween[i].call(null, t);
	    }

	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      stop();
	    }
	  }

	  function stop() {
	    self.state = ENDED;
	    self.timer.stop();
	    delete schedules[id];
	    for (var i in schedules) return; // eslint-disable-line no-unused-vars
	    delete node.__transition;
	  }
	}

	var interrupt = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;

	  if (!schedules) return;

	  name = name == null ? null : name + "";

	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state > STARTING && schedule.state < ENDING;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }

	  if (empty) delete node.__transition;
	};

	var selection_interrupt = function(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	};

	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }

	    schedule.tween = tween1;
	  };
	}

	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }

	    schedule.tween = tween1;
	  };
	}

	var transition_tween = function(name, value) {
	  var id = this._id;

	  name += "";

	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }

	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	};

	function tweenValue(transition, name, value) {
	  var id = transition._id;

	  transition.each(function() {
	    var schedule = set(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });

	  return function(node) {
	    return get(node, id).value[name];
	  };
	}

	var interpolate = function(a, b) {
	  var c;
	  return (typeof b === "number" ? d3Interpolate.interpolateNumber
	      : b instanceof d3Color.color ? d3Interpolate.interpolateRgb
	      : (c = d3Color.color(b)) ? (b = c, d3Interpolate.interpolateRgb)
	      : d3Interpolate.interpolateString)(a, b);
	};

	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}

	function attrConstantNS(fullname, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}

	function attrFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttribute(name);
	    value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}

	function attrFunctionNS(fullname, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}

	var transition_attr = function(name, value) {
	  var fullname = d3Selection.namespace(name), i = fullname === "transform" ? d3Interpolate.interpolateTransformSvg : interpolate;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
	      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
	};

	function attrTweenNS(fullname, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttributeNS(fullname.space, fullname.local, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}

	function attrTween(name, value) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.setAttribute(name, i(t));
	    };
	  }
	  tween._value = value;
	  return tween;
	}

	var transition_attrTween = function(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = d3Selection.namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	};

	function delayFunction(id, value) {
	  return function() {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}

	function delayConstant(id, value) {
	  return value = +value, function() {
	    init(this, id).delay = value;
	  };
	}

	var transition_delay = function(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get(this.node(), id).delay;
	};

	function durationFunction(id, value) {
	  return function() {
	    set(this, id).duration = +value.apply(this, arguments);
	  };
	}

	function durationConstant(id, value) {
	  return value = +value, function() {
	    set(this, id).duration = value;
	  };
	}

	var transition_duration = function(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get(this.node(), id).duration;
	};

	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set(this, id).ease = value;
	  };
	}

	var transition_ease = function(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get(this.node(), id).ease;
	};

	var transition_filter = function(match) {
	  if (typeof match !== "function") match = d3Selection.matcher(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, this._name, this._id);
	};

	var transition_merge = function(transition) {
	  if (transition._id !== this._id) throw new Error;

	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Transition(merges, this._parents, this._name, this._id);
	};

	function start(name) {
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}

	function onFunction(id, name, listener) {
	  var on0, on1, sit = start(name) ? init : set;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;

	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

	    schedule.on = on1;
	  };
	}

	var transition_on = function(name, listener) {
	  var id = this._id;

	  return arguments.length < 2
	      ? get(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	};

	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}

	var transition_remove = function() {
	  return this.on("end.remove", removeFunction(this._id));
	};

	var transition_select = function(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = d3Selection.selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, name, id);
	};

	var transition_selectAll = function(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = d3Selection.selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }

	  return new Transition(subgroups, parents, name, id);
	};

	var Selection = d3Selection.selection.prototype.constructor;

	var transition_selection = function() {
	  return new Selection(this._groups, this._parents);
	};

	function styleRemove(name, interpolate$$1) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = d3Selection.window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}

	function styleRemoveEnd(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant(name, interpolate$$1, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = d3Selection.window(this).getComputedStyle(this, null).getPropertyValue(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value1);
	  };
	}

	function styleFunction(name, interpolate$$1, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = d3Selection.window(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = value(this);
	    if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	  };
	}

	var transition_style = function(name, value, priority) {
	  var i = (name += "") === "transform" ? d3Interpolate.interpolateTransformCss : interpolate;
	  return value == null ? this
	          .styleTween(name, styleRemove(name, i))
	          .on("end.style." + name, styleRemoveEnd(name))
	      : this.styleTween(name, typeof value === "function"
	          ? styleFunction(name, i, tweenValue(this, "style." + name, value))
	          : styleConstant(name, i, value), priority);
	};

	function styleTween(name, value, priority) {
	  function tween() {
	    var node = this, i = value.apply(node, arguments);
	    return i && function(t) {
	      node.style.setProperty(name, i(t), priority);
	    };
	  }
	  tween._value = value;
	  return tween;
	}

	var transition_styleTween = function(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	};

	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}

	var transition_text = function(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction(tweenValue(this, "text", value))
	      : textConstant(value == null ? "" : value + ""));
	};

	var transition_transition = function() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id1);
	};

	var id = 0;

	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}

	function transition(name) {
	  return d3Selection.selection().transition(name);
	}

	function newId() {
	  return ++id;
	}

	var selection_prototype = d3Selection.selection.prototype;

	Transition.prototype = transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease
	};

	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: d3Ease.easeCubicInOut
	};

	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      return defaultTiming.time = d3Timer.now(), defaultTiming;
	    }
	  }
	  return timing;
	}

	var selection_transition = function(name) {
	  var id,
	      timing;

	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = d3Timer.now(), name = name == null ? null : name + "";
	  }

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id);
	};

	d3Selection.selection.prototype.interrupt = selection_interrupt;
	d3Selection.selection.prototype.transition = selection_transition;

	var root = [null];

	var active = function(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      i;

	  if (schedules) {
	    name = name == null ? null : name + "";
	    for (i in schedules) {
	      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
	        return new Transition([[node]], root, name, +i);
	      }
	    }
	  }

	  return null;
	};

	exports.transition = transition;
	exports.active = active;
	exports.interrupt = interrupt;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-dispatch/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var noop = {value: function() {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}

	exports.dispatch = dispatch;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-timer/ Version 1.0.4. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var frame = 0;
	var timeout = 0;
	var interval = 0;
	var pokeDelay = 1000;
	var taskHead;
	var taskTail;
	var clockLast = 0;
	var clockNow = 0;
	var clockSkew = 0;
	var clock = typeof performance === "object" && performance.now ? performance : Date;
	var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(f) { setTimeout(f, 17); };

	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}

	function clearNow() {
	  clockNow = 0;
	}

	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}

	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};

	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}

	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}

	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}

	function poke() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}

	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}

	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow;
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, delay);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) clockLast = clockNow, interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}

	var timeout$1 = function(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(function(elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	};

	var interval$1 = function(callback, delay, time) {
	  var t = new Timer, total = delay;
	  if (delay == null) return t.restart(callback, delay, time), t;
	  delay = +delay, time = time == null ? now() : +time;
	  t.restart(function tick(elapsed) {
	    elapsed += total;
	    t.restart(tick, total += delay, time);
	    callback(elapsed);
	  }, delay, time);
	  return t;
	};

	exports.now = now;
	exports.timer = timer;
	exports.timerFlush = timerFlush;
	exports.timeout = timeout$1;
	exports.interval = interval$1;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-interpolate/ Version 1.1.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(198)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Color) { 'use strict';

	function basis(t1, v0, v1, v2, v3) {
	  var t2 = t1 * t1, t3 = t2 * t1;
	  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
	      + (4 - 6 * t2 + 3 * t3) * v1
	      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
	      + t3 * v3) / 6;
	}

	var basis$1 = function(values) {
	  var n = values.length - 1;
	  return function(t) {
	    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	        v1 = values[i],
	        v2 = values[i + 1],
	        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};

	var basisClosed = function(values) {
	  var n = values.length;
	  return function(t) {
	    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
	        v0 = values[(i + n - 1) % n],
	        v1 = values[i % n],
	        v2 = values[(i + 1) % n],
	        v3 = values[(i + 2) % n];
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};

	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};

	function linear(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}

	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}

	function hue(a, b) {
	  var d = b - a;
	  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	}

	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	  };
	}

	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	}

	var rgb$1 = ((function rgbGamma(y) {
	  var color$$1 = gamma(y);

	  function rgb$$1(start, end) {
	    var r = color$$1((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
	        g = color$$1(start.g, end.g),
	        b = color$$1(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  rgb$$1.gamma = rgbGamma;

	  return rgb$$1;
	}))(1);

	function rgbSpline(spline) {
	  return function(colors) {
	    var n = colors.length,
	        r = new Array(n),
	        g = new Array(n),
	        b = new Array(n),
	        i, color$$1;
	    for (i = 0; i < n; ++i) {
	      color$$1 = d3Color.rgb(colors[i]);
	      r[i] = color$$1.r || 0;
	      g[i] = color$$1.g || 0;
	      b[i] = color$$1.b || 0;
	    }
	    r = spline(r);
	    g = spline(g);
	    b = spline(b);
	    color$$1.opacity = 1;
	    return function(t) {
	      color$$1.r = r(t);
	      color$$1.g = g(t);
	      color$$1.b = b(t);
	      return color$$1 + "";
	    };
	  };
	}

	var rgbBasis = rgbSpline(basis$1);
	var rgbBasisClosed = rgbSpline(basisClosed);

	var array = function(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(nb),
	      c = new Array(nb),
	      i;

	  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];

	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	};

	var date = function(a, b) {
	  var d = new Date;
	  return a = +a, b -= a, function(t) {
	    return d.setTime(a + b * t), d;
	  };
	};

	var number = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return a + b * t;
	  };
	};

	var object = function(a, b) {
	  var i = {},
	      c = {},
	      k;

	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};

	  for (k in b) {
	    if (k in a) {
	      i[k] = value(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }

	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	};

	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB = new RegExp(reA.source, "g");

	function zero(b) {
	  return function() {
	    return b;
	  };
	}

	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}

	var string = function(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators

	  // Coerce inputs to strings.
	  a = a + "", b = b + "";

	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: number(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }

	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }

	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	};

	var value = function(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant(b)
	      : (t === "number" ? number
	      : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
	      : b instanceof d3Color.color ? rgb$1
	      : b instanceof Date ? date
	      : Array.isArray(b) ? array
	      : isNaN(b) ? object
	      : number)(a, b);
	};

	var round = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return Math.round(a + b * t);
	  };
	};

	var degrees = 180 / Math.PI;

	var identity = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};

	var decompose = function(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	};

	var cssNode;
	var cssRoot;
	var cssView;
	var svgNode;

	function parseCss(value) {
	  if (value === "none") return identity;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  value = value.slice(7, -1).split(",");
	  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	}

	function parseSvg(value) {
	  if (value == null) return identity;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}

	function interpolateTransform(parse, pxComma, pxParen, degParen) {

	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }

	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }

	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }

	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }

	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }

	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}

	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

	var rho = Math.SQRT2;
	var rho2 = 2;
	var rho4 = 4;
	var epsilon2 = 1e-12;

	function cosh(x) {
	  return ((x = Math.exp(x)) + 1 / x) / 2;
	}

	function sinh(x) {
	  return ((x = Math.exp(x)) - 1 / x) / 2;
	}

	function tanh(x) {
	  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	}

	// p0 = [ux0, uy0, w0]
	// p1 = [ux1, uy1, w1]
	var zoom = function(p0, p1) {
	  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	      dx = ux1 - ux0,
	      dy = uy1 - uy0,
	      d2 = dx * dx + dy * dy,
	      i,
	      S;

	  // Special case for u0 ≅ u1.
	  if (d2 < epsilon2) {
	    S = Math.log(w1 / w0) / rho;
	    i = function(t) {
	      return [
	        ux0 + t * dx,
	        uy0 + t * dy,
	        w0 * Math.exp(rho * t * S)
	      ];
	    };
	  }

	  // General case.
	  else {
	    var d1 = Math.sqrt(d2),
	        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	    S = (r1 - r0) / rho;
	    i = function(t) {
	      var s = t * S,
	          coshr0 = cosh(r0),
	          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	      return [
	        ux0 + u * dx,
	        uy0 + u * dy,
	        w0 * coshr0 / cosh(rho * s + r0)
	      ];
	    };
	  }

	  i.duration = S * 1000;

	  return i;
	};

	function hsl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}

	var hsl$2 = hsl$1(hue);
	var hslLong = hsl$1(nogamma);

	function lab$1(start, end) {
	  var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
	      a = nogamma(start.a, end.a),
	      b = nogamma(start.b, end.b),
	      opacity = nogamma(start.opacity, end.opacity);
	  return function(t) {
	    start.l = l(t);
	    start.a = a(t);
	    start.b = b(t);
	    start.opacity = opacity(t);
	    return start + "";
	  };
	}

	function hcl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}

	var hcl$2 = hcl$1(hue);
	var hclLong = hcl$1(nogamma);

	function cubehelix$1(hue$$1) {
	  return (function cubehelixGamma(y) {
	    y = +y;

	    function cubehelix$$1(start, end) {
	      var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }

	    cubehelix$$1.gamma = cubehelixGamma;

	    return cubehelix$$1;
	  })(1);
	}

	var cubehelix$2 = cubehelix$1(hue);
	var cubehelixLong = cubehelix$1(nogamma);

	var quantize = function(interpolator, n) {
	  var samples = new Array(n);
	  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
	  return samples;
	};

	exports.interpolate = value;
	exports.interpolateArray = array;
	exports.interpolateBasis = basis$1;
	exports.interpolateBasisClosed = basisClosed;
	exports.interpolateDate = date;
	exports.interpolateNumber = number;
	exports.interpolateObject = object;
	exports.interpolateRound = round;
	exports.interpolateString = string;
	exports.interpolateTransformCss = interpolateTransformCss;
	exports.interpolateTransformSvg = interpolateTransformSvg;
	exports.interpolateZoom = zoom;
	exports.interpolateRgb = rgb$1;
	exports.interpolateRgbBasis = rgbBasis;
	exports.interpolateRgbBasisClosed = rgbBasisClosed;
	exports.interpolateHsl = hsl$2;
	exports.interpolateHslLong = hslLong;
	exports.interpolateLab = lab$1;
	exports.interpolateHcl = hcl$2;
	exports.interpolateHclLong = hclLong;
	exports.interpolateCubehelix = cubehelix$2;
	exports.interpolateCubehelixLong = cubehelixLong;
	exports.quantize = quantize;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-color/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var define = function(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	};

	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}

	function Color() {}

	var darker = 0.7;
	var brighter = 1 / darker;

	var reI = "\\s*([+-]?\\d+)\\s*";
	var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
	var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
	var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
	var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
	var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
	var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};

	define(Color, color, {
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  toString: function() {
	    return this.rgb() + "";
	  }
	});

	function color(format) {
	  var m;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format])
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}

	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}

	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}

	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}

	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}

	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  toString: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "rgb(" : "rgba(")
	        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));

	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}

	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}

	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}

	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  }
	}));

	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}

	var deg2rad = Math.PI / 180;
	var rad2deg = 180 / Math.PI;

	var Kn = 18;
	var Xn = 0.950470;
	var Yn = 1;
	var Zn = 1.088830;
	var t0 = 4 / 29;
	var t1 = 6 / 29;
	var t2 = 3 * t1 * t1;
	var t3 = t1 * t1 * t1;

	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var b = rgb2xyz(o.r),
	      a = rgb2xyz(o.g),
	      l = rgb2xyz(o.b),
	      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}

	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}

	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Lab, lab, extend(Color, {
	  brighter: function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker: function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb: function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	      this.opacity
	    );
	  }
	}));

	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}

	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}

	function xyz2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}

	function rgb2xyz(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}

	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  var h = Math.atan2(o.b, o.a) * rad2deg;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}

	function hcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}

	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hcl, hcl, extend(Color, {
	  brighter: function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	  },
	  darker: function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	  },
	  rgb: function() {
	    return labConvert(this).rgb();
	  }
	}));

	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;

	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}

	function cubehelix(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}

	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Cubehelix, cubehelix, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh)),
	      this.opacity
	    );
	  }
	}));

	exports.color = color;
	exports.rgb = rgb;
	exports.hsl = hsl;
	exports.lab = lab;
	exports.hcl = hcl;
	exports.cubehelix = cubehelix;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-ease/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	function linear(t) {
	  return +t;
	}

	function quadIn(t) {
	  return t * t;
	}

	function quadOut(t) {
	  return t * (2 - t);
	}

	function quadInOut(t) {
	  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	}

	function cubicIn(t) {
	  return t * t * t;
	}

	function cubicOut(t) {
	  return --t * t * t + 1;
	}

	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}

	var exponent = 3;

	var polyIn = (function custom(e) {
	  e = +e;

	  function polyIn(t) {
	    return Math.pow(t, e);
	  }

	  polyIn.exponent = custom;

	  return polyIn;
	})(exponent);

	var polyOut = (function custom(e) {
	  e = +e;

	  function polyOut(t) {
	    return 1 - Math.pow(1 - t, e);
	  }

	  polyOut.exponent = custom;

	  return polyOut;
	})(exponent);

	var polyInOut = (function custom(e) {
	  e = +e;

	  function polyInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	  }

	  polyInOut.exponent = custom;

	  return polyInOut;
	})(exponent);

	var pi = Math.PI;
	var halfPi = pi / 2;

	function sinIn(t) {
	  return 1 - Math.cos(t * halfPi);
	}

	function sinOut(t) {
	  return Math.sin(t * halfPi);
	}

	function sinInOut(t) {
	  return (1 - Math.cos(pi * t)) / 2;
	}

	function expIn(t) {
	  return Math.pow(2, 10 * t - 10);
	}

	function expOut(t) {
	  return 1 - Math.pow(2, -10 * t);
	}

	function expInOut(t) {
	  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	}

	function circleIn(t) {
	  return 1 - Math.sqrt(1 - t * t);
	}

	function circleOut(t) {
	  return Math.sqrt(1 - --t * t);
	}

	function circleInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	}

	var b1 = 4 / 11;
	var b2 = 6 / 11;
	var b3 = 8 / 11;
	var b4 = 3 / 4;
	var b5 = 9 / 11;
	var b6 = 10 / 11;
	var b7 = 15 / 16;
	var b8 = 21 / 22;
	var b9 = 63 / 64;
	var b0 = 1 / b1 / b1;

	function bounceIn(t) {
	  return 1 - bounceOut(1 - t);
	}

	function bounceOut(t) {
	  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	}

	function bounceInOut(t) {
	  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	}

	var overshoot = 1.70158;

	var backIn = (function custom(s) {
	  s = +s;

	  function backIn(t) {
	    return t * t * ((s + 1) * t - s);
	  }

	  backIn.overshoot = custom;

	  return backIn;
	})(overshoot);

	var backOut = (function custom(s) {
	  s = +s;

	  function backOut(t) {
	    return --t * t * ((s + 1) * t + s) + 1;
	  }

	  backOut.overshoot = custom;

	  return backOut;
	})(overshoot);

	var backInOut = (function custom(s) {
	  s = +s;

	  function backInOut(t) {
	    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	  }

	  backInOut.overshoot = custom;

	  return backInOut;
	})(overshoot);

	var tau = 2 * Math.PI;
	var amplitude = 1;
	var period = 0.3;

	var elasticIn = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticIn(t) {
	    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	  }

	  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
	  elasticIn.period = function(p) { return custom(a, p); };

	  return elasticIn;
	})(amplitude, period);

	var elasticOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticOut(t) {
	    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	  }

	  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticOut.period = function(p) { return custom(a, p); };

	  return elasticOut;
	})(amplitude, period);

	var elasticInOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticInOut(t) {
	    return ((t = t * 2 - 1) < 0
	        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  }

	  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticInOut.period = function(p) { return custom(a, p); };

	  return elasticInOut;
	})(amplitude, period);

	exports.easeLinear = linear;
	exports.easeQuad = quadInOut;
	exports.easeQuadIn = quadIn;
	exports.easeQuadOut = quadOut;
	exports.easeQuadInOut = quadInOut;
	exports.easeCubic = cubicInOut;
	exports.easeCubicIn = cubicIn;
	exports.easeCubicOut = cubicOut;
	exports.easeCubicInOut = cubicInOut;
	exports.easePoly = polyInOut;
	exports.easePolyIn = polyIn;
	exports.easePolyOut = polyOut;
	exports.easePolyInOut = polyInOut;
	exports.easeSin = sinInOut;
	exports.easeSinIn = sinIn;
	exports.easeSinOut = sinOut;
	exports.easeSinInOut = sinInOut;
	exports.easeExp = expInOut;
	exports.easeExpIn = expIn;
	exports.easeExpOut = expOut;
	exports.easeExpInOut = expInOut;
	exports.easeCircle = circleInOut;
	exports.easeCircleIn = circleIn;
	exports.easeCircleOut = circleOut;
	exports.easeCircleInOut = circleInOut;
	exports.easeBounce = bounceOut;
	exports.easeBounceIn = bounceIn;
	exports.easeBounceOut = bounceOut;
	exports.easeBounceInOut = bounceInOut;
	exports.easeBack = backInOut;
	exports.easeBackIn = backIn;
	exports.easeBackOut = backOut;
	exports.easeBackInOut = backInOut;
	exports.easeElastic = elasticOut;
	exports.easeElasticIn = elasticIn;
	exports.easeElasticOut = elasticOut;
	exports.easeElasticInOut = elasticInOut;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(201);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(203)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./tooltip.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./tooltip.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, "div.tooltip {\n  position: absolute;\n  text-align: center;\n  padding: 5px 10px;\n  background: #111111;\n  color: white;\n  border: 0px;\n  pointer-events: none;\n}\n", ""]);

	// exports


/***/ },
/* 202 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var createRange = __webpack_require__(205);

	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified,
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the range of numbers.
	 * @see _.inRange, _.rangeRight
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();

	module.exports = range;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var baseRange = __webpack_require__(206),
	    isIterateeCall = __webpack_require__(98),
	    toFinite = __webpack_require__(207);

	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toFinite(start);
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toFinite(end);
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
	    return baseRange(start, end, step, fromRight);
	  };
	}

	module.exports = createRange;


/***/ },
/* 206 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;

	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the range of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);

	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}

	module.exports = baseRange;


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(208);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19),
	    isSymbol = __webpack_require__(163);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getConf = undefined;

	var _cloneDeep = __webpack_require__(110);

	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

	var _forEach = __webpack_require__(99);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _isFunction = __webpack_require__(12);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _utils = __webpack_require__(211);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var buildConf = function buildConf() {
	  var userConf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var defaultConf = arguments[1];

	  var conf = {};
	  (0, _forEach2.default)(defaultConf, function (item, key) {
	    // if it's a leaf
	    if (item.iteratee !== undefined) {
	      if (!item.iteratee) {
	        conf[key] = Object.keys(userConf).indexOf(key) > -1 ? userConf[key] : item.value;
	      } else if (Object.keys(userConf).indexOf(key) > -1) {
	        if ((0, _isFunction2.default)(userConf[key])) {
	          conf[key] = userConf[key];
	        } else {
	          conf[key] = function () {
	            return userConf[key];
	          };
	        }
	      } else {
	        conf[key] = function () {
	          return item.value;
	        };
	      }
	      // else we go deeper
	    } else {
	      conf[key] = buildConf(userConf[key], item);
	    }
	  });

	  return conf;
	};

	var computeMinMax = function computeMinMax(conf, meta) {
	  conf.cmin = conf.min === 'smart' ? meta.min : conf.min;
	  conf.cmax = conf.max === 'smart' ? meta.max : conf.max;
	  return;
	};

	var computeRadius = function computeRadius(conf, instance) {
	  if (conf.innerRadius === 0 && conf.outerRadius === 0) {
	    var borders = (0, _utils.smartBorders)(conf, instance._layout, instance.tracks);
	    conf.innerRadius = borders.in;
	    conf.outerRadius = borders.out;
	  }
	  return;
	};

	var getConf = function getConf(userConf, defaultConf, meta, instance) {
	  var conf = buildConf(userConf, (0, _cloneDeep2.default)(defaultConf));
	  console.log(userConf);
	  console.log(conf);
	  (0, _assign2.default)(conf, computeMinMax(conf, meta), computeRadius(conf, instance));
	  return conf;
	};

	exports.getConf = getConf;

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(89),
	    copyObject = __webpack_require__(88),
	    createAssigner = __webpack_require__(97),
	    isArrayLike = __webpack_require__(78),
	    isPrototype = __webpack_require__(72),
	    keys = __webpack_require__(103);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

	module.exports = assign;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.smartBorders = smartBorders;
	exports.computeMinMax = computeMinMax;

	var _sortBy = __webpack_require__(212);

	var _sortBy2 = _interopRequireDefault(_sortBy);

	var _flow = __webpack_require__(263);

	var _flow2 = _interopRequireDefault(_flow);

	var _concat = __webpack_require__(266);

	var _concat2 = _interopRequireDefault(_concat);

	var _filter = __webpack_require__(268);

	var _filter2 = _interopRequireDefault(_filter);

	var _first = __webpack_require__(271);

	var _first2 = _interopRequireDefault(_first);

	var _reverse = __webpack_require__(275);

	var _reverse2 = _interopRequireDefault(_reverse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function smartBorders(conf, layout, tracks) {
	  var width = conf.defaultTrackWidth || 30;

	  var externalTrack = (0, _flow2.default)((0, _filter2.default)('conf.outerRadius'), (0, _sortBy2.default)('conf.outerRadius'), _reverse2.default, _first2.default)((0, _concat2.default)(tracks, layout));

	  return {
	    in: externalTrack.conf.outerRadius,
	    out: externalTrack.conf.outerRadius + width
	  };
	}

	function computeMinMax(conf, meta) {
	  conf.cmin = conf.min === 'smart' ? meta.min : conf.min;
	  conf.cmax = conf.max === 'smart' ? meta.max : conf.max;
	  return conf;
	}

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var convert = __webpack_require__(213),
	    func = convert('sortBy', __webpack_require__(179));

	func.placeholder = __webpack_require__(216);
	module.exports = func;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var baseConvert = __webpack_require__(214),
	    util = __webpack_require__(217);

	/**
	 * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
	 * version with conversion `options` applied. If `name` is an object its methods
	 * will be converted.
	 *
	 * @param {string} name The name of the function to wrap.
	 * @param {Function} [func] The function to wrap.
	 * @param {Object} [options] The options object. See `baseConvert` for more details.
	 * @returns {Function|Object} Returns the converted function or object.
	 */
	function convert(name, func, options) {
	  return baseConvert(util, name, func, options);
	}

	module.exports = convert;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var mapping = __webpack_require__(215),
	    fallbackHolder = __webpack_require__(216);

	/** Built-in value reference. */
	var push = Array.prototype.push;

	/**
	 * Creates a function, with an arity of `n`, that invokes `func` with the
	 * arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} n The arity of the new function.
	 * @returns {Function} Returns the new function.
	 */
	function baseArity(func, n) {
	  return n == 2
	    ? function(a, b) { return func.apply(undefined, arguments); }
	    : function(a) { return func.apply(undefined, arguments); };
	}

	/**
	 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
	 * any additional arguments.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @param {number} n The arity cap.
	 * @returns {Function} Returns the new function.
	 */
	function baseAry(func, n) {
	  return n == 2
	    ? function(a, b) { return func(a, b); }
	    : function(a) { return func(a); };
	}

	/**
	 * Creates a clone of `array`.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the cloned array.
	 */
	function cloneArray(array) {
	  var length = array ? array.length : 0,
	      result = Array(length);

	  while (length--) {
	    result[length] = array[length];
	  }
	  return result;
	}

	/**
	 * Creates a function that clones a given object using the assignment `func`.
	 *
	 * @private
	 * @param {Function} func The assignment function.
	 * @returns {Function} Returns the new cloner function.
	 */
	function createCloner(func) {
	  return function(object) {
	    return func({}, object);
	  };
	}

	/**
	 * A specialized version of `_.spread` which flattens the spread array into
	 * the arguments of the invoked `func`.
	 *
	 * @private
	 * @param {Function} func The function to spread arguments over.
	 * @param {number} start The start position of the spread.
	 * @returns {Function} Returns the new function.
	 */
	function flatSpread(func, start) {
	  return function() {
	    var length = arguments.length,
	        lastIndex = length - 1,
	        args = Array(length);

	    while (length--) {
	      args[length] = arguments[length];
	    }
	    var array = args[start],
	        otherArgs = args.slice(0, start);

	    if (array) {
	      push.apply(otherArgs, array);
	    }
	    if (start != lastIndex) {
	      push.apply(otherArgs, args.slice(start + 1));
	    }
	    return func.apply(this, otherArgs);
	  };
	}

	/**
	 * Creates a function that wraps `func` and uses `cloner` to clone the first
	 * argument it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} cloner The function to clone arguments.
	 * @returns {Function} Returns the new immutable function.
	 */
	function wrapImmutable(func, cloner) {
	  return function() {
	    var length = arguments.length;
	    if (!length) {
	      return;
	    }
	    var args = Array(length);
	    while (length--) {
	      args[length] = arguments[length];
	    }
	    var result = args[0] = cloner.apply(undefined, args);
	    func.apply(undefined, args);
	    return result;
	  };
	}

	/**
	 * The base implementation of `convert` which accepts a `util` object of methods
	 * required to perform conversions.
	 *
	 * @param {Object} util The util object.
	 * @param {string} name The name of the function to convert.
	 * @param {Function} func The function to convert.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
	 * @param {boolean} [options.curry=true] Specify currying.
	 * @param {boolean} [options.fixed=true] Specify fixed arity.
	 * @param {boolean} [options.immutable=true] Specify immutable operations.
	 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
	 * @returns {Function|Object} Returns the converted function or object.
	 */
	function baseConvert(util, name, func, options) {
	  var setPlaceholder,
	      isLib = typeof name == 'function',
	      isObj = name === Object(name);

	  if (isObj) {
	    options = func;
	    func = name;
	    name = undefined;
	  }
	  if (func == null) {
	    throw new TypeError;
	  }
	  options || (options = {});

	  var config = {
	    'cap': 'cap' in options ? options.cap : true,
	    'curry': 'curry' in options ? options.curry : true,
	    'fixed': 'fixed' in options ? options.fixed : true,
	    'immutable': 'immutable' in options ? options.immutable : true,
	    'rearg': 'rearg' in options ? options.rearg : true
	  };

	  var forceCurry = ('curry' in options) && options.curry,
	      forceFixed = ('fixed' in options) && options.fixed,
	      forceRearg = ('rearg' in options) && options.rearg,
	      placeholder = isLib ? func : fallbackHolder,
	      pristine = isLib ? func.runInContext() : undefined;

	  var helpers = isLib ? func : {
	    'ary': util.ary,
	    'assign': util.assign,
	    'clone': util.clone,
	    'curry': util.curry,
	    'forEach': util.forEach,
	    'isArray': util.isArray,
	    'isFunction': util.isFunction,
	    'iteratee': util.iteratee,
	    'keys': util.keys,
	    'rearg': util.rearg,
	    'toInteger': util.toInteger,
	    'toPath': util.toPath
	  };

	  var ary = helpers.ary,
	      assign = helpers.assign,
	      clone = helpers.clone,
	      curry = helpers.curry,
	      each = helpers.forEach,
	      isArray = helpers.isArray,
	      isFunction = helpers.isFunction,
	      keys = helpers.keys,
	      rearg = helpers.rearg,
	      toInteger = helpers.toInteger,
	      toPath = helpers.toPath;

	  var aryMethodKeys = keys(mapping.aryMethod);

	  var wrappers = {
	    'castArray': function(castArray) {
	      return function() {
	        var value = arguments[0];
	        return isArray(value)
	          ? castArray(cloneArray(value))
	          : castArray.apply(undefined, arguments);
	      };
	    },
	    'iteratee': function(iteratee) {
	      return function() {
	        var func = arguments[0],
	            arity = arguments[1],
	            result = iteratee(func, arity),
	            length = result.length;

	        if (config.cap && typeof arity == 'number') {
	          arity = arity > 2 ? (arity - 2) : 1;
	          return (length && length <= arity) ? result : baseAry(result, arity);
	        }
	        return result;
	      };
	    },
	    'mixin': function(mixin) {
	      return function(source) {
	        var func = this;
	        if (!isFunction(func)) {
	          return mixin(func, Object(source));
	        }
	        var pairs = [];
	        each(keys(source), function(key) {
	          if (isFunction(source[key])) {
	            pairs.push([key, func.prototype[key]]);
	          }
	        });

	        mixin(func, Object(source));

	        each(pairs, function(pair) {
	          var value = pair[1];
	          if (isFunction(value)) {
	            func.prototype[pair[0]] = value;
	          } else {
	            delete func.prototype[pair[0]];
	          }
	        });
	        return func;
	      };
	    },
	    'nthArg': function(nthArg) {
	      return function(n) {
	        var arity = n < 0 ? 1 : (toInteger(n) + 1);
	        return curry(nthArg(n), arity);
	      };
	    },
	    'rearg': function(rearg) {
	      return function(func, indexes) {
	        var arity = indexes ? indexes.length : 0;
	        return curry(rearg(func, indexes), arity);
	      };
	    },
	    'runInContext': function(runInContext) {
	      return function(context) {
	        return baseConvert(util, runInContext(context), options);
	      };
	    }
	  };

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Casts `func` to a function with an arity capped iteratee if needed.
	   *
	   * @private
	   * @param {string} name The name of the function to inspect.
	   * @param {Function} func The function to inspect.
	   * @returns {Function} Returns the cast function.
	   */
	  function castCap(name, func) {
	    if (config.cap) {
	      var indexes = mapping.iterateeRearg[name];
	      if (indexes) {
	        return iterateeRearg(func, indexes);
	      }
	      var n = !isLib && mapping.iterateeAry[name];
	      if (n) {
	        return iterateeAry(func, n);
	      }
	    }
	    return func;
	  }

	  /**
	   * Casts `func` to a curried function if needed.
	   *
	   * @private
	   * @param {string} name The name of the function to inspect.
	   * @param {Function} func The function to inspect.
	   * @param {number} n The arity of `func`.
	   * @returns {Function} Returns the cast function.
	   */
	  function castCurry(name, func, n) {
	    return (forceCurry || (config.curry && n > 1))
	      ? curry(func, n)
	      : func;
	  }

	  /**
	   * Casts `func` to a fixed arity function if needed.
	   *
	   * @private
	   * @param {string} name The name of the function to inspect.
	   * @param {Function} func The function to inspect.
	   * @param {number} n The arity cap.
	   * @returns {Function} Returns the cast function.
	   */
	  function castFixed(name, func, n) {
	    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
	      var data = mapping.methodSpread[name],
	          start = data && data.start;

	      return start  === undefined ? ary(func, n) : flatSpread(func, start);
	    }
	    return func;
	  }

	  /**
	   * Casts `func` to an rearged function if needed.
	   *
	   * @private
	   * @param {string} name The name of the function to inspect.
	   * @param {Function} func The function to inspect.
	   * @param {number} n The arity of `func`.
	   * @returns {Function} Returns the cast function.
	   */
	  function castRearg(name, func, n) {
	    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
	      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
	      : func;
	  }

	  /**
	   * Creates a clone of `object` by `path`.
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @param {Array|string} path The path to clone by.
	   * @returns {Object} Returns the cloned object.
	   */
	  function cloneByPath(object, path) {
	    path = toPath(path);

	    var index = -1,
	        length = path.length,
	        lastIndex = length - 1,
	        result = clone(Object(object)),
	        nested = result;

	    while (nested != null && ++index < length) {
	      var key = path[index],
	          value = nested[key];

	      if (value != null) {
	        nested[path[index]] = clone(index == lastIndex ? value : Object(value));
	      }
	      nested = nested[key];
	    }
	    return result;
	  }

	  /**
	   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
	   * version with conversion `options` applied.
	   *
	   * @param {Object} [options] The options object. See `baseConvert` for more details.
	   * @returns {Function} Returns the converted `lodash`.
	   */
	  function convertLib(options) {
	    return _.runInContext.convert(options)(undefined);
	  }

	  /**
	   * Create a converter function for `func` of `name`.
	   *
	   * @param {string} name The name of the function to convert.
	   * @param {Function} func The function to convert.
	   * @returns {Function} Returns the new converter function.
	   */
	  function createConverter(name, func) {
	    var realName = mapping.aliasToReal[name] || name,
	        methodName = mapping.remap[realName] || realName,
	        oldOptions = options;

	    return function(options) {
	      var newUtil = isLib ? pristine : helpers,
	          newFunc = isLib ? pristine[methodName] : func,
	          newOptions = assign(assign({}, oldOptions), options);

	      return baseConvert(newUtil, realName, newFunc, newOptions);
	    };
	  }

	  /**
	   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
	   * arguments, ignoring any additional arguments.
	   *
	   * @private
	   * @param {Function} func The function to cap iteratee arguments for.
	   * @param {number} n The arity cap.
	   * @returns {Function} Returns the new function.
	   */
	  function iterateeAry(func, n) {
	    return overArg(func, function(func) {
	      return typeof func == 'function' ? baseAry(func, n) : func;
	    });
	  }

	  /**
	   * Creates a function that wraps `func` to invoke its iteratee with arguments
	   * arranged according to the specified `indexes` where the argument value at
	   * the first index is provided as the first argument, the argument value at
	   * the second index is provided as the second argument, and so on.
	   *
	   * @private
	   * @param {Function} func The function to rearrange iteratee arguments for.
	   * @param {number[]} indexes The arranged argument indexes.
	   * @returns {Function} Returns the new function.
	   */
	  function iterateeRearg(func, indexes) {
	    return overArg(func, function(func) {
	      var n = indexes.length;
	      return baseArity(rearg(baseAry(func, n), indexes), n);
	    });
	  }

	  /**
	   * Creates a function that invokes `func` with its first argument transformed.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {Function} transform The argument transform.
	   * @returns {Function} Returns the new function.
	   */
	  function overArg(func, transform) {
	    return function() {
	      var length = arguments.length;
	      if (!length) {
	        return func();
	      }
	      var args = Array(length);
	      while (length--) {
	        args[length] = arguments[length];
	      }
	      var index = config.rearg ? 0 : (length - 1);
	      args[index] = transform(args[index]);
	      return func.apply(undefined, args);
	    };
	  }

	  /**
	   * Creates a function that wraps `func` and applys the conversions
	   * rules by `name`.
	   *
	   * @private
	   * @param {string} name The name of the function to wrap.
	   * @param {Function} func The function to wrap.
	   * @returns {Function} Returns the converted function.
	   */
	  function wrap(name, func) {
	    var result,
	        realName = mapping.aliasToReal[name] || name,
	        wrapped = func,
	        wrapper = wrappers[realName];

	    if (wrapper) {
	      wrapped = wrapper(func);
	    }
	    else if (config.immutable) {
	      if (mapping.mutate.array[realName]) {
	        wrapped = wrapImmutable(func, cloneArray);
	      }
	      else if (mapping.mutate.object[realName]) {
	        wrapped = wrapImmutable(func, createCloner(func));
	      }
	      else if (mapping.mutate.set[realName]) {
	        wrapped = wrapImmutable(func, cloneByPath);
	      }
	    }
	    each(aryMethodKeys, function(aryKey) {
	      each(mapping.aryMethod[aryKey], function(otherName) {
	        if (realName == otherName) {
	          var data = mapping.methodSpread[realName],
	              afterRearg = data && data.afterRearg;

	          result = afterRearg
	            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
	            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

	          result = castCap(realName, result);
	          result = castCurry(realName, result, aryKey);
	          return false;
	        }
	      });
	      return !result;
	    });

	    result || (result = wrapped);
	    if (result == func) {
	      result = forceCurry ? curry(result, 1) : function() {
	        return func.apply(this, arguments);
	      };
	    }
	    result.convert = createConverter(realName, func);
	    if (mapping.placeholder[realName]) {
	      setPlaceholder = true;
	      result.placeholder = func.placeholder = placeholder;
	    }
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  if (!isObj) {
	    return wrap(name, func);
	  }
	  var _ = func;

	  // Convert methods by ary cap.
	  var pairs = [];
	  each(aryMethodKeys, function(aryKey) {
	    each(mapping.aryMethod[aryKey], function(key) {
	      var func = _[mapping.remap[key] || key];
	      if (func) {
	        pairs.push([key, wrap(key, func)]);
	      }
	    });
	  });

	  // Convert remaining methods.
	  each(keys(_), function(key) {
	    var func = _[key];
	    if (typeof func == 'function') {
	      var length = pairs.length;
	      while (length--) {
	        if (pairs[length][0] == key) {
	          return;
	        }
	      }
	      func.convert = createConverter(key, func);
	      pairs.push([key, func]);
	    }
	  });

	  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
	  each(pairs, function(pair) {
	    _[pair[0]] = pair[1];
	  });

	  _.convert = convertLib;
	  if (setPlaceholder) {
	    _.placeholder = placeholder;
	  }
	  // Assign aliases.
	  each(keys(_), function(key) {
	    each(mapping.realToAlias[key] || [], function(alias) {
	      _[alias] = _[key];
	    });
	  });

	  return _;
	}

	module.exports = baseConvert;


/***/ },
/* 215 */
/***/ function(module, exports) {

	/** Used to map aliases to their real names. */
	exports.aliasToReal = {

	  // Lodash aliases.
	  'each': 'forEach',
	  'eachRight': 'forEachRight',
	  'entries': 'toPairs',
	  'entriesIn': 'toPairsIn',
	  'extend': 'assignIn',
	  'extendAll': 'assignInAll',
	  'extendAllWith': 'assignInAllWith',
	  'extendWith': 'assignInWith',
	  'first': 'head',

	  // Methods that are curried variants of others.
	  'conforms': 'conformsTo',
	  'matches': 'isMatch',
	  'property': 'get',

	  // Ramda aliases.
	  '__': 'placeholder',
	  'F': 'stubFalse',
	  'T': 'stubTrue',
	  'all': 'every',
	  'allPass': 'overEvery',
	  'always': 'constant',
	  'any': 'some',
	  'anyPass': 'overSome',
	  'apply': 'spread',
	  'assoc': 'set',
	  'assocPath': 'set',
	  'complement': 'negate',
	  'compose': 'flowRight',
	  'contains': 'includes',
	  'dissoc': 'unset',
	  'dissocPath': 'unset',
	  'dropLast': 'dropRight',
	  'dropLastWhile': 'dropRightWhile',
	  'equals': 'isEqual',
	  'identical': 'eq',
	  'indexBy': 'keyBy',
	  'init': 'initial',
	  'invertObj': 'invert',
	  'juxt': 'over',
	  'omitAll': 'omit',
	  'nAry': 'ary',
	  'path': 'get',
	  'pathEq': 'matchesProperty',
	  'pathOr': 'getOr',
	  'paths': 'at',
	  'pickAll': 'pick',
	  'pipe': 'flow',
	  'pluck': 'map',
	  'prop': 'get',
	  'propEq': 'matchesProperty',
	  'propOr': 'getOr',
	  'props': 'at',
	  'symmetricDifference': 'xor',
	  'symmetricDifferenceBy': 'xorBy',
	  'symmetricDifferenceWith': 'xorWith',
	  'takeLast': 'takeRight',
	  'takeLastWhile': 'takeRightWhile',
	  'unapply': 'rest',
	  'unnest': 'flatten',
	  'useWith': 'overArgs',
	  'where': 'conformsTo',
	  'whereEq': 'isMatch',
	  'zipObj': 'zipObject'
	};

	/** Used to map ary to method names. */
	exports.aryMethod = {
	  '1': [
	    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
	    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
	    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
	    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
	    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
	    'uniqueId', 'words', 'zipAll'
	  ],
	  '2': [
	    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
	    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
	    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
	    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
	    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
	    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
	    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
	    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
	    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
	    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
	    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
	    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
	    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
	    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
	    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
	    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
	    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
	    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
	    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
	    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
	    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
	    'zipObjectDeep'
	  ],
	  '3': [
	    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
	    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
	    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
	    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
	    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
	    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
	    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
	    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
	    'xorWith', 'zipWith'
	  ],
	  '4': [
	    'fill', 'setWith', 'updateWith'
	  ]
	};

	/** Used to map ary to rearg configs. */
	exports.aryRearg = {
	  '2': [1, 0],
	  '3': [2, 0, 1],
	  '4': [3, 2, 0, 1]
	};

	/** Used to map method names to their iteratee ary. */
	exports.iterateeAry = {
	  'dropRightWhile': 1,
	  'dropWhile': 1,
	  'every': 1,
	  'filter': 1,
	  'find': 1,
	  'findFrom': 1,
	  'findIndex': 1,
	  'findIndexFrom': 1,
	  'findKey': 1,
	  'findLast': 1,
	  'findLastFrom': 1,
	  'findLastIndex': 1,
	  'findLastIndexFrom': 1,
	  'findLastKey': 1,
	  'flatMap': 1,
	  'flatMapDeep': 1,
	  'flatMapDepth': 1,
	  'forEach': 1,
	  'forEachRight': 1,
	  'forIn': 1,
	  'forInRight': 1,
	  'forOwn': 1,
	  'forOwnRight': 1,
	  'map': 1,
	  'mapKeys': 1,
	  'mapValues': 1,
	  'partition': 1,
	  'reduce': 2,
	  'reduceRight': 2,
	  'reject': 1,
	  'remove': 1,
	  'some': 1,
	  'takeRightWhile': 1,
	  'takeWhile': 1,
	  'times': 1,
	  'transform': 2
	};

	/** Used to map method names to iteratee rearg configs. */
	exports.iterateeRearg = {
	  'mapKeys': [1],
	  'reduceRight': [1, 0]
	};

	/** Used to map method names to rearg configs. */
	exports.methodRearg = {
	  'assignInAllWith': [1, 0],
	  'assignInWith': [1, 2, 0],
	  'assignAllWith': [1, 0],
	  'assignWith': [1, 2, 0],
	  'differenceBy': [1, 2, 0],
	  'differenceWith': [1, 2, 0],
	  'getOr': [2, 1, 0],
	  'intersectionBy': [1, 2, 0],
	  'intersectionWith': [1, 2, 0],
	  'isEqualWith': [1, 2, 0],
	  'isMatchWith': [2, 1, 0],
	  'mergeAllWith': [1, 0],
	  'mergeWith': [1, 2, 0],
	  'padChars': [2, 1, 0],
	  'padCharsEnd': [2, 1, 0],
	  'padCharsStart': [2, 1, 0],
	  'pullAllBy': [2, 1, 0],
	  'pullAllWith': [2, 1, 0],
	  'rangeStep': [1, 2, 0],
	  'rangeStepRight': [1, 2, 0],
	  'setWith': [3, 1, 2, 0],
	  'sortedIndexBy': [2, 1, 0],
	  'sortedLastIndexBy': [2, 1, 0],
	  'unionBy': [1, 2, 0],
	  'unionWith': [1, 2, 0],
	  'updateWith': [3, 1, 2, 0],
	  'xorBy': [1, 2, 0],
	  'xorWith': [1, 2, 0],
	  'zipWith': [1, 2, 0]
	};

	/** Used to map method names to spread configs. */
	exports.methodSpread = {
	  'assignAll': { 'start': 0 },
	  'assignAllWith': { 'start': 0 },
	  'assignInAll': { 'start': 0 },
	  'assignInAllWith': { 'start': 0 },
	  'defaultsAll': { 'start': 0 },
	  'defaultsDeepAll': { 'start': 0 },
	  'invokeArgs': { 'start': 2 },
	  'invokeArgsMap': { 'start': 2 },
	  'mergeAll': { 'start': 0 },
	  'mergeAllWith': { 'start': 0 },
	  'partial': { 'start': 1 },
	  'partialRight': { 'start': 1 },
	  'without': { 'start': 1 },
	  'zipAll': { 'start': 0 }
	};

	/** Used to identify methods which mutate arrays or objects. */
	exports.mutate = {
	  'array': {
	    'fill': true,
	    'pull': true,
	    'pullAll': true,
	    'pullAllBy': true,
	    'pullAllWith': true,
	    'pullAt': true,
	    'remove': true,
	    'reverse': true
	  },
	  'object': {
	    'assign': true,
	    'assignAll': true,
	    'assignAllWith': true,
	    'assignIn': true,
	    'assignInAll': true,
	    'assignInAllWith': true,
	    'assignInWith': true,
	    'assignWith': true,
	    'defaults': true,
	    'defaultsAll': true,
	    'defaultsDeep': true,
	    'defaultsDeepAll': true,
	    'merge': true,
	    'mergeAll': true,
	    'mergeAllWith': true,
	    'mergeWith': true,
	  },
	  'set': {
	    'set': true,
	    'setWith': true,
	    'unset': true,
	    'update': true,
	    'updateWith': true
	  }
	};

	/** Used to track methods with placeholder support */
	exports.placeholder = {
	  'bind': true,
	  'bindKey': true,
	  'curry': true,
	  'curryRight': true,
	  'partial': true,
	  'partialRight': true
	};

	/** Used to map real names to their aliases. */
	exports.realToAlias = (function() {
	  var hasOwnProperty = Object.prototype.hasOwnProperty,
	      object = exports.aliasToReal,
	      result = {};

	  for (var key in object) {
	    var value = object[key];
	    if (hasOwnProperty.call(result, value)) {
	      result[value].push(key);
	    } else {
	      result[value] = [key];
	    }
	  }
	  return result;
	}());

	/** Used to map method names to other names. */
	exports.remap = {
	  'assignAll': 'assign',
	  'assignAllWith': 'assignWith',
	  'assignInAll': 'assignIn',
	  'assignInAllWith': 'assignInWith',
	  'curryN': 'curry',
	  'curryRightN': 'curryRight',
	  'defaultsAll': 'defaults',
	  'defaultsDeepAll': 'defaultsDeep',
	  'findFrom': 'find',
	  'findIndexFrom': 'findIndex',
	  'findLastFrom': 'findLast',
	  'findLastIndexFrom': 'findLastIndex',
	  'getOr': 'get',
	  'includesFrom': 'includes',
	  'indexOfFrom': 'indexOf',
	  'invokeArgs': 'invoke',
	  'invokeArgsMap': 'invokeMap',
	  'lastIndexOfFrom': 'lastIndexOf',
	  'mergeAll': 'merge',
	  'mergeAllWith': 'mergeWith',
	  'padChars': 'pad',
	  'padCharsEnd': 'padEnd',
	  'padCharsStart': 'padStart',
	  'propertyOf': 'get',
	  'rangeStep': 'range',
	  'rangeStepRight': 'rangeRight',
	  'restFrom': 'rest',
	  'spreadFrom': 'spread',
	  'trimChars': 'trim',
	  'trimCharsEnd': 'trimEnd',
	  'trimCharsStart': 'trimStart',
	  'zipAll': 'zip'
	};

	/** Used to track methods that skip fixing their arity. */
	exports.skipFixed = {
	  'castArray': true,
	  'flow': true,
	  'flowRight': true,
	  'iteratee': true,
	  'mixin': true,
	  'rearg': true,
	  'runInContext': true
	};

	/** Used to track methods that skip rearranging arguments. */
	exports.skipRearg = {
	  'add': true,
	  'assign': true,
	  'assignIn': true,
	  'bind': true,
	  'bindKey': true,
	  'concat': true,
	  'difference': true,
	  'divide': true,
	  'eq': true,
	  'gt': true,
	  'gte': true,
	  'isEqual': true,
	  'lt': true,
	  'lte': true,
	  'matchesProperty': true,
	  'merge': true,
	  'multiply': true,
	  'overArgs': true,
	  'partial': true,
	  'partialRight': true,
	  'propertyOf': true,
	  'random': true,
	  'range': true,
	  'rangeRight': true,
	  'subtract': true,
	  'zip': true,
	  'zipObject': true,
	  'zipObjectDeep': true
	};


/***/ },
/* 216 */
/***/ function(module, exports) {

	/**
	 * The default argument placeholder value for methods.
	 *
	 * @type {Object}
	 */
	module.exports = {};


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  'ary': __webpack_require__(218),
	  'assign': __webpack_require__(112),
	  'clone': __webpack_require__(256),
	  'curry': __webpack_require__(257),
	  'forEach': __webpack_require__(100),
	  'isArray': __webpack_require__(76),
	  'isFunction': __webpack_require__(12),
	  'iteratee': __webpack_require__(258),
	  'keys': __webpack_require__(104),
	  'rearg': __webpack_require__(259),
	  'toInteger': __webpack_require__(255),
	  'toPath': __webpack_require__(262)
	};


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var createWrap = __webpack_require__(219);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_ARY_FLAG = 128;

	/**
	 * Creates a function that invokes `func`, with up to `n` arguments,
	 * ignoring any additional arguments.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {Function} func The function to cap arguments for.
	 * @param {number} [n=func.length] The arity cap.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the new capped function.
	 * @example
	 *
	 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	 * // => [6, 8, 10]
	 */
	function ary(func, n, guard) {
	  n = guard ? undefined : n;
	  n = (func && n == null) ? func.length : n;
	  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
	}

	module.exports = ary;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(220),
	    createBind = __webpack_require__(222),
	    createCurry = __webpack_require__(224),
	    createHybrid = __webpack_require__(225),
	    createPartial = __webpack_require__(253),
	    getData = __webpack_require__(233),
	    mergeData = __webpack_require__(254),
	    setData = __webpack_require__(240),
	    setWrapToString = __webpack_require__(241),
	    toInteger = __webpack_require__(255);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_CURRY_RIGHT_FLAG = 16,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_PARTIAL_RIGHT_FLAG = 64;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags.
	 *    1 - `_.bind`
	 *    2 - `_.bindKey`
	 *    4 - `_.curry` or `_.curryRight` of a bound function
	 *    8 - `_.curry`
	 *   16 - `_.curryRight`
	 *   32 - `_.partial`
	 *   64 - `_.partialRight`
	 *  128 - `_.rearg`
	 *  256 - `_.ary`
	 *  512 - `_.flip`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	  arity = arity === undefined ? arity : toInteger(arity);
	  length -= holders ? holders.length : 0;

	  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;

	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func);

	  var newData = [
	    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	    argPos, ary, arity
	  ];

	  if (data) {
	    mergeData(newData, data);
	  }
	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] === undefined
	    ? (isBindKey ? 0 : func.length)
	    : nativeMax(newData[9] - length, 0);

	  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
	    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
	  }
	  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
	    var result = createBind(func, bitmask, thisArg);
	  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
	    result = createCurry(func, bitmask, arity);
	  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
	    result = createPartial(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybrid.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setWrapToString(setter(result, newData), func, bitmask);
	}

	module.exports = createWrap;


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(4),
	    metaMap = __webpack_require__(221);

	/**
	 * The base implementation of `setData` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};

	module.exports = baseSetData;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var WeakMap = __webpack_require__(128);

	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;

	module.exports = metaMap;


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var createCtor = __webpack_require__(223),
	    root = __webpack_require__(15);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBind(func, bitmask, thisArg) {
	  var isBind = bitmask & WRAP_BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}

	module.exports = createBind;


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(69),
	    isObject = __webpack_require__(19);

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}

	module.exports = createCtor;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(2),
	    createCtor = __webpack_require__(223),
	    createHybrid = __webpack_require__(225),
	    createRecurry = __webpack_require__(229),
	    getHolder = __webpack_require__(250),
	    replaceHolders = __webpack_require__(252),
	    root = __webpack_require__(15);

	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurry(func, bitmask, arity) {
	  var Ctor = createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getHolder(wrapper);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	      ? []
	      : replaceHolders(args, placeholder);

	    length -= holders.length;
	    if (length < arity) {
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}

	module.exports = createCurry;


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(226),
	    composeArgsRight = __webpack_require__(227),
	    countHolders = __webpack_require__(228),
	    createCtor = __webpack_require__(223),
	    createRecurry = __webpack_require__(229),
	    getHolder = __webpack_require__(250),
	    reorder = __webpack_require__(251),
	    replaceHolders = __webpack_require__(252),
	    root = __webpack_require__(15);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_CURRY_RIGHT_FLAG = 16,
	    WRAP_ARY_FLAG = 128,
	    WRAP_FLIP_FLAG = 512;

	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & WRAP_ARY_FLAG,
	      isBind = bitmask & WRAP_BIND_FLAG,
	      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
	      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
	      isFlip = bitmask & WRAP_FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length;

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getHolder(wrapper),
	          holdersCount = countHolders(args, placeholder);
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders, isCurried);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
	    }
	    length -= holdersCount;
	    if (isCurried && length < arity) {
	      var newHolders = replaceHolders(args, placeholder);
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
	        args, newHolders, argPos, ary, arity - length
	      );
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;

	    length = args.length;
	    if (argPos) {
	      args = reorder(args, argPos);
	    } else if (isFlip && length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < length) {
	      args.length = ary;
	    }
	    if (this && this !== root && this instanceof wrapper) {
	      fn = Ctor || createCtor(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}

	module.exports = createHybrid;


/***/ },
/* 226 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersLength = holders.length,
	      leftIndex = -1,
	      leftLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(leftLength + rangeLength),
	      isUncurried = !isCurried;

	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[holders[argsIndex]] = args[argsIndex];
	    }
	  }
	  while (rangeLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}

	module.exports = composeArgs;


/***/ },
/* 227 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersIndex = -1,
	      holdersLength = holders.length,
	      rightIndex = -1,
	      rightLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(rangeLength + rightLength),
	      isUncurried = !isCurried;

	  while (++argsIndex < rangeLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[offset + holders[holdersIndex]] = args[argsIndex++];
	    }
	  }
	  return result;
	}

	module.exports = composeArgsRight;


/***/ },
/* 228 */
/***/ function(module, exports) {

	/**
	 * Gets the number of `placeholder` occurrences in `array`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} placeholder The placeholder to search for.
	 * @returns {number} Returns the placeholder count.
	 */
	function countHolders(array, placeholder) {
	  var length = array.length,
	      result = 0;

	  while (length--) {
	    if (array[length] === placeholder) {
	      ++result;
	    }
	  }
	  return result;
	}

	module.exports = countHolders;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(230),
	    setData = __webpack_require__(240),
	    setWrapToString = __webpack_require__(241);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_BOUND_FLAG = 4,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_PARTIAL_RIGHT_FLAG = 64;

	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & WRAP_CURRY_FLAG,
	      newHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;

	  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
	  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

	  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
	    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
	  }
	  var newData = [
	    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
	    newHoldersRight, argPos, ary, arity
	  ];

	  var result = wrapFunc.apply(undefined, newData);
	  if (isLaziable(func)) {
	    setData(result, newData);
	  }
	  result.placeholder = placeholder;
	  return setWrapToString(result, func, bitmask);
	}

	module.exports = createRecurry;


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(231),
	    getData = __webpack_require__(233),
	    getFuncName = __webpack_require__(235),
	    lodash = __webpack_require__(237);

	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	 *  else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];

	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}

	module.exports = isLaziable;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(69),
	    baseLodash = __webpack_require__(232);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @constructor
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}

	// Ensure `LazyWrapper` is an instance of `baseLodash`.
	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;

	module.exports = LazyWrapper;


/***/ },
/* 232 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype chain sequence wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}

	module.exports = baseLodash;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var metaMap = __webpack_require__(221),
	    noop = __webpack_require__(234);

	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function(func) {
	  return metaMap.get(func);
	};

	module.exports = getData;


/***/ },
/* 234 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(236);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}

	module.exports = getFuncName;


/***/ },
/* 236 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};

	module.exports = realNames;


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(231),
	    LodashWrapper = __webpack_require__(238),
	    baseLodash = __webpack_require__(232),
	    isArray = __webpack_require__(76),
	    isObjectLike = __webpack_require__(75),
	    wrapperClone = __webpack_require__(239);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chain sequences. Methods that operate on and return arrays, collections,
	 * and functions can be chained together. Methods that retrieve a single value
	 * or may return a primitive value will automatically end the chain sequence
	 * and return the unwrapped value. Otherwise, the value must be unwrapped
	 * with `_#value`.
	 *
	 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	 * enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion.
	 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	 * the creation of intermediate arrays and can greatly reduce the number of
	 * iteratee executions. Sections of a chain sequence qualify for shortcut
	 * fusion if the section is applied to an array and iteratees accept only
	 * one argument. The heuristic for whether a section qualifies for shortcut
	 * fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	 * `zipObject`, `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	 * `upperFirst`, `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}

	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;
	lodash.prototype.constructor = lodash;

	module.exports = lodash;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(69),
	    baseLodash = __webpack_require__(232);

	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable explicit method chain sequences.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}

	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;

	module.exports = LodashWrapper;


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(231),
	    LodashWrapper = __webpack_require__(238),
	    copyArray = __webpack_require__(67);

	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = copyArray(wrapper.__actions__);
	  result.__index__  = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}

	module.exports = wrapperClone;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(220),
	    shortOut = __webpack_require__(24);

	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity
	 * function to avoid garbage collection pauses in V8. See
	 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = shortOut(baseSetData);

	module.exports = setData;


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var getWrapDetails = __webpack_require__(242),
	    insertWrapDetails = __webpack_require__(243),
	    setToString = __webpack_require__(6),
	    updateWrapDetails = __webpack_require__(244);

	/**
	 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	 * with wrapper details in a comment at the top of the source body.
	 *
	 * @private
	 * @param {Function} wrapper The function to modify.
	 * @param {Function} reference The reference function.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Function} Returns `wrapper`.
	 */
	function setWrapToString(wrapper, reference, bitmask) {
	  var source = (reference + '');
	  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
	}

	module.exports = setWrapToString;


/***/ },
/* 242 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	    reSplitDetails = /,? & /;

	/**
	 * Extracts wrapper details from the `source` body comment.
	 *
	 * @private
	 * @param {string} source The source to inspect.
	 * @returns {Array} Returns the wrapper details.
	 */
	function getWrapDetails(source) {
	  var match = source.match(reWrapDetails);
	  return match ? match[1].split(reSplitDetails) : [];
	}

	module.exports = getWrapDetails;


/***/ },
/* 243 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

	/**
	 * Inserts wrapper `details` in a comment at the top of the `source` body.
	 *
	 * @private
	 * @param {string} source The source to modify.
	 * @returns {Array} details The details to insert.
	 * @returns {string} Returns the modified source.
	 */
	function insertWrapDetails(source, details) {
	  var length = details.length;
	  if (!length) {
	    return source;
	  }
	  var lastIndex = length - 1;
	  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	  details = details.join(length > 2 ? ', ' : ' ');
	  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}

	module.exports = insertWrapDetails;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(100),
	    arrayIncludes = __webpack_require__(245);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_CURRY_RIGHT_FLAG = 16,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_PARTIAL_RIGHT_FLAG = 64,
	    WRAP_ARY_FLAG = 128,
	    WRAP_REARG_FLAG = 256,
	    WRAP_FLIP_FLAG = 512;

	/** Used to associate wrap methods with their bit flags. */
	var wrapFlags = [
	  ['ary', WRAP_ARY_FLAG],
	  ['bind', WRAP_BIND_FLAG],
	  ['bindKey', WRAP_BIND_KEY_FLAG],
	  ['curry', WRAP_CURRY_FLAG],
	  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
	  ['flip', WRAP_FLIP_FLAG],
	  ['partial', WRAP_PARTIAL_FLAG],
	  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
	  ['rearg', WRAP_REARG_FLAG]
	];

	/**
	 * Updates wrapper `details` based on `bitmask` flags.
	 *
	 * @private
	 * @returns {Array} details The details to modify.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Array} Returns `details`.
	 */
	function updateWrapDetails(details, bitmask) {
	  arrayEach(wrapFlags, function(pair) {
	    var value = '_.' + pair[0];
	    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
	      details.push(value);
	    }
	  });
	  return details.sort();
	}

	module.exports = updateWrapDetails;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(246);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(247),
	    baseIsNaN = __webpack_require__(248),
	    strictIndexOf = __webpack_require__(249);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },
/* 247 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 248 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 249 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 250 */
/***/ function(module, exports) {

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}

	module.exports = getHolder;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(67),
	    isIndex = __webpack_require__(93);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = copyArray(array);

	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}

	module.exports = reorder;


/***/ },
/* 252 */
/***/ function(module, exports) {

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value === placeholder || value === PLACEHOLDER) {
	      array[index] = PLACEHOLDER;
	      result[resIndex++] = index;
	    }
	  }
	  return result;
	}

	module.exports = replaceHolders;


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(2),
	    createCtor = __webpack_require__(223),
	    root = __webpack_require__(15);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & WRAP_BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	module.exports = createPartial;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(226),
	    composeArgsRight = __webpack_require__(227),
	    replaceHolders = __webpack_require__(252);

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_BIND_KEY_FLAG = 2,
	    WRAP_CURRY_BOUND_FLAG = 4,
	    WRAP_CURRY_FLAG = 8,
	    WRAP_ARY_FLAG = 128,
	    WRAP_REARG_FLAG = 256;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers used to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and
	 * `_.rearg` modify function arguments, making the order in which they are
	 * executed important, preventing the merging of metadata. However, we make
	 * an exception for a safe combined case where curried functions have `_.ary`
	 * and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

	  var isCombo =
	    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
	    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
	    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & WRAP_BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = value;
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & WRAP_ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;

	  return data;
	}

	module.exports = mergeData;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(207);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(111);

	/** Used to compose bitmasks for cloning. */
	var CLONE_SYMBOLS_FLAG = 4;

	/**
	 * Creates a shallow clone of `value`.
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	 * and supports cloning arrays, array buffers, booleans, date objects, maps,
	 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	 * arrays. The own enumerable properties of `arguments` objects are cloned
	 * as plain objects. An empty object is returned for uncloneable values such
	 * as error objects, functions, DOM nodes, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @returns {*} Returns the cloned value.
	 * @see _.cloneDeep
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var shallow = _.clone(objects);
	 * console.log(shallow[0] === objects[0]);
	 * // => true
	 */
	function clone(value) {
	  return baseClone(value, CLONE_SYMBOLS_FLAG);
	}

	module.exports = clone;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var createWrap = __webpack_require__(219);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_CURRY_FLAG = 8;

	/**
	 * Creates a function that accepts arguments of `func` and either invokes
	 * `func` returning its result, if at least `arity` number of arguments have
	 * been provided, or returns a function that accepts the remaining `func`
	 * arguments, and so on. The arity of `func` may be specified if `func.length`
	 * is not sufficient.
	 *
	 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for provided arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of curried functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Function
	 * @param {Function} func The function to curry.
	 * @param {number} [arity=func.length] The arity of `func`.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the new curried function.
	 * @example
	 *
	 * var abc = function(a, b, c) {
	 *   return [a, b, c];
	 * };
	 *
	 * var curried = _.curry(abc);
	 *
	 * curried(1)(2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2, 3);
	 * // => [1, 2, 3]
	 *
	 * // Curried with placeholders.
	 * curried(1)(_, 3)(2);
	 * // => [1, 2, 3]
	 */
	function curry(func, arity, guard) {
	  arity = guard ? undefined : arity;
	  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
	  result.placeholder = curry.placeholder;
	  return result;
	}

	// Assign default placeholders.
	curry.placeholder = {};

	module.exports = curry;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(111),
	    baseIteratee = __webpack_require__(142);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a function that invokes `func` with the arguments of the created
	 * function. If `func` is a property name, the created function returns the
	 * property value for a given element. If `func` is an array or object, the
	 * created function returns `true` for elements that contain the equivalent
	 * source properties, otherwise it returns `false`.
	 *
	 * @static
	 * @since 4.0.0
	 * @memberOf _
	 * @category Util
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @returns {Function} Returns the callback.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
	 * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, _.iteratee(['user', 'fred']));
	 * // => [{ 'user': 'fred', 'age': 40 }]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, _.iteratee('user'));
	 * // => ['barney', 'fred']
	 *
	 * // Create custom iteratee shorthands.
	 * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
	 *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
	 *     return func.test(string);
	 *   };
	 * });
	 *
	 * _.filter(['abc', 'def'], /ef/);
	 * // => ['def']
	 */
	function iteratee(func) {
	  return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
	}

	module.exports = iteratee;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var createWrap = __webpack_require__(219),
	    flatRest = __webpack_require__(260);

	/** Used to compose bitmasks for function metadata. */
	var WRAP_REARG_FLAG = 256;

	/**
	 * Creates a function that invokes `func` with arguments arranged according
	 * to the specified `indexes` where the argument value at the first index is
	 * provided as the first argument, the argument value at the second index is
	 * provided as the second argument, and so on.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {Function} func The function to rearrange arguments for.
	 * @param {...(number|number[])} indexes The arranged argument indexes.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var rearged = _.rearg(function(a, b, c) {
	 *   return [a, b, c];
	 * }, [2, 0, 1]);
	 *
	 * rearged('b', 'c', 'a')
	 * // => ['a', 'b', 'c']
	 */
	var rearg = flatRest(function(func, indexes) {
	  return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
	});

	module.exports = rearg;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(261),
	    overRest = __webpack_require__(5),
	    setToString = __webpack_require__(6);

	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	module.exports = flatRest;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(180);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(169),
	    copyArray = __webpack_require__(67),
	    isArray = __webpack_require__(76),
	    isSymbol = __webpack_require__(163),
	    stringToPath = __webpack_require__(164),
	    toKey = __webpack_require__(170),
	    toString = __webpack_require__(167);

	/**
	 * Converts `value` to a property path array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Util
	 * @param {*} value The value to convert.
	 * @returns {Array} Returns the new property path array.
	 * @example
	 *
	 * _.toPath('a.b.c');
	 * // => ['a', 'b', 'c']
	 *
	 * _.toPath('a[0].b.c');
	 * // => ['a', '0', 'b', 'c']
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return arrayMap(value, toKey);
	  }
	  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
	}

	module.exports = toPath;


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var convert = __webpack_require__(213),
	    func = convert('flow', __webpack_require__(264));

	func.placeholder = __webpack_require__(216);
	module.exports = func;


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var createFlow = __webpack_require__(265);

	/**
	 * Creates a function that returns the result of invoking the given functions
	 * with the `this` binding of the created function, where each successive
	 * invocation is supplied the return value of the previous.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Util
	 * @param {...(Function|Function[])} [funcs] The functions to invoke.
	 * @returns {Function} Returns the new composite function.
	 * @see _.flowRight
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var addSquare = _.flow([_.add, square]);
	 * addSquare(1, 2);
	 * // => 9
	 */
	var flow = createFlow();

	module.exports = flow;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var LodashWrapper = __webpack_require__(238),
	    flatRest = __webpack_require__(260),
	    getData = __webpack_require__(233),
	    getFuncName = __webpack_require__(235),
	    isArray = __webpack_require__(76),
	    isLaziable = __webpack_require__(230);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to compose bitmasks for function metadata. */
	var WRAP_CURRY_FLAG = 8,
	    WRAP_PARTIAL_FLAG = 32,
	    WRAP_ARY_FLAG = 128,
	    WRAP_REARG_FLAG = 256;

	/**
	 * Creates a `_.flow` or `_.flowRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new flow function.
	 */
	function createFlow(fromRight) {
	  return flatRest(function(funcs) {
	    var length = funcs.length,
	        index = length,
	        prereq = LodashWrapper.prototype.thru;

	    if (fromRight) {
	      funcs.reverse();
	    }
	    while (index--) {
	      var func = funcs[index];
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
	        var wrapper = new LodashWrapper([], true);
	      }
	    }
	    index = wrapper ? index : length;
	    while (++index < length) {
	      func = funcs[index];

	      var funcName = getFuncName(func),
	          data = funcName == 'wrapper' ? getData(func) : undefined;

	      if (data && isLaziable(data[0]) &&
	            data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
	            !data[4].length && data[9] == 1
	          ) {
	        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
	      } else {
	        wrapper = (func.length == 1 && isLaziable(func))
	          ? wrapper[funcName]()
	          : wrapper.thru(func);
	      }
	    }
	    return function() {
	      var args = arguments,
	          value = args[0];

	      if (wrapper && args.length == 1 && isArray(value)) {
	        return wrapper.plant(value).value();
	      }
	      var index = 0,
	          result = length ? funcs[index].apply(this, args) : value;

	      while (++index < length) {
	        result = funcs[index].call(this, result);
	      }
	      return result;
	    };
	  });
	}

	module.exports = createFlow;


/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var convert = __webpack_require__(213),
	    func = convert('concat', __webpack_require__(267));

	func.placeholder = __webpack_require__(216);
	module.exports = func;


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(120),
	    baseFlatten = __webpack_require__(180),
	    copyArray = __webpack_require__(67),
	    isArray = __webpack_require__(76);

	/**
	 * Creates a new array concatenating `array` with any additional arrays
	 * and/or values.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to concatenate.
	 * @param {...*} [values] The values to concatenate.
	 * @returns {Array} Returns the new concatenated array.
	 * @example
	 *
	 * var array = [1];
	 * var other = _.concat(array, 2, [3], [[4]]);
	 *
	 * console.log(other);
	 * // => [1, 2, 3, [4]]
	 *
	 * console.log(array);
	 * // => [1]
	 */
	function concat() {
	  var length = arguments.length;
	  if (!length) {
	    return [];
	  }
	  var args = Array(length - 1),
	      array = arguments[0],
	      index = length;

	  while (index--) {
	    args[index - 1] = arguments[index];
	  }
	  return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
	}

	module.exports = concat;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var convert = __webpack_require__(213),
	    func = convert('filter', __webpack_require__(269));

	func.placeholder = __webpack_require__(216);
	module.exports = func;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(116),
	    baseFilter = __webpack_require__(270),
	    baseIteratee = __webpack_require__(142),
	    isArray = __webpack_require__(76);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(101);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(272);


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var convert = __webpack_require__(213),
	    func = convert('head', __webpack_require__(273), __webpack_require__(274));

	func.placeholder = __webpack_require__(216);
	module.exports = func;


/***/ },
/* 273 */
/***/ function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return (array && array.length) ? array[0] : undefined;
	}

	module.exports = head;


/***/ },
/* 274 */
/***/ function(module, exports) {

	module.exports = {
	  'cap': false,
	  'curry': false,
	  'fixed': false,
	  'immutable': false,
	  'rearg': false
	};


/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var convert = __webpack_require__(213),
	    func = convert('reverse', __webpack_require__(276));

	func.placeholder = __webpack_require__(216);
	module.exports = func;


/***/ },
/* 276 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeReverse = arrayProto.reverse;

	/**
	 * Reverses `array` so that the first element becomes the last, the second
	 * element becomes the second to last, and so on.
	 *
	 * **Note:** This method mutates `array` and is based on
	 * [`Array#reverse`](https://mdn.io/Array/reverse).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = [1, 2, 3];
	 *
	 * _.reverse(array);
	 * // => [3, 2, 1]
	 *
	 * console.log(array);
	 * // => [3, 2, 1]
	 */
	function reverse(array) {
	  return array == null ? array : nativeReverse.call(array);
	}

	module.exports = reverse;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseSpanValueData = parseSpanValueData;
	exports.parseSpanStringData = parseSpanStringData;
	exports.parsePositionValueData = parsePositionValueData;
	exports.parsePositionTextData = parsePositionTextData;
	exports.parseChordData = parseChordData;

	var _keys = __webpack_require__(103);

	var _keys2 = _interopRequireDefault(_keys);

	var _includes = __webpack_require__(278);

	var _includes2 = _interopRequireDefault(_includes);

	var _every = __webpack_require__(282);

	var _every2 = _interopRequireDefault(_every);

	var _map = __webpack_require__(285);

	var _map2 = _interopRequireDefault(_map);

	var _d3Collection = __webpack_require__(286);

	var _d3Array = __webpack_require__(190);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var logger = console;

	function checkParent(key, index, layoutSummary, header) {
	  if (!(0, _includes2.default)((0, _keys2.default)(layoutSummary), key)) {
	    logger.log(1, 'datum', 'unknown parent id', { line: index + 1, value: key, header: header, layoutSummary: layoutSummary });
	    return false;
	  }
	  return true;
	}

	function checkNumber(keys, index) {
	  return (0, _every2.default)(keys, function (value, header) {
	    if (isNaN(value)) {
	      logger.log(1, 'datum', 'not a number', { line: index + 1, value: value, header: header });
	      return false;
	    }
	    return true;
	  });
	}

	function normalize(data, idKeys) {
	  var sampleKeys = (0, _keys2.default)(data[0]);
	  var isObject = (0, _every2.default)((0, _map2.default)(idKeys, function (key) {
	    return (0, _includes2.default)(sampleKeys, key);
	  }));
	  if (isObject) {
	    return (0, _map2.default)(data, function (datum) {
	      return (0, _map2.default)(idKeys, function (key) {
	        return datum[key];
	      });
	    });
	  }

	  return data;
	}

	function buildOutput(data) {
	  return {
	    data: (0, _d3Collection.nest)().key(function (datum) {
	      return datum.block_id;
	    }).entries(data),
	    meta: {
	      min: (0, _d3Array.min)(data, function (d) {
	        return d.value;
	      }),
	      max: (0, _d3Array.max)(data, function (d) {
	        return d.value;
	      })
	    }
	  };
	}

	function parseSpanValueData(data, layoutSummary) {
	  // ['parent_id', 'start', 'end', 'value']
	  if (data.length === 0) {
	    return { data: [], meta: { min: null, max: null } };
	  }

	  var preParsedData = normalize(data, ['parent_id', 'start', 'end', 'value']);

	  var filteredData = preParsedData.filter(function (datum, index) {
	    return checkParent(datum[0], index, layoutSummary, 'parent');
	  }).filter(function (datum, index) {
	    return checkNumber({ start: datum[1], end: datum[2], value: datum[3] }, index);
	  }).map(function (datum) {
	    if (datum[1] < 0 || datum[2] > layoutSummary[datum[0]]) {
	      logger.log(2, 'position', 'position inconsistency', { datum: datum, layoutSummary: layoutSummary });
	    }
	    return {
	      block_id: datum[0],
	      start: Math.max(0, parseFloat(datum[1])),
	      end: Math.min(layoutSummary[datum[0]], parseFloat(datum[2])),
	      value: parseFloat(datum[3]) || 1
	    };
	  });

	  return buildOutput(filteredData);
	}

	function parseSpanStringData(data, layoutSummary) {
	  // ['parent_id', 'start', 'end', 'value']

	  if (data.length === 0) {
	    return { data: [], meta: { min: null, max: null } };
	  }

	  var preParsedData = normalize(data, ['parent_id', 'start', 'end', 'value']);

	  var filteredData = preParsedData.filter(function (datum, index) {
	    return checkParent(datum[0], index, layoutSummary, 'parent');
	  }).filter(function (datum, index) {
	    return checkNumber({ start: datum[1], end: datum[2] }, index);
	  }).map(function (datum) {
	    if (datum[1] < 0 || datum[2] > layoutSummary[datum[0]]) {
	      logger.log(2, 'position', 'position inconsistency', { datum: datum, layoutSummary: layoutSummary });
	    }

	    return {
	      block_id: datum[0],
	      start: Math.max(0, parseFloat(datum[1])),
	      end: Math.min(layoutSummary[datum[0]], parseFloat(datum[2])),
	      value: datum[3] ? datum[3] : null
	    };
	  });

	  return buildOutput(filteredData);
	}

	function parsePositionValueData(data, layoutSummary) {
	  // ['parent_id', 'position', 'value']
	  if (data.length === 0) {
	    return { data: [], meta: { min: null, max: null } };
	  }

	  var preParsedData = normalize(data, ['parent_id', 'position', 'value']);

	  var filteredData = preParsedData.filter(function (datum, index) {
	    return checkParent(datum[0], index, layoutSummary, 'parent');
	  }).filter(function (datum, index) {
	    return checkNumber({ position: datum[1], value: datum[2] }, index);
	  }).map(function (datum) {
	    return {
	      block_id: datum[0],
	      position: Math.min(layoutSummary[datum[0]], parseFloat(datum[1])),
	      value: parseFloat(datum[2]) || 1
	    };
	  });

	  return buildOutput(filteredData);
	}

	function parsePositionTextData(data, layoutSummary) {
	  // ['parent_id', 'position', 'value']
	  if (data.length === 0) {
	    return { data: [], meta: { min: null, max: null } };
	  }

	  var preParsedData = normalize(data, ['parent_id', 'position', 'value']);
	  var filteredData = preParsedData.filter(function (datum, index) {
	    return checkParent(datum[0], index, layoutSummary, 'parent');
	  }).filter(function (datum, index) {
	    return checkNumber({ position: datum[1] }, index);
	  }).map(function (datum) {
	    return {
	      block_id: datum[0],
	      position: Math.min(layoutSummary[datum[0]], parseFloat(datum[1])),
	      value: datum[2]
	    };
	  });

	  return buildOutput(filteredData);
	}

	function parseChordData(data, layoutSummary) {
	  // ['source_id', 'source_start', 'source_end', 'target_id', 'target_start', 'target_end', 'value']
	  if (data.length === 0) {
	    return { data: [], meta: { min: null, max: null } };
	  }

	  var preParsedData = normalize(data, ['source_id', 'source_start', 'source_end', 'target_id', 'target_start', 'target_end', 'value']);

	  var formatedData = preParsedData.filter(function (datum, index) {
	    return checkParent(datum[0], index, layoutSummary, 'source_id');
	  }).filter(function (datum, index) {
	    return checkParent(datum[3], index, layoutSummary, 'target_id');
	  }).filter(function (datum, index) {
	    return checkNumber({
	      source_start: datum[1],
	      source_end: datum[2],
	      target_start: datum[4],
	      target_end: datum[5],
	      value: datum[6] || 1
	    }, index);
	  }).map(function (datum) {
	    return {
	      source: {
	        id: datum[0],
	        start: Math.max(0, parseFloat(datum[1])),
	        end: Math.min(layoutSummary[datum[0]], parseFloat(datum[2]))
	      },
	      target: {
	        id: datum[3],
	        start: Math.max(0, parseFloat(datum[4])),
	        end: Math.min(layoutSummary[datum[3]], parseFloat(datum[5]))
	      },
	      value: parseFloat(datum[6])
	    };
	  });

	  return {
	    data: formatedData,
	    meta: {
	      min: (0, _d3Array.min)(data, function (d) {
	        return d.value;
	      }),
	      max: (0, _d3Array.max)(data, function (d) {
	        return d.value;
	      })
	    }
	  };
	}

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(246),
	    isArrayLike = __webpack_require__(78),
	    isString = __webpack_require__(279),
	    toInteger = __webpack_require__(255),
	    values = __webpack_require__(280);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}

	module.exports = includes;


/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(13),
	    isArray = __webpack_require__(76),
	    isObjectLike = __webpack_require__(75);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(281),
	    keys = __webpack_require__(103);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}

	module.exports = values;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(169);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(283),
	    baseEvery = __webpack_require__(284),
	    baseIteratee = __webpack_require__(142),
	    isArray = __webpack_require__(76),
	    isIterateeCall = __webpack_require__(98);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * Iteration is stopped once `predicate` returns falsey. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * **Note:** This method returns `true` for
	 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
	 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
	 * elements of empty collections.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes'], Boolean);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': false },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.every(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, guard) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = every;


/***/ },
/* 283 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(101);

	/**
	 * The base implementation of `_.every` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`
	 */
	function baseEvery(collection, predicate) {
	  var result = true;
	  baseEach(collection, function(value, index, collection) {
	    result = !!predicate(value, index, collection);
	    return result;
	  });
	  return result;
	}

	module.exports = baseEvery;


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(169),
	    baseIteratee = __webpack_require__(142),
	    baseMap = __webpack_require__(183),
	    isArray = __webpack_require__(76);

	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-collection/ Version 1.0.2. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';

	var prefix = "$";

	function Map() {}

	Map.prototype = map.prototype = {
	  constructor: Map,
	  has: function(key) {
	    return (prefix + key) in this;
	  },
	  get: function(key) {
	    return this[prefix + key];
	  },
	  set: function(key, value) {
	    this[prefix + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	  }
	};

	function map(object, f) {
	  var map = new Map;

	  // Copy constructor.
	  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;

	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }

	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);

	  return map;
	}

	var nest = function() {
	  var keys = [],
	      sortKeys = [],
	      sortValues,
	      rollup,
	      nest;

	  function apply(array, depth, createResult, setResult) {
	    if (depth >= keys.length) return rollup != null
	        ? rollup(array) : (sortValues != null
	        ? array.sort(sortValues)
	        : array);

	    var i = -1,
	        n = array.length,
	        key = keys[depth++],
	        keyValue,
	        value,
	        valuesByKey = map(),
	        values,
	        result = createResult();

	    while (++i < n) {
	      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
	        values.push(value);
	      } else {
	        valuesByKey.set(keyValue, [value]);
	      }
	    }

	    valuesByKey.each(function(values, key) {
	      setResult(result, key, apply(values, depth, createResult, setResult));
	    });

	    return result;
	  }

	  function entries(map$$1, depth) {
	    if (++depth > keys.length) return map$$1;
	    var array, sortKey = sortKeys[depth - 1];
	    if (rollup != null && depth >= keys.length) array = map$$1.entries();
	    else array = [], map$$1.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
	    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
	  }

	  return nest = {
	    object: function(array) { return apply(array, 0, createObject, setObject); },
	    map: function(array) { return apply(array, 0, createMap, setMap); },
	    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
	    key: function(d) { keys.push(d); return nest; },
	    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	    sortValues: function(order) { sortValues = order; return nest; },
	    rollup: function(f) { rollup = f; return nest; }
	  };
	};

	function createObject() {
	  return {};
	}

	function setObject(object, key, value) {
	  object[key] = value;
	}

	function createMap() {
	  return map();
	}

	function setMap(map$$1, key, value) {
	  map$$1.set(key, value);
	}

	function Set() {}

	var proto = map.prototype;

	Set.prototype = set.prototype = {
	  constructor: Set,
	  has: proto.has,
	  add: function(value) {
	    value += "";
	    this[prefix + value] = value;
	    return this;
	  },
	  remove: proto.remove,
	  clear: proto.clear,
	  values: proto.keys,
	  size: proto.size,
	  empty: proto.empty,
	  each: proto.each
	};

	function set(object, f) {
	  var set = new Set;

	  // Copy constructor.
	  if (object instanceof Set) object.each(function(value) { set.add(value); });

	  // Otherwise, assume it’s an array.
	  else if (object) {
	    var i = -1, n = object.length;
	    if (f == null) while (++i < n) set.add(object[i]);
	    else while (++i < n) set.add(f(object[i], i, object));
	  }

	  return set;
	}

	var keys = function(map) {
	  var keys = [];
	  for (var key in map) keys.push(key);
	  return keys;
	};

	var values = function(map) {
	  var values = [];
	  for (var key in map) values.push(map[key]);
	  return values;
	};

	var entries = function(map) {
	  var entries = [];
	  for (var key in map) entries.push({key: key, value: map[key]});
	  return entries;
	};

	exports.nest = nest;
	exports.set = set;
	exports.map = map;
	exports.keys = keys;
	exports.values = values;
	exports.entries = entries;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 287 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var axes = {
	  axes: {
	    display: {
	      value: false,
	      iteratee: false
	    },
	    minor: {
	      spacing: {
	        value: 5,
	        iteratee: false
	      },
	      color: {
	        value: '#d3d3d3',
	        iteratee: false
	      },
	      thickness: {
	        value: 2,
	        iteratee: false
	      }
	    },
	    major: {
	      spacing: {
	        value: 5,
	        iteratee: false
	      },
	      color: {
	        value: '#000000',
	        iteratee: false
	      },
	      thickness: {
	        value: 2,
	        iteratee: false
	      }
	    }
	  }
	};

	var palette = {
	  colorPaletteSize: {
	    value: 9,
	    iteratee: false
	  },
	  colorPalette: {
	    value: 'YlGnBu',
	    iteratee: false
	  },
	  usePalette: {
	    value: true,
	    iteratee: false
	  },
	  colorPaletteReverse: {
	    value: true,
	    iteratee: false
	  }
	};

	var radial = {
	  innerRadius: {
	    value: 0,
	    iteratee: false
	  },
	  outerRadius: {
	    value: 0,
	    iteratee: false
	  }
	};

	var values = {
	  min: {
	    value: 'smart',
	    iteratee: false
	  },
	  max: {
	    value: 'smart',
	    iteratee: false
	  },
	  logScale: {
	    value: false,
	    iteratee: false
	  }
	};

	var common = {
	  zIndex: {
	    value: false,
	    iteratee: false
	  },
	  opacity: {
	    value: false,
	    iteratee: true
	  },
	  tooltipContent: {
	    value: null,
	    iteratee: true
	  }
	};

	exports.axes = axes;
	exports.palette = palette;
	exports.radial = radial;
	exports.values = values;
	exports.common = common;

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _configs = __webpack_require__(287);

	var _d3Shape = __webpack_require__(188);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  color: {
	    value: '#fd6a62',
	    iteratee: true
	  },
	  strokeColor: {
	    value: '#d3d3d3',
	    iteratee: true
	  },
	  strokeWidth: {
	    value: 0,
	    iteratee: true
	  }
	}, _configs.radial, _configs.common);

	var Highlight = function (_Track) {
	  _inherits(Highlight, _Track);

	  function Highlight(instance, conf, data) {
	    _classCallCheck(this, Highlight);

	    return _possibleConstructorReturn(this, (Highlight.__proto__ || Object.getPrototypeOf(Highlight)).call(this, instance, conf, defaultConf, data, _dataParser.parseSpanStringData));
	  }

	  _createClass(Highlight, [{
	    key: 'renderDatumContainer',
	    value: function renderDatumContainer(instance, parentElement, name, data, conf) {
	      return this.renderBlock(parentElement, data, instance._layout, conf);
	    }
	  }, {
	    key: 'renderDatum',
	    value: function renderDatum(parentElement, conf, layout, utils) {
	      return parentElement.selectAll('tile').data(function (d) {
	        return d.values;
	      }).enter().append('path').attr('class', 'tile').attr('d', (0, _d3Shape.arc)().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).startAngle(function (d, i) {
	        return utils.theta(d.start, layout.blocks[d.block_id]);
	      }).endAngle(function (d, i) {
	        return utils.theta(d.end, layout.blocks[d.block_id]);
	      })).attr('fill', conf.color).attr('opacity', conf.opacity).attr('stroke-width', conf.strokeWidth).attr('stroke', conf.strokeColor);
	    }
	  }]);

	  return Highlight;
	}(_Track3.default);

	exports.default = Highlight;

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _d3Shape = __webpack_require__(188);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _configs = __webpack_require__(287);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  direction: {
	    value: 'out',
	    iteratee: false
	  },
	  color: {
	    value: '#fd6a62',
	    iteratee: true
	  },
	  backgrounds: {
	    value: [],
	    iteratee: false
	  }
	}, _configs.axes, _configs.palette, _configs.radial, _configs.common, _configs.values);

	var Histogram = function (_Track) {
	  _inherits(Histogram, _Track);

	  function Histogram(instance, conf, data) {
	    _classCallCheck(this, Histogram);

	    return _possibleConstructorReturn(this, (Histogram.__proto__ || Object.getPrototypeOf(Histogram)).call(this, instance, conf, defaultConf, data, _dataParser.parseSpanValueData));
	  }

	  _createClass(Histogram, [{
	    key: 'renderDatumContainer',
	    value: function renderDatumContainer(instance, parentElement, name, data, conf) {
	      var track = parentElement.append('g').attr('class', this.conf.colorPalette);
	      return this.renderBlock(track, data, instance._layout, conf);
	    }
	  }, {
	    key: 'renderDatum',
	    value: function renderDatum(parentElement, conf, layout, utils) {
	      var bin = parentElement.selectAll('.bin').data(function (d) {
	        return d.values;
	      }).enter().append('path').attr('class', 'bin').attr('opacity', function (d) {
	        return conf.opacity;
	      }).attr('d', (0, _d3Shape.arc)().innerRadius(function (d) {
	        if (conf.direction == 'in') {
	          var height = utils.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
	          return conf.outerRadius - height;
	        }
	        return conf.innerRadius;
	      }).outerRadius(function (d) {
	        if (conf.direction == 'out') {
	          var height = utils.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
	          return conf.innerRadius + height;
	        }
	        return conf.outerRadius;
	      }).startAngle(function (d) {
	        return utils.theta(d.start, layout.blocks[d.block_id]);
	      }).endAngle(function (d) {
	        return utils.theta(d.end, layout.blocks[d.block_id]);
	      }));
	      if (conf.usePalette) {
	        bin.attr('class', function (d) {
	          return 'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
	        });
	      } else {
	        bin.attr('fill', conf.color);
	      }
	      return bin;
	    }
	  }]);

	  return Histogram;
	}(_Track3.default);

	exports.default = Histogram;

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _tooltip = __webpack_require__(193);

	var _d3Chord = __webpack_require__(291);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _configs = __webpack_require__(287);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  color: {
	    value: '#fd6a62',
	    iteratee: true
	  }
	}, _configs.palette, _configs.common, _configs.values);

	var Chords = function (_Track) {
	  _inherits(Chords, _Track);

	  function Chords(instance, conf, data) {
	    _classCallCheck(this, Chords);

	    return _possibleConstructorReturn(this, (Chords.__proto__ || Object.getPrototypeOf(Chords)).call(this, instance, conf, defaultConf, data, _dataParser.parseChordData));
	  }

	  _createClass(Chords, [{
	    key: 'getCoordinates',
	    value: function getCoordinates(d, layout) {
	      var block = layout.blocks[d.id];
	      var startAngle = block.start + d.start / block.len * (block.end - block.start);
	      var endAngle = block.start + d.end / block.len * (block.end - block.start);

	      return {
	        radius: layout.conf.innerRadius,
	        startAngle: startAngle,
	        endAngle: endAngle
	      };
	    }
	  }, {
	    key: 'renderChords',
	    value: function renderChords(parentElement, name, conf, data, layout, ratio, getCoordinates) {
	      var _this2 = this;

	      var track = parentElement.append('g').attr('class', conf.colorPalette);

	      var that = this;
	      var link = track.selectAll('.chord').data(data).enter().append('path').attr('class', 'chord').attr('d', (0, _d3Chord.ribbon)().source(function (d) {
	        return getCoordinates(d.source, layout);
	      }).target(function (d) {
	        return getCoordinates(d.target, layout);
	      })).attr('opacity', conf.opacity).on('mouseover', function (d) {
	        return that.dispatch.call('mouseover', _this2, d);
	      }).on('mouseout', function (d) {
	        return that.dispatch.call('mouseout', _this2, d);
	      });

	      if (conf.usePalette) {
	        link.attr('class', function (d) {
	          return 'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
	        });
	      } else {
	        link.attr('fill', conf.color);
	      }
	      return link;
	    }
	  }, {
	    key: 'render',
	    value: function render(instance, parentElement, name) {
	      parentElement.select('.' + name).remove();

	      var track = parentElement.append('g').attr('class', name).attr('z-index', this.conf.zIndex);

	      var selection = this.renderChords(track, name, this.conf, this.data, instance._layout, this.ratio, this.getCoordinates);
	      if (this.conf.tooltipContent) {
	        (0, _tooltip.registerTooltip)(this, instance, selection, this.conf);
	      }
	      return this;
	    }
	  }]);

	  return Chords;
	}(_Track3.default);

	exports.default = Chords;

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-chord/ Version 1.0.3. Copyright 2016 Mike Bostock.
	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(190), __webpack_require__(189)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-path'], factory) :
	  (factory((global.d3 = global.d3 || {}),global.d3,global.d3));
	}(this, (function (exports,d3Array,d3Path) { 'use strict';

	var cos = Math.cos;
	var sin = Math.sin;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var tau = pi * 2;
	var max = Math.max;

	function compareValue(compare) {
	  return function(a, b) {
	    return compare(
	      a.source.value + a.target.value,
	      b.source.value + b.target.value
	    );
	  };
	}

	var chord = function() {
	  var padAngle = 0,
	      sortGroups = null,
	      sortSubgroups = null,
	      sortChords = null;

	  function chord(matrix) {
	    var n = matrix.length,
	        groupSums = [],
	        groupIndex = d3Array.range(n),
	        subgroupIndex = [],
	        chords = [],
	        groups = chords.groups = new Array(n),
	        subgroups = new Array(n * n),
	        k,
	        x,
	        x0,
	        dx,
	        i,
	        j;

	    // Compute the sum.
	    k = 0, i = -1; while (++i < n) {
	      x = 0, j = -1; while (++j < n) {
	        x += matrix[i][j];
	      }
	      groupSums.push(x);
	      subgroupIndex.push(d3Array.range(n));
	      k += x;
	    }

	    // Sort groups…
	    if (sortGroups) groupIndex.sort(function(a, b) {
	      return sortGroups(groupSums[a], groupSums[b]);
	    });

	    // Sort subgroups…
	    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
	      d.sort(function(a, b) {
	        return sortSubgroups(matrix[i][a], matrix[i][b]);
	      });
	    });

	    // Convert the sum to scaling factor for [0, 2pi].
	    // TODO Allow start and end angle to be specified?
	    // TODO Allow padding to be specified as percentage?
	    k = max(0, tau - padAngle * n) / k;
	    dx = k ? padAngle : tau / n;

	    // Compute the start and end angle for each group and subgroup.
	    // Note: Opera has a bug reordering object literal properties!
	    x = 0, i = -1; while (++i < n) {
	      x0 = x, j = -1; while (++j < n) {
	        var di = groupIndex[i],
	            dj = subgroupIndex[di][j],
	            v = matrix[di][dj],
	            a0 = x,
	            a1 = x += v * k;
	        subgroups[dj * n + di] = {
	          index: di,
	          subindex: dj,
	          startAngle: a0,
	          endAngle: a1,
	          value: v
	        };
	      }
	      groups[di] = {
	        index: di,
	        startAngle: x0,
	        endAngle: x,
	        value: groupSums[di]
	      };
	      x += dx;
	    }

	    // Generate chords for each (non-empty) subgroup-subgroup link.
	    i = -1; while (++i < n) {
	      j = i - 1; while (++j < n) {
	        var source = subgroups[j * n + i],
	            target = subgroups[i * n + j];
	        if (source.value || target.value) {
	          chords.push(source.value < target.value
	              ? {source: target, target: source}
	              : {source: source, target: target});
	        }
	      }
	    }

	    return sortChords ? chords.sort(sortChords) : chords;
	  }

	  chord.padAngle = function(_) {
	    return arguments.length ? (padAngle = max(0, _), chord) : padAngle;
	  };

	  chord.sortGroups = function(_) {
	    return arguments.length ? (sortGroups = _, chord) : sortGroups;
	  };

	  chord.sortSubgroups = function(_) {
	    return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
	  };

	  chord.sortChords = function(_) {
	    return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
	  };

	  return chord;
	};

	var slice = Array.prototype.slice;

	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};

	function defaultSource(d) {
	  return d.source;
	}

	function defaultTarget(d) {
	  return d.target;
	}

	function defaultRadius(d) {
	  return d.radius;
	}

	function defaultStartAngle(d) {
	  return d.startAngle;
	}

	function defaultEndAngle(d) {
	  return d.endAngle;
	}

	var ribbon = function() {
	  var source = defaultSource,
	      target = defaultTarget,
	      radius = defaultRadius,
	      startAngle = defaultStartAngle,
	      endAngle = defaultEndAngle,
	      context = null;

	  function ribbon() {
	    var buffer,
	        argv = slice.call(arguments),
	        s = source.apply(this, argv),
	        t = target.apply(this, argv),
	        sr = +radius.apply(this, (argv[0] = s, argv)),
	        sa0 = startAngle.apply(this, argv) - halfPi,
	        sa1 = endAngle.apply(this, argv) - halfPi,
	        sx0 = sr * cos(sa0),
	        sy0 = sr * sin(sa0),
	        tr = +radius.apply(this, (argv[0] = t, argv)),
	        ta0 = startAngle.apply(this, argv) - halfPi,
	        ta1 = endAngle.apply(this, argv) - halfPi;

	    if (!context) context = buffer = d3Path.path();

	    context.moveTo(sx0, sy0);
	    context.arc(0, 0, sr, sa0, sa1);
	    if (sa0 !== ta0 || sa1 !== ta1) { // TODO sr !== tr?
	      context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
	      context.arc(0, 0, tr, ta0, ta1);
	    }
	    context.quadraticCurveTo(0, 0, sx0, sy0);
	    context.closePath();

	    if (buffer) return context = null, buffer + "" || null;
	  }

	  ribbon.radius = function(_) {
	    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), ribbon) : radius;
	  };

	  ribbon.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), ribbon) : startAngle;
	  };

	  ribbon.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), ribbon) : endAngle;
	  };

	  ribbon.source = function(_) {
	    return arguments.length ? (source = _, ribbon) : source;
	  };

	  ribbon.target = function(_) {
	    return arguments.length ? (target = _, ribbon) : target;
	  };

	  ribbon.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), ribbon) : context;
	  };

	  return ribbon;
	};

	exports.chord = chord;
	exports.ribbon = ribbon;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _d3Shape = __webpack_require__(188);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _configs = __webpack_require__(287);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  backgrounds: {
	    value: [],
	    iteratee: false
	  }
	}, _configs.radial, _configs.palette, _configs.values, _configs.common);

	var Heatmap = function (_Track) {
	  _inherits(Heatmap, _Track);

	  function Heatmap(instance, conf, data) {
	    _classCallCheck(this, Heatmap);

	    return _possibleConstructorReturn(this, (Heatmap.__proto__ || Object.getPrototypeOf(Heatmap)).call(this, instance, conf, defaultConf, data, _dataParser.parseSpanValueData));
	  }

	  _createClass(Heatmap, [{
	    key: 'renderDatumContainer',
	    value: function renderDatumContainer(instance, parentElement, name, data, conf) {
	      var track = parentElement.append('g').attr('class', conf.colorPalette);

	      return this.renderBlock(track, data, instance._layout, conf);
	    }
	  }, {
	    key: 'renderDatum',
	    value: function renderDatum(parentElement, conf, layout, utils) {
	      return parentElement.selectAll('tile').data(function (d) {
	        return d.values;
	      }).enter().append('path').attr('class', 'tile').attr('opacity', conf.opacity).attr('d', (0, _d3Shape.arc)().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).startAngle(function (d, i) {
	        return utils.theta(d.start, layout.blocks[d.block_id]);
	      }).endAngle(function (d, i) {
	        return utils.theta(d.end, layout.blocks[d.block_id]);
	      })).attr('class', function (d) {
	        return 'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
	      });
	    }
	  }]);

	  return Heatmap;
	}(_Track3.default);

	exports.default = Heatmap;

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _configs = __webpack_require__(287);

	var _d3Shape = __webpack_require__(188);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  direction: {
	    value: 'out',
	    iteratee: false
	  },
	  color: {
	    value: '#fd6a62',
	    iteratee: true
	  },
	  fill: {
	    value: true,
	    iteratee: false
	  },
	  fill_color: {
	    value: '#d3d3d3',
	    iteratee: true
	  },
	  thickness: {
	    value: 2,
	    iteratee: true
	  },
	  max_gap: {
	    value: 10000000,
	    iteratee: true
	  },
	  backgrounds: {
	    value: [],
	    iteratee: false
	  }
	}, _configs.axes, _configs.radial, _configs.common, _configs.values);

	var Line = function (_Track) {
	  _inherits(Line, _Track);

	  function Line(instance, conf, data) {
	    _classCallCheck(this, Line);

	    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, instance, conf, defaultConf, data, _dataParser.parsePositionValueData));
	  }

	  _createClass(Line, [{
	    key: 'renderDatumContainer',
	    value: function renderDatumContainer(instance, parentElement, name, data, conf) {
	      var track = parentElement.append('g').attr('class', name);
	      return this.renderBlock(track, data, instance._layout, conf);
	    }
	  }, {
	    key: 'renderDatum',
	    value: function renderDatum(parentElement, conf, layout, utils) {
	      var line = (0, _d3Shape.radialLine)().angle(function (d) {
	        return d.angle;
	      }).radius(function (d) {
	        return d.radius;
	      }).curve(_d3Shape.curveLinear);

	      var area = (0, _d3Shape.radialArea)().angle(function (d) {
	        return d.angle;
	      }).innerRadius(function (d) {
	        return d.innerRadius;
	      }).outerRadius(function (d) {
	        return d.outerRadius;
	      }).curve(_d3Shape.curveLinear);

	      var generator = conf.fill ? area : line;

	      var buildRadius = function buildRadius(height) {
	        if (conf.fill) {
	          return {
	            innerRadius: conf.direction === 'out' ? conf.innerRadius : conf.outerRadius - height,
	            outerRadius: conf.direction === 'out' ? conf.innerRadius + height : conf.outerRadius
	          };
	        } else {
	          return {
	            radius: conf.direction === 'out' ? conf.innerRadius + height : conf.outerRadius - height
	          };
	        }
	      };

	      return parentElement.append('path').datum(function (d) {
	        return d.values.map(function (datum) {
	          var height = utils.ratio(datum.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
	          return (0, _assign2.default)(datum, {
	            angle: utils.theta(datum.position, layout.blocks[d.key])
	          }, buildRadius(height));
	        });
	      }).attr('class', 'line').attr('d', generator).attr('opacity', conf.opacity).attr('stroke-width', conf.thickness).attr('stroke', conf.color).attr('fill', function (d, i) {
	        return conf.fill ? conf.fill_color(d, i) : 'none';
	      });
	    }
	  }]);

	  return Line;
	}(_Track3.default);

	exports.default = Line;

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _configs = __webpack_require__(287);

	var _d3Shape = __webpack_require__(188);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  direction: {
	    value: 'out',
	    iteratee: false
	  },
	  glyph: {
	    color: {
	      value: '#fd6a62',
	      iteratee: true
	    },
	    fill: {
	      value: true,
	      iteratee: true
	    },
	    size: {
	      value: 15,
	      iteratee: true
	    },
	    shape: {
	      value: 'circle',
	      iteratee: true
	    },
	    strokeColor: {
	      value: '#d3d3d3',
	      iteratee: true
	    },
	    strokeWidth: {
	      value: 2,
	      iteratee: true
	    }
	  },
	  backgrounds: {
	    value: [],
	    iteratee: false
	  }
	}, _configs.axes, _configs.radial, _configs.common, _configs.values);

	var getSymbol = function getSymbol(key) {
	  switch (key) {
	    case 'circle':
	      return _d3Shape.symbolCircle;
	    case 'cross':
	      return _d3Shape.symbolCross;
	    case 'diamond':
	      return _d3Shape.symbolDiamond;
	    case 'square':
	      return _d3Shape.symbolSquare;
	    case 'triangle':
	      return _d3Shape.symbolTriangle;
	    case 'star':
	      return _d3Shape.symbolStar;
	    case 'wye':
	      return _d3Shape.symbolWye;
	    default:
	      return _d3Shape.symbolCross;
	  }
	};

	var Scatter = function (_Track) {
	  _inherits(Scatter, _Track);

	  function Scatter(instance, conf, data) {
	    _classCallCheck(this, Scatter);

	    return _possibleConstructorReturn(this, (Scatter.__proto__ || Object.getPrototypeOf(Scatter)).call(this, instance, conf, defaultConf, data, _dataParser.parsePositionValueData));
	  }

	  _createClass(Scatter, [{
	    key: 'renderDatumContainer',
	    value: function renderDatumContainer(instance, parentElement, name, data, conf) {
	      var track = parentElement.append('g').attr('class', name);
	      return this.renderBlock(track, data, instance._layout, conf);
	    }
	  }, {
	    key: 'renderDatum',
	    value: function renderDatum(parentElement, conf, layout, utils) {
	      var point = parentElement.selectAll('.point').data(function (d) {
	        d.values.forEach(function (item, i) {
	          item.symbol = (0, _d3Shape.symbol)().type(getSymbol(conf.glyph.shape(item, i))).size(conf.glyph.size(item, i));
	        });
	        return d.values;
	      }).enter().append('path').attr('class', 'point').attr('opacity', conf.opacity).attr('d', function (d, i, j) {
	        return d.symbol(d, i, j);
	      }).attr('transform', function (d) {
	        return '\n          translate(\n            ' + utils.x(d, layout, conf) + ',\n            ' + utils.y(d, layout, conf) + '\n          ) rotate(\n            ' + utils.theta(d.position, layout.blocks[d.block_id]) * 360 / (2 * Math.PI) + '\n          )';
	      }).attr('stroke', conf.glyph.strokeColor).attr('stroke-width', conf.glyph.strokeWidth).attr('fill', function (d, i) {
	        var fill = conf.glyph.fill(d, i);
	        var color = conf.glyph.color(d, i);
	        return fill ? color : 'none';
	      });
	      return point;
	    }
	  }]);

	  return Scatter;
	}(_Track3.default);

	exports.default = Scatter;

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Track2 = __webpack_require__(192);

	var _Track3 = _interopRequireDefault(_Track2);

	var _dataParser = __webpack_require__(277);

	var _d3Shape = __webpack_require__(188);

	var _assign = __webpack_require__(210);

	var _assign2 = _interopRequireDefault(_assign);

	var _forEach = __webpack_require__(99);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _configs = __webpack_require__(287);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConf = (0, _assign2.default)({
	  color: {
	    value: '#fd6a62',
	    iteratee: true
	  },
	  direction: {
	    value: 'out',
	    iteratee: false
	  },
	  thickness: {
	    value: 10,
	    iteratee: true
	  },
	  radialMargin: {
	    value: 2,
	    iteratee: true
	  },
	  margin: {
	    value: 2,
	    iteratee: true
	  },
	  strokeWidth: {
	    value: 1,
	    iteratee: true
	  },
	  strokeColor: {
	    value: '#000000',
	    iteratee: true
	  },
	  backgrounds: {
	    value: [],
	    iteratee: false
	  }
	}, _configs.palette, _configs.axes, _configs.radial, _configs.values, _configs.common);

	var Stack = function (_Track) {
	  _inherits(Stack, _Track);

	  function Stack(instance, conf, data) {
	    _classCallCheck(this, Stack);

	    var _this = _possibleConstructorReturn(this, (Stack.__proto__ || Object.getPrototypeOf(Stack)).call(this, instance, conf, defaultConf, data, _dataParser.parseSpanValueData));

	    _this.buildLayers(_this.data, _this.conf.margin);
	    return _this;
	  }

	  _createClass(Stack, [{
	    key: 'buildLayers',
	    value: function buildLayers(data, margin) {
	      (0, _forEach2.default)(data, function (block, idx) {
	        block.values = block.values.sort(function (a, b) {
	          if (a.start < b.start) {
	            return -1;
	          }
	          if (a.start == b.start && a.end > b.end) {
	            return -1;
	          }
	          if (a.start == b.start && a.end == b.end) {
	            return 0;
	          }
	          return 1;
	        });
	        var layers = [];
	        (0, _forEach2.default)(block.values, function (datum) {
	          var placed = false;
	          (0, _forEach2.default)(layers, function (layer, i) {
	            // try to place datum
	            var lastDatumInLayer = layer.slice(0).pop();
	            if (lastDatumInLayer.end + margin < datum.start) {
	              layer.push(datum);
	              datum.layer = i;
	              placed = true;
	              return false;
	            }
	          });
	          if (!placed) {
	            datum.layer = layers.length;
	            layers.push([datum]);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'datumRadialPosition',
	    value: function datumRadialPosition(d) {
	      var radialStart = (this.conf.thickness + this.conf.radialMargin) * d.layer;
	      var radialEnd = radialStart + this.conf.thickness;

	      if (this.conf.direction === 'out') {
	        return [this.conf.innerRadius + radialStart, Math.min(this.conf.innerRadius + radialEnd, this.conf.outerRadius)];
	      }

	      if (this.conf.direction === 'in') {
	        return [Math.max(this.conf.outerRadius - radialEnd, this.conf.innerRadius), this.conf.outerRadius - radialStart];
	      }

	      if (this.conf.direction === 'center') {
	        var origin = Math.floor((this.conf.outerRadius + this.conf.innerRadius) / 2);
	        var _radialStart = (this.conf.thickness + this.conf.radialMargin) * Math.floor(d.layer / 2);
	        var _radialEnd = _radialStart + this.conf.thickness;

	        if (d.layer % 2 === 0) {
	          return [origin + _radialStart, origin + _radialEnd];
	        } else {
	          return [origin - _radialStart - this.conf.radialMargin, origin - _radialEnd - this.conf.radialMargin];
	        }
	      }
	    }
	  }, {
	    key: 'renderDatumContainer',
	    value: function renderDatumContainer(instance, parentElement, name, data, conf) {
	      var track = parentElement.append('g').attr('class', conf.colorPalette);
	      return this.renderBlock(track, data, instance._layout, conf);
	    }
	  }, {
	    key: 'renderDatum',
	    value: function renderDatum(parentElement, conf, layout, utils) {
	      var that = this;

	      return parentElement.selectAll('.tile').data(function (d) {
	        return d.values.map(function (datum) {
	          var radius = that.datumRadialPosition(datum);
	          return {
	            innerRadius: radius[0],
	            outerRadius: radius[1],
	            startAngle: utils.theta(datum.start, layout.blocks[datum.block_id]),
	            endAngle: utils.theta(datum.end, layout.blocks[datum.block_id])
	          };
	        });
	      }).enter().append('path').attr('class', 'tile').attr('d', (0, _d3Shape.arc)()).attr('opacity', conf.opacity).attr('stroke-width', conf.strokeWidth).attr('stroke', conf.strokeColor).attr('fill', conf.color).attr('class', function (d) {
	        if (conf.usePalette) {
	          return 'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
	        }
	      });
	    }
	  }]);

	  return Stack;
	}(_Track3.default);

	exports.default = Stack;

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(297);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(203)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./colorBrewer.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./colorBrewer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, "/* This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/). */\n.YlGn .q0-3{fill:rgb(247,252,185)}\n.YlGn .q1-3{fill:rgb(173,221,142)}\n.YlGn .q2-3{fill:rgb(49,163,84)}\n.YlGn .q0-4{fill:rgb(255,255,204)}\n.YlGn .q1-4{fill:rgb(194,230,153)}\n.YlGn .q2-4{fill:rgb(120,198,121)}\n.YlGn .q3-4{fill:rgb(35,132,67)}\n.YlGn .q0-5{fill:rgb(255,255,204)}\n.YlGn .q1-5{fill:rgb(194,230,153)}\n.YlGn .q2-5{fill:rgb(120,198,121)}\n.YlGn .q3-5{fill:rgb(49,163,84)}\n.YlGn .q4-5{fill:rgb(0,104,55)}\n.YlGn .q0-6{fill:rgb(255,255,204)}\n.YlGn .q1-6{fill:rgb(217,240,163)}\n.YlGn .q2-6{fill:rgb(173,221,142)}\n.YlGn .q3-6{fill:rgb(120,198,121)}\n.YlGn .q4-6{fill:rgb(49,163,84)}\n.YlGn .q5-6{fill:rgb(0,104,55)}\n.YlGn .q0-7{fill:rgb(255,255,204)}\n.YlGn .q1-7{fill:rgb(217,240,163)}\n.YlGn .q2-7{fill:rgb(173,221,142)}\n.YlGn .q3-7{fill:rgb(120,198,121)}\n.YlGn .q4-7{fill:rgb(65,171,93)}\n.YlGn .q5-7{fill:rgb(35,132,67)}\n.YlGn .q6-7{fill:rgb(0,90,50)}\n.YlGn .q0-8{fill:rgb(255,255,229)}\n.YlGn .q1-8{fill:rgb(247,252,185)}\n.YlGn .q2-8{fill:rgb(217,240,163)}\n.YlGn .q3-8{fill:rgb(173,221,142)}\n.YlGn .q4-8{fill:rgb(120,198,121)}\n.YlGn .q5-8{fill:rgb(65,171,93)}\n.YlGn .q6-8{fill:rgb(35,132,67)}\n.YlGn .q7-8{fill:rgb(0,90,50)}\n.YlGn .q0-9{fill:rgb(255,255,229)}\n.YlGn .q1-9{fill:rgb(247,252,185)}\n.YlGn .q2-9{fill:rgb(217,240,163)}\n.YlGn .q3-9{fill:rgb(173,221,142)}\n.YlGn .q4-9{fill:rgb(120,198,121)}\n.YlGn .q5-9{fill:rgb(65,171,93)}\n.YlGn .q6-9{fill:rgb(35,132,67)}\n.YlGn .q7-9{fill:rgb(0,104,55)}\n.YlGn .q8-9{fill:rgb(0,69,41)}\n.YlGnBu .q0-3{fill:rgb(237,248,177)}\n.YlGnBu .q1-3{fill:rgb(127,205,187)}\n.YlGnBu .q2-3{fill:rgb(44,127,184)}\n.YlGnBu .q0-4{fill:rgb(255,255,204)}\n.YlGnBu .q1-4{fill:rgb(161,218,180)}\n.YlGnBu .q2-4{fill:rgb(65,182,196)}\n.YlGnBu .q3-4{fill:rgb(34,94,168)}\n.YlGnBu .q0-5{fill:rgb(255,255,204)}\n.YlGnBu .q1-5{fill:rgb(161,218,180)}\n.YlGnBu .q2-5{fill:rgb(65,182,196)}\n.YlGnBu .q3-5{fill:rgb(44,127,184)}\n.YlGnBu .q4-5{fill:rgb(37,52,148)}\n.YlGnBu .q0-6{fill:rgb(255,255,204)}\n.YlGnBu .q1-6{fill:rgb(199,233,180)}\n.YlGnBu .q2-6{fill:rgb(127,205,187)}\n.YlGnBu .q3-6{fill:rgb(65,182,196)}\n.YlGnBu .q4-6{fill:rgb(44,127,184)}\n.YlGnBu .q5-6{fill:rgb(37,52,148)}\n.YlGnBu .q0-7{fill:rgb(255,255,204)}\n.YlGnBu .q1-7{fill:rgb(199,233,180)}\n.YlGnBu .q2-7{fill:rgb(127,205,187)}\n.YlGnBu .q3-7{fill:rgb(65,182,196)}\n.YlGnBu .q4-7{fill:rgb(29,145,192)}\n.YlGnBu .q5-7{fill:rgb(34,94,168)}\n.YlGnBu .q6-7{fill:rgb(12,44,132)}\n.YlGnBu .q0-8{fill:rgb(255,255,217)}\n.YlGnBu .q1-8{fill:rgb(237,248,177)}\n.YlGnBu .q2-8{fill:rgb(199,233,180)}\n.YlGnBu .q3-8{fill:rgb(127,205,187)}\n.YlGnBu .q4-8{fill:rgb(65,182,196)}\n.YlGnBu .q5-8{fill:rgb(29,145,192)}\n.YlGnBu .q6-8{fill:rgb(34,94,168)}\n.YlGnBu .q7-8{fill:rgb(12,44,132)}\n.YlGnBu .q0-9{fill:rgb(255,255,217)}\n.YlGnBu .q1-9{fill:rgb(237,248,177)}\n.YlGnBu .q2-9{fill:rgb(199,233,180)}\n.YlGnBu .q3-9{fill:rgb(127,205,187)}\n.YlGnBu .q4-9{fill:rgb(65,182,196)}\n.YlGnBu .q5-9{fill:rgb(29,145,192)}\n.YlGnBu .q6-9{fill:rgb(34,94,168)}\n.YlGnBu .q7-9{fill:rgb(37,52,148)}\n.YlGnBu .q8-9{fill:rgb(8,29,88)}\n.GnBu .q0-3{fill:rgb(224,243,219)}\n.GnBu .q1-3{fill:rgb(168,221,181)}\n.GnBu .q2-3{fill:rgb(67,162,202)}\n.GnBu .q0-4{fill:rgb(240,249,232)}\n.GnBu .q1-4{fill:rgb(186,228,188)}\n.GnBu .q2-4{fill:rgb(123,204,196)}\n.GnBu .q3-4{fill:rgb(43,140,190)}\n.GnBu .q0-5{fill:rgb(240,249,232)}\n.GnBu .q1-5{fill:rgb(186,228,188)}\n.GnBu .q2-5{fill:rgb(123,204,196)}\n.GnBu .q3-5{fill:rgb(67,162,202)}\n.GnBu .q4-5{fill:rgb(8,104,172)}\n.GnBu .q0-6{fill:rgb(240,249,232)}\n.GnBu .q1-6{fill:rgb(204,235,197)}\n.GnBu .q2-6{fill:rgb(168,221,181)}\n.GnBu .q3-6{fill:rgb(123,204,196)}\n.GnBu .q4-6{fill:rgb(67,162,202)}\n.GnBu .q5-6{fill:rgb(8,104,172)}\n.GnBu .q0-7{fill:rgb(240,249,232)}\n.GnBu .q1-7{fill:rgb(204,235,197)}\n.GnBu .q2-7{fill:rgb(168,221,181)}\n.GnBu .q3-7{fill:rgb(123,204,196)}\n.GnBu .q4-7{fill:rgb(78,179,211)}\n.GnBu .q5-7{fill:rgb(43,140,190)}\n.GnBu .q6-7{fill:rgb(8,88,158)}\n.GnBu .q0-8{fill:rgb(247,252,240)}\n.GnBu .q1-8{fill:rgb(224,243,219)}\n.GnBu .q2-8{fill:rgb(204,235,197)}\n.GnBu .q3-8{fill:rgb(168,221,181)}\n.GnBu .q4-8{fill:rgb(123,204,196)}\n.GnBu .q5-8{fill:rgb(78,179,211)}\n.GnBu .q6-8{fill:rgb(43,140,190)}\n.GnBu .q7-8{fill:rgb(8,88,158)}\n.GnBu .q0-9{fill:rgb(247,252,240)}\n.GnBu .q1-9{fill:rgb(224,243,219)}\n.GnBu .q2-9{fill:rgb(204,235,197)}\n.GnBu .q3-9{fill:rgb(168,221,181)}\n.GnBu .q4-9{fill:rgb(123,204,196)}\n.GnBu .q5-9{fill:rgb(78,179,211)}\n.GnBu .q6-9{fill:rgb(43,140,190)}\n.GnBu .q7-9{fill:rgb(8,104,172)}\n.GnBu .q8-9{fill:rgb(8,64,129)}\n.BuGn .q0-3{fill:rgb(229,245,249)}\n.BuGn .q1-3{fill:rgb(153,216,201)}\n.BuGn .q2-3{fill:rgb(44,162,95)}\n.BuGn .q0-4{fill:rgb(237,248,251)}\n.BuGn .q1-4{fill:rgb(178,226,226)}\n.BuGn .q2-4{fill:rgb(102,194,164)}\n.BuGn .q3-4{fill:rgb(35,139,69)}\n.BuGn .q0-5{fill:rgb(237,248,251)}\n.BuGn .q1-5{fill:rgb(178,226,226)}\n.BuGn .q2-5{fill:rgb(102,194,164)}\n.BuGn .q3-5{fill:rgb(44,162,95)}\n.BuGn .q4-5{fill:rgb(0,109,44)}\n.BuGn .q0-6{fill:rgb(237,248,251)}\n.BuGn .q1-6{fill:rgb(204,236,230)}\n.BuGn .q2-6{fill:rgb(153,216,201)}\n.BuGn .q3-6{fill:rgb(102,194,164)}\n.BuGn .q4-6{fill:rgb(44,162,95)}\n.BuGn .q5-6{fill:rgb(0,109,44)}\n.BuGn .q0-7{fill:rgb(237,248,251)}\n.BuGn .q1-7{fill:rgb(204,236,230)}\n.BuGn .q2-7{fill:rgb(153,216,201)}\n.BuGn .q3-7{fill:rgb(102,194,164)}\n.BuGn .q4-7{fill:rgb(65,174,118)}\n.BuGn .q5-7{fill:rgb(35,139,69)}\n.BuGn .q6-7{fill:rgb(0,88,36)}\n.BuGn .q0-8{fill:rgb(247,252,253)}\n.BuGn .q1-8{fill:rgb(229,245,249)}\n.BuGn .q2-8{fill:rgb(204,236,230)}\n.BuGn .q3-8{fill:rgb(153,216,201)}\n.BuGn .q4-8{fill:rgb(102,194,164)}\n.BuGn .q5-8{fill:rgb(65,174,118)}\n.BuGn .q6-8{fill:rgb(35,139,69)}\n.BuGn .q7-8{fill:rgb(0,88,36)}\n.BuGn .q0-9{fill:rgb(247,252,253)}\n.BuGn .q1-9{fill:rgb(229,245,249)}\n.BuGn .q2-9{fill:rgb(204,236,230)}\n.BuGn .q3-9{fill:rgb(153,216,201)}\n.BuGn .q4-9{fill:rgb(102,194,164)}\n.BuGn .q5-9{fill:rgb(65,174,118)}\n.BuGn .q6-9{fill:rgb(35,139,69)}\n.BuGn .q7-9{fill:rgb(0,109,44)}\n.BuGn .q8-9{fill:rgb(0,68,27)}\n.PuBuGn .q0-3{fill:rgb(236,226,240)}\n.PuBuGn .q1-3{fill:rgb(166,189,219)}\n.PuBuGn .q2-3{fill:rgb(28,144,153)}\n.PuBuGn .q0-4{fill:rgb(246,239,247)}\n.PuBuGn .q1-4{fill:rgb(189,201,225)}\n.PuBuGn .q2-4{fill:rgb(103,169,207)}\n.PuBuGn .q3-4{fill:rgb(2,129,138)}\n.PuBuGn .q0-5{fill:rgb(246,239,247)}\n.PuBuGn .q1-5{fill:rgb(189,201,225)}\n.PuBuGn .q2-5{fill:rgb(103,169,207)}\n.PuBuGn .q3-5{fill:rgb(28,144,153)}\n.PuBuGn .q4-5{fill:rgb(1,108,89)}\n.PuBuGn .q0-6{fill:rgb(246,239,247)}\n.PuBuGn .q1-6{fill:rgb(208,209,230)}\n.PuBuGn .q2-6{fill:rgb(166,189,219)}\n.PuBuGn .q3-6{fill:rgb(103,169,207)}\n.PuBuGn .q4-6{fill:rgb(28,144,153)}\n.PuBuGn .q5-6{fill:rgb(1,108,89)}\n.PuBuGn .q0-7{fill:rgb(246,239,247)}\n.PuBuGn .q1-7{fill:rgb(208,209,230)}\n.PuBuGn .q2-7{fill:rgb(166,189,219)}\n.PuBuGn .q3-7{fill:rgb(103,169,207)}\n.PuBuGn .q4-7{fill:rgb(54,144,192)}\n.PuBuGn .q5-7{fill:rgb(2,129,138)}\n.PuBuGn .q6-7{fill:rgb(1,100,80)}\n.PuBuGn .q0-8{fill:rgb(255,247,251)}\n.PuBuGn .q1-8{fill:rgb(236,226,240)}\n.PuBuGn .q2-8{fill:rgb(208,209,230)}\n.PuBuGn .q3-8{fill:rgb(166,189,219)}\n.PuBuGn .q4-8{fill:rgb(103,169,207)}\n.PuBuGn .q5-8{fill:rgb(54,144,192)}\n.PuBuGn .q6-8{fill:rgb(2,129,138)}\n.PuBuGn .q7-8{fill:rgb(1,100,80)}\n.PuBuGn .q0-9{fill:rgb(255,247,251)}\n.PuBuGn .q1-9{fill:rgb(236,226,240)}\n.PuBuGn .q2-9{fill:rgb(208,209,230)}\n.PuBuGn .q3-9{fill:rgb(166,189,219)}\n.PuBuGn .q4-9{fill:rgb(103,169,207)}\n.PuBuGn .q5-9{fill:rgb(54,144,192)}\n.PuBuGn .q6-9{fill:rgb(2,129,138)}\n.PuBuGn .q7-9{fill:rgb(1,108,89)}\n.PuBuGn .q8-9{fill:rgb(1,70,54)}\n.PuBu .q0-3{fill:rgb(236,231,242)}\n.PuBu .q1-3{fill:rgb(166,189,219)}\n.PuBu .q2-3{fill:rgb(43,140,190)}\n.PuBu .q0-4{fill:rgb(241,238,246)}\n.PuBu .q1-4{fill:rgb(189,201,225)}\n.PuBu .q2-4{fill:rgb(116,169,207)}\n.PuBu .q3-4{fill:rgb(5,112,176)}\n.PuBu .q0-5{fill:rgb(241,238,246)}\n.PuBu .q1-5{fill:rgb(189,201,225)}\n.PuBu .q2-5{fill:rgb(116,169,207)}\n.PuBu .q3-5{fill:rgb(43,140,190)}\n.PuBu .q4-5{fill:rgb(4,90,141)}\n.PuBu .q0-6{fill:rgb(241,238,246)}\n.PuBu .q1-6{fill:rgb(208,209,230)}\n.PuBu .q2-6{fill:rgb(166,189,219)}\n.PuBu .q3-6{fill:rgb(116,169,207)}\n.PuBu .q4-6{fill:rgb(43,140,190)}\n.PuBu .q5-6{fill:rgb(4,90,141)}\n.PuBu .q0-7{fill:rgb(241,238,246)}\n.PuBu .q1-7{fill:rgb(208,209,230)}\n.PuBu .q2-7{fill:rgb(166,189,219)}\n.PuBu .q3-7{fill:rgb(116,169,207)}\n.PuBu .q4-7{fill:rgb(54,144,192)}\n.PuBu .q5-7{fill:rgb(5,112,176)}\n.PuBu .q6-7{fill:rgb(3,78,123)}\n.PuBu .q0-8{fill:rgb(255,247,251)}\n.PuBu .q1-8{fill:rgb(236,231,242)}\n.PuBu .q2-8{fill:rgb(208,209,230)}\n.PuBu .q3-8{fill:rgb(166,189,219)}\n.PuBu .q4-8{fill:rgb(116,169,207)}\n.PuBu .q5-8{fill:rgb(54,144,192)}\n.PuBu .q6-8{fill:rgb(5,112,176)}\n.PuBu .q7-8{fill:rgb(3,78,123)}\n.PuBu .q0-9{fill:rgb(255,247,251)}\n.PuBu .q1-9{fill:rgb(236,231,242)}\n.PuBu .q2-9{fill:rgb(208,209,230)}\n.PuBu .q3-9{fill:rgb(166,189,219)}\n.PuBu .q4-9{fill:rgb(116,169,207)}\n.PuBu .q5-9{fill:rgb(54,144,192)}\n.PuBu .q6-9{fill:rgb(5,112,176)}\n.PuBu .q7-9{fill:rgb(4,90,141)}\n.PuBu .q8-9{fill:rgb(2,56,88)}\n.BuPu .q0-3{fill:rgb(224,236,244)}\n.BuPu .q1-3{fill:rgb(158,188,218)}\n.BuPu .q2-3{fill:rgb(136,86,167)}\n.BuPu .q0-4{fill:rgb(237,248,251)}\n.BuPu .q1-4{fill:rgb(179,205,227)}\n.BuPu .q2-4{fill:rgb(140,150,198)}\n.BuPu .q3-4{fill:rgb(136,65,157)}\n.BuPu .q0-5{fill:rgb(237,248,251)}\n.BuPu .q1-5{fill:rgb(179,205,227)}\n.BuPu .q2-5{fill:rgb(140,150,198)}\n.BuPu .q3-5{fill:rgb(136,86,167)}\n.BuPu .q4-5{fill:rgb(129,15,124)}\n.BuPu .q0-6{fill:rgb(237,248,251)}\n.BuPu .q1-6{fill:rgb(191,211,230)}\n.BuPu .q2-6{fill:rgb(158,188,218)}\n.BuPu .q3-6{fill:rgb(140,150,198)}\n.BuPu .q4-6{fill:rgb(136,86,167)}\n.BuPu .q5-6{fill:rgb(129,15,124)}\n.BuPu .q0-7{fill:rgb(237,248,251)}\n.BuPu .q1-7{fill:rgb(191,211,230)}\n.BuPu .q2-7{fill:rgb(158,188,218)}\n.BuPu .q3-7{fill:rgb(140,150,198)}\n.BuPu .q4-7{fill:rgb(140,107,177)}\n.BuPu .q5-7{fill:rgb(136,65,157)}\n.BuPu .q6-7{fill:rgb(110,1,107)}\n.BuPu .q0-8{fill:rgb(247,252,253)}\n.BuPu .q1-8{fill:rgb(224,236,244)}\n.BuPu .q2-8{fill:rgb(191,211,230)}\n.BuPu .q3-8{fill:rgb(158,188,218)}\n.BuPu .q4-8{fill:rgb(140,150,198)}\n.BuPu .q5-8{fill:rgb(140,107,177)}\n.BuPu .q6-8{fill:rgb(136,65,157)}\n.BuPu .q7-8{fill:rgb(110,1,107)}\n.BuPu .q0-9{fill:rgb(247,252,253)}\n.BuPu .q1-9{fill:rgb(224,236,244)}\n.BuPu .q2-9{fill:rgb(191,211,230)}\n.BuPu .q3-9{fill:rgb(158,188,218)}\n.BuPu .q4-9{fill:rgb(140,150,198)}\n.BuPu .q5-9{fill:rgb(140,107,177)}\n.BuPu .q6-9{fill:rgb(136,65,157)}\n.BuPu .q7-9{fill:rgb(129,15,124)}\n.BuPu .q8-9{fill:rgb(77,0,75)}\n.RdPu .q0-3{fill:rgb(253,224,221)}\n.RdPu .q1-3{fill:rgb(250,159,181)}\n.RdPu .q2-3{fill:rgb(197,27,138)}\n.RdPu .q0-4{fill:rgb(254,235,226)}\n.RdPu .q1-4{fill:rgb(251,180,185)}\n.RdPu .q2-4{fill:rgb(247,104,161)}\n.RdPu .q3-4{fill:rgb(174,1,126)}\n.RdPu .q0-5{fill:rgb(254,235,226)}\n.RdPu .q1-5{fill:rgb(251,180,185)}\n.RdPu .q2-5{fill:rgb(247,104,161)}\n.RdPu .q3-5{fill:rgb(197,27,138)}\n.RdPu .q4-5{fill:rgb(122,1,119)}\n.RdPu .q0-6{fill:rgb(254,235,226)}\n.RdPu .q1-6{fill:rgb(252,197,192)}\n.RdPu .q2-6{fill:rgb(250,159,181)}\n.RdPu .q3-6{fill:rgb(247,104,161)}\n.RdPu .q4-6{fill:rgb(197,27,138)}\n.RdPu .q5-6{fill:rgb(122,1,119)}\n.RdPu .q0-7{fill:rgb(254,235,226)}\n.RdPu .q1-7{fill:rgb(252,197,192)}\n.RdPu .q2-7{fill:rgb(250,159,181)}\n.RdPu .q3-7{fill:rgb(247,104,161)}\n.RdPu .q4-7{fill:rgb(221,52,151)}\n.RdPu .q5-7{fill:rgb(174,1,126)}\n.RdPu .q6-7{fill:rgb(122,1,119)}\n.RdPu .q0-8{fill:rgb(255,247,243)}\n.RdPu .q1-8{fill:rgb(253,224,221)}\n.RdPu .q2-8{fill:rgb(252,197,192)}\n.RdPu .q3-8{fill:rgb(250,159,181)}\n.RdPu .q4-8{fill:rgb(247,104,161)}\n.RdPu .q5-8{fill:rgb(221,52,151)}\n.RdPu .q6-8{fill:rgb(174,1,126)}\n.RdPu .q7-8{fill:rgb(122,1,119)}\n.RdPu .q0-9{fill:rgb(255,247,243)}\n.RdPu .q1-9{fill:rgb(253,224,221)}\n.RdPu .q2-9{fill:rgb(252,197,192)}\n.RdPu .q3-9{fill:rgb(250,159,181)}\n.RdPu .q4-9{fill:rgb(247,104,161)}\n.RdPu .q5-9{fill:rgb(221,52,151)}\n.RdPu .q6-9{fill:rgb(174,1,126)}\n.RdPu .q7-9{fill:rgb(122,1,119)}\n.RdPu .q8-9{fill:rgb(73,0,106)}\n.PuRd .q0-3{fill:rgb(231,225,239)}\n.PuRd .q1-3{fill:rgb(201,148,199)}\n.PuRd .q2-3{fill:rgb(221,28,119)}\n.PuRd .q0-4{fill:rgb(241,238,246)}\n.PuRd .q1-4{fill:rgb(215,181,216)}\n.PuRd .q2-4{fill:rgb(223,101,176)}\n.PuRd .q3-4{fill:rgb(206,18,86)}\n.PuRd .q0-5{fill:rgb(241,238,246)}\n.PuRd .q1-5{fill:rgb(215,181,216)}\n.PuRd .q2-5{fill:rgb(223,101,176)}\n.PuRd .q3-5{fill:rgb(221,28,119)}\n.PuRd .q4-5{fill:rgb(152,0,67)}\n.PuRd .q0-6{fill:rgb(241,238,246)}\n.PuRd .q1-6{fill:rgb(212,185,218)}\n.PuRd .q2-6{fill:rgb(201,148,199)}\n.PuRd .q3-6{fill:rgb(223,101,176)}\n.PuRd .q4-6{fill:rgb(221,28,119)}\n.PuRd .q5-6{fill:rgb(152,0,67)}\n.PuRd .q0-7{fill:rgb(241,238,246)}\n.PuRd .q1-7{fill:rgb(212,185,218)}\n.PuRd .q2-7{fill:rgb(201,148,199)}\n.PuRd .q3-7{fill:rgb(223,101,176)}\n.PuRd .q4-7{fill:rgb(231,41,138)}\n.PuRd .q5-7{fill:rgb(206,18,86)}\n.PuRd .q6-7{fill:rgb(145,0,63)}\n.PuRd .q0-8{fill:rgb(247,244,249)}\n.PuRd .q1-8{fill:rgb(231,225,239)}\n.PuRd .q2-8{fill:rgb(212,185,218)}\n.PuRd .q3-8{fill:rgb(201,148,199)}\n.PuRd .q4-8{fill:rgb(223,101,176)}\n.PuRd .q5-8{fill:rgb(231,41,138)}\n.PuRd .q6-8{fill:rgb(206,18,86)}\n.PuRd .q7-8{fill:rgb(145,0,63)}\n.PuRd .q0-9{fill:rgb(247,244,249)}\n.PuRd .q1-9{fill:rgb(231,225,239)}\n.PuRd .q2-9{fill:rgb(212,185,218)}\n.PuRd .q3-9{fill:rgb(201,148,199)}\n.PuRd .q4-9{fill:rgb(223,101,176)}\n.PuRd .q5-9{fill:rgb(231,41,138)}\n.PuRd .q6-9{fill:rgb(206,18,86)}\n.PuRd .q7-9{fill:rgb(152,0,67)}\n.PuRd .q8-9{fill:rgb(103,0,31)}\n.OrRd .q0-3{fill:rgb(254,232,200)}\n.OrRd .q1-3{fill:rgb(253,187,132)}\n.OrRd .q2-3{fill:rgb(227,74,51)}\n.OrRd .q0-4{fill:rgb(254,240,217)}\n.OrRd .q1-4{fill:rgb(253,204,138)}\n.OrRd .q2-4{fill:rgb(252,141,89)}\n.OrRd .q3-4{fill:rgb(215,48,31)}\n.OrRd .q0-5{fill:rgb(254,240,217)}\n.OrRd .q1-5{fill:rgb(253,204,138)}\n.OrRd .q2-5{fill:rgb(252,141,89)}\n.OrRd .q3-5{fill:rgb(227,74,51)}\n.OrRd .q4-5{fill:rgb(179,0,0)}\n.OrRd .q0-6{fill:rgb(254,240,217)}\n.OrRd .q1-6{fill:rgb(253,212,158)}\n.OrRd .q2-6{fill:rgb(253,187,132)}\n.OrRd .q3-6{fill:rgb(252,141,89)}\n.OrRd .q4-6{fill:rgb(227,74,51)}\n.OrRd .q5-6{fill:rgb(179,0,0)}\n.OrRd .q0-7{fill:rgb(254,240,217)}\n.OrRd .q1-7{fill:rgb(253,212,158)}\n.OrRd .q2-7{fill:rgb(253,187,132)}\n.OrRd .q3-7{fill:rgb(252,141,89)}\n.OrRd .q4-7{fill:rgb(239,101,72)}\n.OrRd .q5-7{fill:rgb(215,48,31)}\n.OrRd .q6-7{fill:rgb(153,0,0)}\n.OrRd .q0-8{fill:rgb(255,247,236)}\n.OrRd .q1-8{fill:rgb(254,232,200)}\n.OrRd .q2-8{fill:rgb(253,212,158)}\n.OrRd .q3-8{fill:rgb(253,187,132)}\n.OrRd .q4-8{fill:rgb(252,141,89)}\n.OrRd .q5-8{fill:rgb(239,101,72)}\n.OrRd .q6-8{fill:rgb(215,48,31)}\n.OrRd .q7-8{fill:rgb(153,0,0)}\n.OrRd .q0-9{fill:rgb(255,247,236)}\n.OrRd .q1-9{fill:rgb(254,232,200)}\n.OrRd .q2-9{fill:rgb(253,212,158)}\n.OrRd .q3-9{fill:rgb(253,187,132)}\n.OrRd .q4-9{fill:rgb(252,141,89)}\n.OrRd .q5-9{fill:rgb(239,101,72)}\n.OrRd .q6-9{fill:rgb(215,48,31)}\n.OrRd .q7-9{fill:rgb(179,0,0)}\n.OrRd .q8-9{fill:rgb(127,0,0)}\n.YlOrRd .q0-3{fill:rgb(255,237,160)}\n.YlOrRd .q1-3{fill:rgb(254,178,76)}\n.YlOrRd .q2-3{fill:rgb(240,59,32)}\n.YlOrRd .q0-4{fill:rgb(255,255,178)}\n.YlOrRd .q1-4{fill:rgb(254,204,92)}\n.YlOrRd .q2-4{fill:rgb(253,141,60)}\n.YlOrRd .q3-4{fill:rgb(227,26,28)}\n.YlOrRd .q0-5{fill:rgb(255,255,178)}\n.YlOrRd .q1-5{fill:rgb(254,204,92)}\n.YlOrRd .q2-5{fill:rgb(253,141,60)}\n.YlOrRd .q3-5{fill:rgb(240,59,32)}\n.YlOrRd .q4-5{fill:rgb(189,0,38)}\n.YlOrRd .q0-6{fill:rgb(255,255,178)}\n.YlOrRd .q1-6{fill:rgb(254,217,118)}\n.YlOrRd .q2-6{fill:rgb(254,178,76)}\n.YlOrRd .q3-6{fill:rgb(253,141,60)}\n.YlOrRd .q4-6{fill:rgb(240,59,32)}\n.YlOrRd .q5-6{fill:rgb(189,0,38)}\n.YlOrRd .q0-7{fill:rgb(255,255,178)}\n.YlOrRd .q1-7{fill:rgb(254,217,118)}\n.YlOrRd .q2-7{fill:rgb(254,178,76)}\n.YlOrRd .q3-7{fill:rgb(253,141,60)}\n.YlOrRd .q4-7{fill:rgb(252,78,42)}\n.YlOrRd .q5-7{fill:rgb(227,26,28)}\n.YlOrRd .q6-7{fill:rgb(177,0,38)}\n.YlOrRd .q0-8{fill:rgb(255,255,204)}\n.YlOrRd .q1-8{fill:rgb(255,237,160)}\n.YlOrRd .q2-8{fill:rgb(254,217,118)}\n.YlOrRd .q3-8{fill:rgb(254,178,76)}\n.YlOrRd .q4-8{fill:rgb(253,141,60)}\n.YlOrRd .q5-8{fill:rgb(252,78,42)}\n.YlOrRd .q6-8{fill:rgb(227,26,28)}\n.YlOrRd .q7-8{fill:rgb(177,0,38)}\n.YlOrRd .q0-9{fill:rgb(255,255,204)}\n.YlOrRd .q1-9{fill:rgb(255,237,160)}\n.YlOrRd .q2-9{fill:rgb(254,217,118)}\n.YlOrRd .q3-9{fill:rgb(254,178,76)}\n.YlOrRd .q4-9{fill:rgb(253,141,60)}\n.YlOrRd .q5-9{fill:rgb(252,78,42)}\n.YlOrRd .q6-9{fill:rgb(227,26,28)}\n.YlOrRd .q7-9{fill:rgb(189,0,38)}\n.YlOrRd .q8-9{fill:rgb(128,0,38)}\n.YlOrBr .q0-3{fill:rgb(255,247,188)}\n.YlOrBr .q1-3{fill:rgb(254,196,79)}\n.YlOrBr .q2-3{fill:rgb(217,95,14)}\n.YlOrBr .q0-4{fill:rgb(255,255,212)}\n.YlOrBr .q1-4{fill:rgb(254,217,142)}\n.YlOrBr .q2-4{fill:rgb(254,153,41)}\n.YlOrBr .q3-4{fill:rgb(204,76,2)}\n.YlOrBr .q0-5{fill:rgb(255,255,212)}\n.YlOrBr .q1-5{fill:rgb(254,217,142)}\n.YlOrBr .q2-5{fill:rgb(254,153,41)}\n.YlOrBr .q3-5{fill:rgb(217,95,14)}\n.YlOrBr .q4-5{fill:rgb(153,52,4)}\n.YlOrBr .q0-6{fill:rgb(255,255,212)}\n.YlOrBr .q1-6{fill:rgb(254,227,145)}\n.YlOrBr .q2-6{fill:rgb(254,196,79)}\n.YlOrBr .q3-6{fill:rgb(254,153,41)}\n.YlOrBr .q4-6{fill:rgb(217,95,14)}\n.YlOrBr .q5-6{fill:rgb(153,52,4)}\n.YlOrBr .q0-7{fill:rgb(255,255,212)}\n.YlOrBr .q1-7{fill:rgb(254,227,145)}\n.YlOrBr .q2-7{fill:rgb(254,196,79)}\n.YlOrBr .q3-7{fill:rgb(254,153,41)}\n.YlOrBr .q4-7{fill:rgb(236,112,20)}\n.YlOrBr .q5-7{fill:rgb(204,76,2)}\n.YlOrBr .q6-7{fill:rgb(140,45,4)}\n.YlOrBr .q0-8{fill:rgb(255,255,229)}\n.YlOrBr .q1-8{fill:rgb(255,247,188)}\n.YlOrBr .q2-8{fill:rgb(254,227,145)}\n.YlOrBr .q3-8{fill:rgb(254,196,79)}\n.YlOrBr .q4-8{fill:rgb(254,153,41)}\n.YlOrBr .q5-8{fill:rgb(236,112,20)}\n.YlOrBr .q6-8{fill:rgb(204,76,2)}\n.YlOrBr .q7-8{fill:rgb(140,45,4)}\n.YlOrBr .q0-9{fill:rgb(255,255,229)}\n.YlOrBr .q1-9{fill:rgb(255,247,188)}\n.YlOrBr .q2-9{fill:rgb(254,227,145)}\n.YlOrBr .q3-9{fill:rgb(254,196,79)}\n.YlOrBr .q4-9{fill:rgb(254,153,41)}\n.YlOrBr .q5-9{fill:rgb(236,112,20)}\n.YlOrBr .q6-9{fill:rgb(204,76,2)}\n.YlOrBr .q7-9{fill:rgb(153,52,4)}\n.YlOrBr .q8-9{fill:rgb(102,37,6)}\n.Purples .q0-3{fill:rgb(239,237,245)}\n.Purples .q1-3{fill:rgb(188,189,220)}\n.Purples .q2-3{fill:rgb(117,107,177)}\n.Purples .q0-4{fill:rgb(242,240,247)}\n.Purples .q1-4{fill:rgb(203,201,226)}\n.Purples .q2-4{fill:rgb(158,154,200)}\n.Purples .q3-4{fill:rgb(106,81,163)}\n.Purples .q0-5{fill:rgb(242,240,247)}\n.Purples .q1-5{fill:rgb(203,201,226)}\n.Purples .q2-5{fill:rgb(158,154,200)}\n.Purples .q3-5{fill:rgb(117,107,177)}\n.Purples .q4-5{fill:rgb(84,39,143)}\n.Purples .q0-6{fill:rgb(242,240,247)}\n.Purples .q1-6{fill:rgb(218,218,235)}\n.Purples .q2-6{fill:rgb(188,189,220)}\n.Purples .q3-6{fill:rgb(158,154,200)}\n.Purples .q4-6{fill:rgb(117,107,177)}\n.Purples .q5-6{fill:rgb(84,39,143)}\n.Purples .q0-7{fill:rgb(242,240,247)}\n.Purples .q1-7{fill:rgb(218,218,235)}\n.Purples .q2-7{fill:rgb(188,189,220)}\n.Purples .q3-7{fill:rgb(158,154,200)}\n.Purples .q4-7{fill:rgb(128,125,186)}\n.Purples .q5-7{fill:rgb(106,81,163)}\n.Purples .q6-7{fill:rgb(74,20,134)}\n.Purples .q0-8{fill:rgb(252,251,253)}\n.Purples .q1-8{fill:rgb(239,237,245)}\n.Purples .q2-8{fill:rgb(218,218,235)}\n.Purples .q3-8{fill:rgb(188,189,220)}\n.Purples .q4-8{fill:rgb(158,154,200)}\n.Purples .q5-8{fill:rgb(128,125,186)}\n.Purples .q6-8{fill:rgb(106,81,163)}\n.Purples .q7-8{fill:rgb(74,20,134)}\n.Purples .q0-9{fill:rgb(252,251,253)}\n.Purples .q1-9{fill:rgb(239,237,245)}\n.Purples .q2-9{fill:rgb(218,218,235)}\n.Purples .q3-9{fill:rgb(188,189,220)}\n.Purples .q4-9{fill:rgb(158,154,200)}\n.Purples .q5-9{fill:rgb(128,125,186)}\n.Purples .q6-9{fill:rgb(106,81,163)}\n.Purples .q7-9{fill:rgb(84,39,143)}\n.Purples .q8-9{fill:rgb(63,0,125)}\n.Blues .q0-3{fill:rgb(222,235,247)}\n.Blues .q1-3{fill:rgb(158,202,225)}\n.Blues .q2-3{fill:rgb(49,130,189)}\n.Blues .q0-4{fill:rgb(239,243,255)}\n.Blues .q1-4{fill:rgb(189,215,231)}\n.Blues .q2-4{fill:rgb(107,174,214)}\n.Blues .q3-4{fill:rgb(33,113,181)}\n.Blues .q0-5{fill:rgb(239,243,255)}\n.Blues .q1-5{fill:rgb(189,215,231)}\n.Blues .q2-5{fill:rgb(107,174,214)}\n.Blues .q3-5{fill:rgb(49,130,189)}\n.Blues .q4-5{fill:rgb(8,81,156)}\n.Blues .q0-6{fill:rgb(239,243,255)}\n.Blues .q1-6{fill:rgb(198,219,239)}\n.Blues .q2-6{fill:rgb(158,202,225)}\n.Blues .q3-6{fill:rgb(107,174,214)}\n.Blues .q4-6{fill:rgb(49,130,189)}\n.Blues .q5-6{fill:rgb(8,81,156)}\n.Blues .q0-7{fill:rgb(239,243,255)}\n.Blues .q1-7{fill:rgb(198,219,239)}\n.Blues .q2-7{fill:rgb(158,202,225)}\n.Blues .q3-7{fill:rgb(107,174,214)}\n.Blues .q4-7{fill:rgb(66,146,198)}\n.Blues .q5-7{fill:rgb(33,113,181)}\n.Blues .q6-7{fill:rgb(8,69,148)}\n.Blues .q0-8{fill:rgb(247,251,255)}\n.Blues .q1-8{fill:rgb(222,235,247)}\n.Blues .q2-8{fill:rgb(198,219,239)}\n.Blues .q3-8{fill:rgb(158,202,225)}\n.Blues .q4-8{fill:rgb(107,174,214)}\n.Blues .q5-8{fill:rgb(66,146,198)}\n.Blues .q6-8{fill:rgb(33,113,181)}\n.Blues .q7-8{fill:rgb(8,69,148)}\n.Blues .q0-9{fill:rgb(247,251,255)}\n.Blues .q1-9{fill:rgb(222,235,247)}\n.Blues .q2-9{fill:rgb(198,219,239)}\n.Blues .q3-9{fill:rgb(158,202,225)}\n.Blues .q4-9{fill:rgb(107,174,214)}\n.Blues .q5-9{fill:rgb(66,146,198)}\n.Blues .q6-9{fill:rgb(33,113,181)}\n.Blues .q7-9{fill:rgb(8,81,156)}\n.Blues .q8-9{fill:rgb(8,48,107)}\n.Greens .q0-3{fill:rgb(229,245,224)}\n.Greens .q1-3{fill:rgb(161,217,155)}\n.Greens .q2-3{fill:rgb(49,163,84)}\n.Greens .q0-4{fill:rgb(237,248,233)}\n.Greens .q1-4{fill:rgb(186,228,179)}\n.Greens .q2-4{fill:rgb(116,196,118)}\n.Greens .q3-4{fill:rgb(35,139,69)}\n.Greens .q0-5{fill:rgb(237,248,233)}\n.Greens .q1-5{fill:rgb(186,228,179)}\n.Greens .q2-5{fill:rgb(116,196,118)}\n.Greens .q3-5{fill:rgb(49,163,84)}\n.Greens .q4-5{fill:rgb(0,109,44)}\n.Greens .q0-6{fill:rgb(237,248,233)}\n.Greens .q1-6{fill:rgb(199,233,192)}\n.Greens .q2-6{fill:rgb(161,217,155)}\n.Greens .q3-6{fill:rgb(116,196,118)}\n.Greens .q4-6{fill:rgb(49,163,84)}\n.Greens .q5-6{fill:rgb(0,109,44)}\n.Greens .q0-7{fill:rgb(237,248,233)}\n.Greens .q1-7{fill:rgb(199,233,192)}\n.Greens .q2-7{fill:rgb(161,217,155)}\n.Greens .q3-7{fill:rgb(116,196,118)}\n.Greens .q4-7{fill:rgb(65,171,93)}\n.Greens .q5-7{fill:rgb(35,139,69)}\n.Greens .q6-7{fill:rgb(0,90,50)}\n.Greens .q0-8{fill:rgb(247,252,245)}\n.Greens .q1-8{fill:rgb(229,245,224)}\n.Greens .q2-8{fill:rgb(199,233,192)}\n.Greens .q3-8{fill:rgb(161,217,155)}\n.Greens .q4-8{fill:rgb(116,196,118)}\n.Greens .q5-8{fill:rgb(65,171,93)}\n.Greens .q6-8{fill:rgb(35,139,69)}\n.Greens .q7-8{fill:rgb(0,90,50)}\n.Greens .q0-9{fill:rgb(247,252,245)}\n.Greens .q1-9{fill:rgb(229,245,224)}\n.Greens .q2-9{fill:rgb(199,233,192)}\n.Greens .q3-9{fill:rgb(161,217,155)}\n.Greens .q4-9{fill:rgb(116,196,118)}\n.Greens .q5-9{fill:rgb(65,171,93)}\n.Greens .q6-9{fill:rgb(35,139,69)}\n.Greens .q7-9{fill:rgb(0,109,44)}\n.Greens .q8-9{fill:rgb(0,68,27)}\n.Oranges .q0-3{fill:rgb(254,230,206)}\n.Oranges .q1-3{fill:rgb(253,174,107)}\n.Oranges .q2-3{fill:rgb(230,85,13)}\n.Oranges .q0-4{fill:rgb(254,237,222)}\n.Oranges .q1-4{fill:rgb(253,190,133)}\n.Oranges .q2-4{fill:rgb(253,141,60)}\n.Oranges .q3-4{fill:rgb(217,71,1)}\n.Oranges .q0-5{fill:rgb(254,237,222)}\n.Oranges .q1-5{fill:rgb(253,190,133)}\n.Oranges .q2-5{fill:rgb(253,141,60)}\n.Oranges .q3-5{fill:rgb(230,85,13)}\n.Oranges .q4-5{fill:rgb(166,54,3)}\n.Oranges .q0-6{fill:rgb(254,237,222)}\n.Oranges .q1-6{fill:rgb(253,208,162)}\n.Oranges .q2-6{fill:rgb(253,174,107)}\n.Oranges .q3-6{fill:rgb(253,141,60)}\n.Oranges .q4-6{fill:rgb(230,85,13)}\n.Oranges .q5-6{fill:rgb(166,54,3)}\n.Oranges .q0-7{fill:rgb(254,237,222)}\n.Oranges .q1-7{fill:rgb(253,208,162)}\n.Oranges .q2-7{fill:rgb(253,174,107)}\n.Oranges .q3-7{fill:rgb(253,141,60)}\n.Oranges .q4-7{fill:rgb(241,105,19)}\n.Oranges .q5-7{fill:rgb(217,72,1)}\n.Oranges .q6-7{fill:rgb(140,45,4)}\n.Oranges .q0-8{fill:rgb(255,245,235)}\n.Oranges .q1-8{fill:rgb(254,230,206)}\n.Oranges .q2-8{fill:rgb(253,208,162)}\n.Oranges .q3-8{fill:rgb(253,174,107)}\n.Oranges .q4-8{fill:rgb(253,141,60)}\n.Oranges .q5-8{fill:rgb(241,105,19)}\n.Oranges .q6-8{fill:rgb(217,72,1)}\n.Oranges .q7-8{fill:rgb(140,45,4)}\n.Oranges .q0-9{fill:rgb(255,245,235)}\n.Oranges .q1-9{fill:rgb(254,230,206)}\n.Oranges .q2-9{fill:rgb(253,208,162)}\n.Oranges .q3-9{fill:rgb(253,174,107)}\n.Oranges .q4-9{fill:rgb(253,141,60)}\n.Oranges .q5-9{fill:rgb(241,105,19)}\n.Oranges .q6-9{fill:rgb(217,72,1)}\n.Oranges .q7-9{fill:rgb(166,54,3)}\n.Oranges .q8-9{fill:rgb(127,39,4)}\n.Reds .q0-3{fill:rgb(254,224,210)}\n.Reds .q1-3{fill:rgb(252,146,114)}\n.Reds .q2-3{fill:rgb(222,45,38)}\n.Reds .q0-4{fill:rgb(254,229,217)}\n.Reds .q1-4{fill:rgb(252,174,145)}\n.Reds .q2-4{fill:rgb(251,106,74)}\n.Reds .q3-4{fill:rgb(203,24,29)}\n.Reds .q0-5{fill:rgb(254,229,217)}\n.Reds .q1-5{fill:rgb(252,174,145)}\n.Reds .q2-5{fill:rgb(251,106,74)}\n.Reds .q3-5{fill:rgb(222,45,38)}\n.Reds .q4-5{fill:rgb(165,15,21)}\n.Reds .q0-6{fill:rgb(254,229,217)}\n.Reds .q1-6{fill:rgb(252,187,161)}\n.Reds .q2-6{fill:rgb(252,146,114)}\n.Reds .q3-6{fill:rgb(251,106,74)}\n.Reds .q4-6{fill:rgb(222,45,38)}\n.Reds .q5-6{fill:rgb(165,15,21)}\n.Reds .q0-7{fill:rgb(254,229,217)}\n.Reds .q1-7{fill:rgb(252,187,161)}\n.Reds .q2-7{fill:rgb(252,146,114)}\n.Reds .q3-7{fill:rgb(251,106,74)}\n.Reds .q4-7{fill:rgb(239,59,44)}\n.Reds .q5-7{fill:rgb(203,24,29)}\n.Reds .q6-7{fill:rgb(153,0,13)}\n.Reds .q0-8{fill:rgb(255,245,240)}\n.Reds .q1-8{fill:rgb(254,224,210)}\n.Reds .q2-8{fill:rgb(252,187,161)}\n.Reds .q3-8{fill:rgb(252,146,114)}\n.Reds .q4-8{fill:rgb(251,106,74)}\n.Reds .q5-8{fill:rgb(239,59,44)}\n.Reds .q6-8{fill:rgb(203,24,29)}\n.Reds .q7-8{fill:rgb(153,0,13)}\n.Reds .q0-9{fill:rgb(255,245,240)}\n.Reds .q1-9{fill:rgb(254,224,210)}\n.Reds .q2-9{fill:rgb(252,187,161)}\n.Reds .q3-9{fill:rgb(252,146,114)}\n.Reds .q4-9{fill:rgb(251,106,74)}\n.Reds .q5-9{fill:rgb(239,59,44)}\n.Reds .q6-9{fill:rgb(203,24,29)}\n.Reds .q7-9{fill:rgb(165,15,21)}\n.Reds .q8-9{fill:rgb(103,0,13)}\n.Greys .q0-3{fill:rgb(240,240,240)}\n.Greys .q1-3{fill:rgb(189,189,189)}\n.Greys .q2-3{fill:rgb(99,99,99)}\n.Greys .q0-4{fill:rgb(247,247,247)}\n.Greys .q1-4{fill:rgb(204,204,204)}\n.Greys .q2-4{fill:rgb(150,150,150)}\n.Greys .q3-4{fill:rgb(82,82,82)}\n.Greys .q0-5{fill:rgb(247,247,247)}\n.Greys .q1-5{fill:rgb(204,204,204)}\n.Greys .q2-5{fill:rgb(150,150,150)}\n.Greys .q3-5{fill:rgb(99,99,99)}\n.Greys .q4-5{fill:rgb(37,37,37)}\n.Greys .q0-6{fill:rgb(247,247,247)}\n.Greys .q1-6{fill:rgb(217,217,217)}\n.Greys .q2-6{fill:rgb(189,189,189)}\n.Greys .q3-6{fill:rgb(150,150,150)}\n.Greys .q4-6{fill:rgb(99,99,99)}\n.Greys .q5-6{fill:rgb(37,37,37)}\n.Greys .q0-7{fill:rgb(247,247,247)}\n.Greys .q1-7{fill:rgb(217,217,217)}\n.Greys .q2-7{fill:rgb(189,189,189)}\n.Greys .q3-7{fill:rgb(150,150,150)}\n.Greys .q4-7{fill:rgb(115,115,115)}\n.Greys .q5-7{fill:rgb(82,82,82)}\n.Greys .q6-7{fill:rgb(37,37,37)}\n.Greys .q0-8{fill:rgb(255,255,255)}\n.Greys .q1-8{fill:rgb(240,240,240)}\n.Greys .q2-8{fill:rgb(217,217,217)}\n.Greys .q3-8{fill:rgb(189,189,189)}\n.Greys .q4-8{fill:rgb(150,150,150)}\n.Greys .q5-8{fill:rgb(115,115,115)}\n.Greys .q6-8{fill:rgb(82,82,82)}\n.Greys .q7-8{fill:rgb(37,37,37)}\n.Greys .q0-9{fill:rgb(255,255,255)}\n.Greys .q1-9{fill:rgb(240,240,240)}\n.Greys .q2-9{fill:rgb(217,217,217)}\n.Greys .q3-9{fill:rgb(189,189,189)}\n.Greys .q4-9{fill:rgb(150,150,150)}\n.Greys .q5-9{fill:rgb(115,115,115)}\n.Greys .q6-9{fill:rgb(82,82,82)}\n.Greys .q7-9{fill:rgb(37,37,37)}\n.Greys .q8-9{fill:rgb(0,0,0)}\n.PuOr .q0-3{fill:rgb(241,163,64)}\n.PuOr .q1-3{fill:rgb(247,247,247)}\n.PuOr .q2-3{fill:rgb(153,142,195)}\n.PuOr .q0-4{fill:rgb(230,97,1)}\n.PuOr .q1-4{fill:rgb(253,184,99)}\n.PuOr .q2-4{fill:rgb(178,171,210)}\n.PuOr .q3-4{fill:rgb(94,60,153)}\n.PuOr .q0-5{fill:rgb(230,97,1)}\n.PuOr .q1-5{fill:rgb(253,184,99)}\n.PuOr .q2-5{fill:rgb(247,247,247)}\n.PuOr .q3-5{fill:rgb(178,171,210)}\n.PuOr .q4-5{fill:rgb(94,60,153)}\n.PuOr .q0-6{fill:rgb(179,88,6)}\n.PuOr .q1-6{fill:rgb(241,163,64)}\n.PuOr .q2-6{fill:rgb(254,224,182)}\n.PuOr .q3-6{fill:rgb(216,218,235)}\n.PuOr .q4-6{fill:rgb(153,142,195)}\n.PuOr .q5-6{fill:rgb(84,39,136)}\n.PuOr .q0-7{fill:rgb(179,88,6)}\n.PuOr .q1-7{fill:rgb(241,163,64)}\n.PuOr .q2-7{fill:rgb(254,224,182)}\n.PuOr .q3-7{fill:rgb(247,247,247)}\n.PuOr .q4-7{fill:rgb(216,218,235)}\n.PuOr .q5-7{fill:rgb(153,142,195)}\n.PuOr .q6-7{fill:rgb(84,39,136)}\n.PuOr .q0-8{fill:rgb(179,88,6)}\n.PuOr .q1-8{fill:rgb(224,130,20)}\n.PuOr .q2-8{fill:rgb(253,184,99)}\n.PuOr .q3-8{fill:rgb(254,224,182)}\n.PuOr .q4-8{fill:rgb(216,218,235)}\n.PuOr .q5-8{fill:rgb(178,171,210)}\n.PuOr .q6-8{fill:rgb(128,115,172)}\n.PuOr .q7-8{fill:rgb(84,39,136)}\n.PuOr .q0-9{fill:rgb(179,88,6)}\n.PuOr .q1-9{fill:rgb(224,130,20)}\n.PuOr .q2-9{fill:rgb(253,184,99)}\n.PuOr .q3-9{fill:rgb(254,224,182)}\n.PuOr .q4-9{fill:rgb(247,247,247)}\n.PuOr .q5-9{fill:rgb(216,218,235)}\n.PuOr .q6-9{fill:rgb(178,171,210)}\n.PuOr .q7-9{fill:rgb(128,115,172)}\n.PuOr .q8-9{fill:rgb(84,39,136)}\n.PuOr .q0-10{fill:rgb(127,59,8)}\n.PuOr .q1-10{fill:rgb(179,88,6)}\n.PuOr .q2-10{fill:rgb(224,130,20)}\n.PuOr .q3-10{fill:rgb(253,184,99)}\n.PuOr .q4-10{fill:rgb(254,224,182)}\n.PuOr .q5-10{fill:rgb(216,218,235)}\n.PuOr .q6-10{fill:rgb(178,171,210)}\n.PuOr .q7-10{fill:rgb(128,115,172)}\n.PuOr .q8-10{fill:rgb(84,39,136)}\n.PuOr .q9-10{fill:rgb(45,0,75)}\n.PuOr .q0-11{fill:rgb(127,59,8)}\n.PuOr .q1-11{fill:rgb(179,88,6)}\n.PuOr .q2-11{fill:rgb(224,130,20)}\n.PuOr .q3-11{fill:rgb(253,184,99)}\n.PuOr .q4-11{fill:rgb(254,224,182)}\n.PuOr .q5-11{fill:rgb(247,247,247)}\n.PuOr .q6-11{fill:rgb(216,218,235)}\n.PuOr .q7-11{fill:rgb(178,171,210)}\n.PuOr .q8-11{fill:rgb(128,115,172)}\n.PuOr .q9-11{fill:rgb(84,39,136)}\n.PuOr .q10-11{fill:rgb(45,0,75)}\n.BrBG .q0-3{fill:rgb(216,179,101)}\n.BrBG .q1-3{fill:rgb(245,245,245)}\n.BrBG .q2-3{fill:rgb(90,180,172)}\n.BrBG .q0-4{fill:rgb(166,97,26)}\n.BrBG .q1-4{fill:rgb(223,194,125)}\n.BrBG .q2-4{fill:rgb(128,205,193)}\n.BrBG .q3-4{fill:rgb(1,133,113)}\n.BrBG .q0-5{fill:rgb(166,97,26)}\n.BrBG .q1-5{fill:rgb(223,194,125)}\n.BrBG .q2-5{fill:rgb(245,245,245)}\n.BrBG .q3-5{fill:rgb(128,205,193)}\n.BrBG .q4-5{fill:rgb(1,133,113)}\n.BrBG .q0-6{fill:rgb(140,81,10)}\n.BrBG .q1-6{fill:rgb(216,179,101)}\n.BrBG .q2-6{fill:rgb(246,232,195)}\n.BrBG .q3-6{fill:rgb(199,234,229)}\n.BrBG .q4-6{fill:rgb(90,180,172)}\n.BrBG .q5-6{fill:rgb(1,102,94)}\n.BrBG .q0-7{fill:rgb(140,81,10)}\n.BrBG .q1-7{fill:rgb(216,179,101)}\n.BrBG .q2-7{fill:rgb(246,232,195)}\n.BrBG .q3-7{fill:rgb(245,245,245)}\n.BrBG .q4-7{fill:rgb(199,234,229)}\n.BrBG .q5-7{fill:rgb(90,180,172)}\n.BrBG .q6-7{fill:rgb(1,102,94)}\n.BrBG .q0-8{fill:rgb(140,81,10)}\n.BrBG .q1-8{fill:rgb(191,129,45)}\n.BrBG .q2-8{fill:rgb(223,194,125)}\n.BrBG .q3-8{fill:rgb(246,232,195)}\n.BrBG .q4-8{fill:rgb(199,234,229)}\n.BrBG .q5-8{fill:rgb(128,205,193)}\n.BrBG .q6-8{fill:rgb(53,151,143)}\n.BrBG .q7-8{fill:rgb(1,102,94)}\n.BrBG .q0-9{fill:rgb(140,81,10)}\n.BrBG .q1-9{fill:rgb(191,129,45)}\n.BrBG .q2-9{fill:rgb(223,194,125)}\n.BrBG .q3-9{fill:rgb(246,232,195)}\n.BrBG .q4-9{fill:rgb(245,245,245)}\n.BrBG .q5-9{fill:rgb(199,234,229)}\n.BrBG .q6-9{fill:rgb(128,205,193)}\n.BrBG .q7-9{fill:rgb(53,151,143)}\n.BrBG .q8-9{fill:rgb(1,102,94)}\n.BrBG .q0-10{fill:rgb(84,48,5)}\n.BrBG .q1-10{fill:rgb(140,81,10)}\n.BrBG .q2-10{fill:rgb(191,129,45)}\n.BrBG .q3-10{fill:rgb(223,194,125)}\n.BrBG .q4-10{fill:rgb(246,232,195)}\n.BrBG .q5-10{fill:rgb(199,234,229)}\n.BrBG .q6-10{fill:rgb(128,205,193)}\n.BrBG .q7-10{fill:rgb(53,151,143)}\n.BrBG .q8-10{fill:rgb(1,102,94)}\n.BrBG .q9-10{fill:rgb(0,60,48)}\n.BrBG .q0-11{fill:rgb(84,48,5)}\n.BrBG .q1-11{fill:rgb(140,81,10)}\n.BrBG .q2-11{fill:rgb(191,129,45)}\n.BrBG .q3-11{fill:rgb(223,194,125)}\n.BrBG .q4-11{fill:rgb(246,232,195)}\n.BrBG .q5-11{fill:rgb(245,245,245)}\n.BrBG .q6-11{fill:rgb(199,234,229)}\n.BrBG .q7-11{fill:rgb(128,205,193)}\n.BrBG .q8-11{fill:rgb(53,151,143)}\n.BrBG .q9-11{fill:rgb(1,102,94)}\n.BrBG .q10-11{fill:rgb(0,60,48)}\n.PRGn .q0-3{fill:rgb(175,141,195)}\n.PRGn .q1-3{fill:rgb(247,247,247)}\n.PRGn .q2-3{fill:rgb(127,191,123)}\n.PRGn .q0-4{fill:rgb(123,50,148)}\n.PRGn .q1-4{fill:rgb(194,165,207)}\n.PRGn .q2-4{fill:rgb(166,219,160)}\n.PRGn .q3-4{fill:rgb(0,136,55)}\n.PRGn .q0-5{fill:rgb(123,50,148)}\n.PRGn .q1-5{fill:rgb(194,165,207)}\n.PRGn .q2-5{fill:rgb(247,247,247)}\n.PRGn .q3-5{fill:rgb(166,219,160)}\n.PRGn .q4-5{fill:rgb(0,136,55)}\n.PRGn .q0-6{fill:rgb(118,42,131)}\n.PRGn .q1-6{fill:rgb(175,141,195)}\n.PRGn .q2-6{fill:rgb(231,212,232)}\n.PRGn .q3-6{fill:rgb(217,240,211)}\n.PRGn .q4-6{fill:rgb(127,191,123)}\n.PRGn .q5-6{fill:rgb(27,120,55)}\n.PRGn .q0-7{fill:rgb(118,42,131)}\n.PRGn .q1-7{fill:rgb(175,141,195)}\n.PRGn .q2-7{fill:rgb(231,212,232)}\n.PRGn .q3-7{fill:rgb(247,247,247)}\n.PRGn .q4-7{fill:rgb(217,240,211)}\n.PRGn .q5-7{fill:rgb(127,191,123)}\n.PRGn .q6-7{fill:rgb(27,120,55)}\n.PRGn .q0-8{fill:rgb(118,42,131)}\n.PRGn .q1-8{fill:rgb(153,112,171)}\n.PRGn .q2-8{fill:rgb(194,165,207)}\n.PRGn .q3-8{fill:rgb(231,212,232)}\n.PRGn .q4-8{fill:rgb(217,240,211)}\n.PRGn .q5-8{fill:rgb(166,219,160)}\n.PRGn .q6-8{fill:rgb(90,174,97)}\n.PRGn .q7-8{fill:rgb(27,120,55)}\n.PRGn .q0-9{fill:rgb(118,42,131)}\n.PRGn .q1-9{fill:rgb(153,112,171)}\n.PRGn .q2-9{fill:rgb(194,165,207)}\n.PRGn .q3-9{fill:rgb(231,212,232)}\n.PRGn .q4-9{fill:rgb(247,247,247)}\n.PRGn .q5-9{fill:rgb(217,240,211)}\n.PRGn .q6-9{fill:rgb(166,219,160)}\n.PRGn .q7-9{fill:rgb(90,174,97)}\n.PRGn .q8-9{fill:rgb(27,120,55)}\n.PRGn .q0-10{fill:rgb(64,0,75)}\n.PRGn .q1-10{fill:rgb(118,42,131)}\n.PRGn .q2-10{fill:rgb(153,112,171)}\n.PRGn .q3-10{fill:rgb(194,165,207)}\n.PRGn .q4-10{fill:rgb(231,212,232)}\n.PRGn .q5-10{fill:rgb(217,240,211)}\n.PRGn .q6-10{fill:rgb(166,219,160)}\n.PRGn .q7-10{fill:rgb(90,174,97)}\n.PRGn .q8-10{fill:rgb(27,120,55)}\n.PRGn .q9-10{fill:rgb(0,68,27)}\n.PRGn .q0-11{fill:rgb(64,0,75)}\n.PRGn .q1-11{fill:rgb(118,42,131)}\n.PRGn .q2-11{fill:rgb(153,112,171)}\n.PRGn .q3-11{fill:rgb(194,165,207)}\n.PRGn .q4-11{fill:rgb(231,212,232)}\n.PRGn .q5-11{fill:rgb(247,247,247)}\n.PRGn .q6-11{fill:rgb(217,240,211)}\n.PRGn .q7-11{fill:rgb(166,219,160)}\n.PRGn .q8-11{fill:rgb(90,174,97)}\n.PRGn .q9-11{fill:rgb(27,120,55)}\n.PRGn .q10-11{fill:rgb(0,68,27)}\n.PiYG .q0-3{fill:rgb(233,163,201)}\n.PiYG .q1-3{fill:rgb(247,247,247)}\n.PiYG .q2-3{fill:rgb(161,215,106)}\n.PiYG .q0-4{fill:rgb(208,28,139)}\n.PiYG .q1-4{fill:rgb(241,182,218)}\n.PiYG .q2-4{fill:rgb(184,225,134)}\n.PiYG .q3-4{fill:rgb(77,172,38)}\n.PiYG .q0-5{fill:rgb(208,28,139)}\n.PiYG .q1-5{fill:rgb(241,182,218)}\n.PiYG .q2-5{fill:rgb(247,247,247)}\n.PiYG .q3-5{fill:rgb(184,225,134)}\n.PiYG .q4-5{fill:rgb(77,172,38)}\n.PiYG .q0-6{fill:rgb(197,27,125)}\n.PiYG .q1-6{fill:rgb(233,163,201)}\n.PiYG .q2-6{fill:rgb(253,224,239)}\n.PiYG .q3-6{fill:rgb(230,245,208)}\n.PiYG .q4-6{fill:rgb(161,215,106)}\n.PiYG .q5-6{fill:rgb(77,146,33)}\n.PiYG .q0-7{fill:rgb(197,27,125)}\n.PiYG .q1-7{fill:rgb(233,163,201)}\n.PiYG .q2-7{fill:rgb(253,224,239)}\n.PiYG .q3-7{fill:rgb(247,247,247)}\n.PiYG .q4-7{fill:rgb(230,245,208)}\n.PiYG .q5-7{fill:rgb(161,215,106)}\n.PiYG .q6-7{fill:rgb(77,146,33)}\n.PiYG .q0-8{fill:rgb(197,27,125)}\n.PiYG .q1-8{fill:rgb(222,119,174)}\n.PiYG .q2-8{fill:rgb(241,182,218)}\n.PiYG .q3-8{fill:rgb(253,224,239)}\n.PiYG .q4-8{fill:rgb(230,245,208)}\n.PiYG .q5-8{fill:rgb(184,225,134)}\n.PiYG .q6-8{fill:rgb(127,188,65)}\n.PiYG .q7-8{fill:rgb(77,146,33)}\n.PiYG .q0-9{fill:rgb(197,27,125)}\n.PiYG .q1-9{fill:rgb(222,119,174)}\n.PiYG .q2-9{fill:rgb(241,182,218)}\n.PiYG .q3-9{fill:rgb(253,224,239)}\n.PiYG .q4-9{fill:rgb(247,247,247)}\n.PiYG .q5-9{fill:rgb(230,245,208)}\n.PiYG .q6-9{fill:rgb(184,225,134)}\n.PiYG .q7-9{fill:rgb(127,188,65)}\n.PiYG .q8-9{fill:rgb(77,146,33)}\n.PiYG .q0-10{fill:rgb(142,1,82)}\n.PiYG .q1-10{fill:rgb(197,27,125)}\n.PiYG .q2-10{fill:rgb(222,119,174)}\n.PiYG .q3-10{fill:rgb(241,182,218)}\n.PiYG .q4-10{fill:rgb(253,224,239)}\n.PiYG .q5-10{fill:rgb(230,245,208)}\n.PiYG .q6-10{fill:rgb(184,225,134)}\n.PiYG .q7-10{fill:rgb(127,188,65)}\n.PiYG .q8-10{fill:rgb(77,146,33)}\n.PiYG .q9-10{fill:rgb(39,100,25)}\n.PiYG .q0-11{fill:rgb(142,1,82)}\n.PiYG .q1-11{fill:rgb(197,27,125)}\n.PiYG .q2-11{fill:rgb(222,119,174)}\n.PiYG .q3-11{fill:rgb(241,182,218)}\n.PiYG .q4-11{fill:rgb(253,224,239)}\n.PiYG .q5-11{fill:rgb(247,247,247)}\n.PiYG .q6-11{fill:rgb(230,245,208)}\n.PiYG .q7-11{fill:rgb(184,225,134)}\n.PiYG .q8-11{fill:rgb(127,188,65)}\n.PiYG .q9-11{fill:rgb(77,146,33)}\n.PiYG .q10-11{fill:rgb(39,100,25)}\n.RdBu .q0-3{fill:rgb(239,138,98)}\n.RdBu .q1-3{fill:rgb(247,247,247)}\n.RdBu .q2-3{fill:rgb(103,169,207)}\n.RdBu .q0-4{fill:rgb(202,0,32)}\n.RdBu .q1-4{fill:rgb(244,165,130)}\n.RdBu .q2-4{fill:rgb(146,197,222)}\n.RdBu .q3-4{fill:rgb(5,113,176)}\n.RdBu .q0-5{fill:rgb(202,0,32)}\n.RdBu .q1-5{fill:rgb(244,165,130)}\n.RdBu .q2-5{fill:rgb(247,247,247)}\n.RdBu .q3-5{fill:rgb(146,197,222)}\n.RdBu .q4-5{fill:rgb(5,113,176)}\n.RdBu .q0-6{fill:rgb(178,24,43)}\n.RdBu .q1-6{fill:rgb(239,138,98)}\n.RdBu .q2-6{fill:rgb(253,219,199)}\n.RdBu .q3-6{fill:rgb(209,229,240)}\n.RdBu .q4-6{fill:rgb(103,169,207)}\n.RdBu .q5-6{fill:rgb(33,102,172)}\n.RdBu .q0-7{fill:rgb(178,24,43)}\n.RdBu .q1-7{fill:rgb(239,138,98)}\n.RdBu .q2-7{fill:rgb(253,219,199)}\n.RdBu .q3-7{fill:rgb(247,247,247)}\n.RdBu .q4-7{fill:rgb(209,229,240)}\n.RdBu .q5-7{fill:rgb(103,169,207)}\n.RdBu .q6-7{fill:rgb(33,102,172)}\n.RdBu .q0-8{fill:rgb(178,24,43)}\n.RdBu .q1-8{fill:rgb(214,96,77)}\n.RdBu .q2-8{fill:rgb(244,165,130)}\n.RdBu .q3-8{fill:rgb(253,219,199)}\n.RdBu .q4-8{fill:rgb(209,229,240)}\n.RdBu .q5-8{fill:rgb(146,197,222)}\n.RdBu .q6-8{fill:rgb(67,147,195)}\n.RdBu .q7-8{fill:rgb(33,102,172)}\n.RdBu .q0-9{fill:rgb(178,24,43)}\n.RdBu .q1-9{fill:rgb(214,96,77)}\n.RdBu .q2-9{fill:rgb(244,165,130)}\n.RdBu .q3-9{fill:rgb(253,219,199)}\n.RdBu .q4-9{fill:rgb(247,247,247)}\n.RdBu .q5-9{fill:rgb(209,229,240)}\n.RdBu .q6-9{fill:rgb(146,197,222)}\n.RdBu .q7-9{fill:rgb(67,147,195)}\n.RdBu .q8-9{fill:rgb(33,102,172)}\n.RdBu .q0-10{fill:rgb(103,0,31)}\n.RdBu .q1-10{fill:rgb(178,24,43)}\n.RdBu .q2-10{fill:rgb(214,96,77)}\n.RdBu .q3-10{fill:rgb(244,165,130)}\n.RdBu .q4-10{fill:rgb(253,219,199)}\n.RdBu .q5-10{fill:rgb(209,229,240)}\n.RdBu .q6-10{fill:rgb(146,197,222)}\n.RdBu .q7-10{fill:rgb(67,147,195)}\n.RdBu .q8-10{fill:rgb(33,102,172)}\n.RdBu .q9-10{fill:rgb(5,48,97)}\n.RdBu .q0-11{fill:rgb(103,0,31)}\n.RdBu .q1-11{fill:rgb(178,24,43)}\n.RdBu .q2-11{fill:rgb(214,96,77)}\n.RdBu .q3-11{fill:rgb(244,165,130)}\n.RdBu .q4-11{fill:rgb(253,219,199)}\n.RdBu .q5-11{fill:rgb(247,247,247)}\n.RdBu .q6-11{fill:rgb(209,229,240)}\n.RdBu .q7-11{fill:rgb(146,197,222)}\n.RdBu .q8-11{fill:rgb(67,147,195)}\n.RdBu .q9-11{fill:rgb(33,102,172)}\n.RdBu .q10-11{fill:rgb(5,48,97)}\n.RdGy .q0-3{fill:rgb(239,138,98)}\n.RdGy .q1-3{fill:rgb(255,255,255)}\n.RdGy .q2-3{fill:rgb(153,153,153)}\n.RdGy .q0-4{fill:rgb(202,0,32)}\n.RdGy .q1-4{fill:rgb(244,165,130)}\n.RdGy .q2-4{fill:rgb(186,186,186)}\n.RdGy .q3-4{fill:rgb(64,64,64)}\n.RdGy .q0-5{fill:rgb(202,0,32)}\n.RdGy .q1-5{fill:rgb(244,165,130)}\n.RdGy .q2-5{fill:rgb(255,255,255)}\n.RdGy .q3-5{fill:rgb(186,186,186)}\n.RdGy .q4-5{fill:rgb(64,64,64)}\n.RdGy .q0-6{fill:rgb(178,24,43)}\n.RdGy .q1-6{fill:rgb(239,138,98)}\n.RdGy .q2-6{fill:rgb(253,219,199)}\n.RdGy .q3-6{fill:rgb(224,224,224)}\n.RdGy .q4-6{fill:rgb(153,153,153)}\n.RdGy .q5-6{fill:rgb(77,77,77)}\n.RdGy .q0-7{fill:rgb(178,24,43)}\n.RdGy .q1-7{fill:rgb(239,138,98)}\n.RdGy .q2-7{fill:rgb(253,219,199)}\n.RdGy .q3-7{fill:rgb(255,255,255)}\n.RdGy .q4-7{fill:rgb(224,224,224)}\n.RdGy .q5-7{fill:rgb(153,153,153)}\n.RdGy .q6-7{fill:rgb(77,77,77)}\n.RdGy .q0-8{fill:rgb(178,24,43)}\n.RdGy .q1-8{fill:rgb(214,96,77)}\n.RdGy .q2-8{fill:rgb(244,165,130)}\n.RdGy .q3-8{fill:rgb(253,219,199)}\n.RdGy .q4-8{fill:rgb(224,224,224)}\n.RdGy .q5-8{fill:rgb(186,186,186)}\n.RdGy .q6-8{fill:rgb(135,135,135)}\n.RdGy .q7-8{fill:rgb(77,77,77)}\n.RdGy .q0-9{fill:rgb(178,24,43)}\n.RdGy .q1-9{fill:rgb(214,96,77)}\n.RdGy .q2-9{fill:rgb(244,165,130)}\n.RdGy .q3-9{fill:rgb(253,219,199)}\n.RdGy .q4-9{fill:rgb(255,255,255)}\n.RdGy .q5-9{fill:rgb(224,224,224)}\n.RdGy .q6-9{fill:rgb(186,186,186)}\n.RdGy .q7-9{fill:rgb(135,135,135)}\n.RdGy .q8-9{fill:rgb(77,77,77)}\n.RdGy .q0-10{fill:rgb(103,0,31)}\n.RdGy .q1-10{fill:rgb(178,24,43)}\n.RdGy .q2-10{fill:rgb(214,96,77)}\n.RdGy .q3-10{fill:rgb(244,165,130)}\n.RdGy .q4-10{fill:rgb(253,219,199)}\n.RdGy .q5-10{fill:rgb(224,224,224)}\n.RdGy .q6-10{fill:rgb(186,186,186)}\n.RdGy .q7-10{fill:rgb(135,135,135)}\n.RdGy .q8-10{fill:rgb(77,77,77)}\n.RdGy .q9-10{fill:rgb(26,26,26)}\n.RdGy .q0-11{fill:rgb(103,0,31)}\n.RdGy .q1-11{fill:rgb(178,24,43)}\n.RdGy .q2-11{fill:rgb(214,96,77)}\n.RdGy .q3-11{fill:rgb(244,165,130)}\n.RdGy .q4-11{fill:rgb(253,219,199)}\n.RdGy .q5-11{fill:rgb(255,255,255)}\n.RdGy .q6-11{fill:rgb(224,224,224)}\n.RdGy .q7-11{fill:rgb(186,186,186)}\n.RdGy .q8-11{fill:rgb(135,135,135)}\n.RdGy .q9-11{fill:rgb(77,77,77)}\n.RdGy .q10-11{fill:rgb(26,26,26)}\n.RdYlBu .q0-3{fill:rgb(252,141,89)}\n.RdYlBu .q1-3{fill:rgb(255,255,191)}\n.RdYlBu .q2-3{fill:rgb(145,191,219)}\n.RdYlBu .q0-4{fill:rgb(215,25,28)}\n.RdYlBu .q1-4{fill:rgb(253,174,97)}\n.RdYlBu .q2-4{fill:rgb(171,217,233)}\n.RdYlBu .q3-4{fill:rgb(44,123,182)}\n.RdYlBu .q0-5{fill:rgb(215,25,28)}\n.RdYlBu .q1-5{fill:rgb(253,174,97)}\n.RdYlBu .q2-5{fill:rgb(255,255,191)}\n.RdYlBu .q3-5{fill:rgb(171,217,233)}\n.RdYlBu .q4-5{fill:rgb(44,123,182)}\n.RdYlBu .q0-6{fill:rgb(215,48,39)}\n.RdYlBu .q1-6{fill:rgb(252,141,89)}\n.RdYlBu .q2-6{fill:rgb(254,224,144)}\n.RdYlBu .q3-6{fill:rgb(224,243,248)}\n.RdYlBu .q4-6{fill:rgb(145,191,219)}\n.RdYlBu .q5-6{fill:rgb(69,117,180)}\n.RdYlBu .q0-7{fill:rgb(215,48,39)}\n.RdYlBu .q1-7{fill:rgb(252,141,89)}\n.RdYlBu .q2-7{fill:rgb(254,224,144)}\n.RdYlBu .q3-7{fill:rgb(255,255,191)}\n.RdYlBu .q4-7{fill:rgb(224,243,248)}\n.RdYlBu .q5-7{fill:rgb(145,191,219)}\n.RdYlBu .q6-7{fill:rgb(69,117,180)}\n.RdYlBu .q0-8{fill:rgb(215,48,39)}\n.RdYlBu .q1-8{fill:rgb(244,109,67)}\n.RdYlBu .q2-8{fill:rgb(253,174,97)}\n.RdYlBu .q3-8{fill:rgb(254,224,144)}\n.RdYlBu .q4-8{fill:rgb(224,243,248)}\n.RdYlBu .q5-8{fill:rgb(171,217,233)}\n.RdYlBu .q6-8{fill:rgb(116,173,209)}\n.RdYlBu .q7-8{fill:rgb(69,117,180)}\n.RdYlBu .q0-9{fill:rgb(215,48,39)}\n.RdYlBu .q1-9{fill:rgb(244,109,67)}\n.RdYlBu .q2-9{fill:rgb(253,174,97)}\n.RdYlBu .q3-9{fill:rgb(254,224,144)}\n.RdYlBu .q4-9{fill:rgb(255,255,191)}\n.RdYlBu .q5-9{fill:rgb(224,243,248)}\n.RdYlBu .q6-9{fill:rgb(171,217,233)}\n.RdYlBu .q7-9{fill:rgb(116,173,209)}\n.RdYlBu .q8-9{fill:rgb(69,117,180)}\n.RdYlBu .q0-10{fill:rgb(165,0,38)}\n.RdYlBu .q1-10{fill:rgb(215,48,39)}\n.RdYlBu .q2-10{fill:rgb(244,109,67)}\n.RdYlBu .q3-10{fill:rgb(253,174,97)}\n.RdYlBu .q4-10{fill:rgb(254,224,144)}\n.RdYlBu .q5-10{fill:rgb(224,243,248)}\n.RdYlBu .q6-10{fill:rgb(171,217,233)}\n.RdYlBu .q7-10{fill:rgb(116,173,209)}\n.RdYlBu .q8-10{fill:rgb(69,117,180)}\n.RdYlBu .q9-10{fill:rgb(49,54,149)}\n.RdYlBu .q0-11{fill:rgb(165,0,38)}\n.RdYlBu .q1-11{fill:rgb(215,48,39)}\n.RdYlBu .q2-11{fill:rgb(244,109,67)}\n.RdYlBu .q3-11{fill:rgb(253,174,97)}\n.RdYlBu .q4-11{fill:rgb(254,224,144)}\n.RdYlBu .q5-11{fill:rgb(255,255,191)}\n.RdYlBu .q6-11{fill:rgb(224,243,248)}\n.RdYlBu .q7-11{fill:rgb(171,217,233)}\n.RdYlBu .q8-11{fill:rgb(116,173,209)}\n.RdYlBu .q9-11{fill:rgb(69,117,180)}\n.RdYlBu .q10-11{fill:rgb(49,54,149)}\n.Spectral .q0-3{fill:rgb(252,141,89)}\n.Spectral .q1-3{fill:rgb(255,255,191)}\n.Spectral .q2-3{fill:rgb(153,213,148)}\n.Spectral .q0-4{fill:rgb(215,25,28)}\n.Spectral .q1-4{fill:rgb(253,174,97)}\n.Spectral .q2-4{fill:rgb(171,221,164)}\n.Spectral .q3-4{fill:rgb(43,131,186)}\n.Spectral .q0-5{fill:rgb(215,25,28)}\n.Spectral .q1-5{fill:rgb(253,174,97)}\n.Spectral .q2-5{fill:rgb(255,255,191)}\n.Spectral .q3-5{fill:rgb(171,221,164)}\n.Spectral .q4-5{fill:rgb(43,131,186)}\n.Spectral .q0-6{fill:rgb(213,62,79)}\n.Spectral .q1-6{fill:rgb(252,141,89)}\n.Spectral .q2-6{fill:rgb(254,224,139)}\n.Spectral .q3-6{fill:rgb(230,245,152)}\n.Spectral .q4-6{fill:rgb(153,213,148)}\n.Spectral .q5-6{fill:rgb(50,136,189)}\n.Spectral .q0-7{fill:rgb(213,62,79)}\n.Spectral .q1-7{fill:rgb(252,141,89)}\n.Spectral .q2-7{fill:rgb(254,224,139)}\n.Spectral .q3-7{fill:rgb(255,255,191)}\n.Spectral .q4-7{fill:rgb(230,245,152)}\n.Spectral .q5-7{fill:rgb(153,213,148)}\n.Spectral .q6-7{fill:rgb(50,136,189)}\n.Spectral .q0-8{fill:rgb(213,62,79)}\n.Spectral .q1-8{fill:rgb(244,109,67)}\n.Spectral .q2-8{fill:rgb(253,174,97)}\n.Spectral .q3-8{fill:rgb(254,224,139)}\n.Spectral .q4-8{fill:rgb(230,245,152)}\n.Spectral .q5-8{fill:rgb(171,221,164)}\n.Spectral .q6-8{fill:rgb(102,194,165)}\n.Spectral .q7-8{fill:rgb(50,136,189)}\n.Spectral .q0-9{fill:rgb(213,62,79)}\n.Spectral .q1-9{fill:rgb(244,109,67)}\n.Spectral .q2-9{fill:rgb(253,174,97)}\n.Spectral .q3-9{fill:rgb(254,224,139)}\n.Spectral .q4-9{fill:rgb(255,255,191)}\n.Spectral .q5-9{fill:rgb(230,245,152)}\n.Spectral .q6-9{fill:rgb(171,221,164)}\n.Spectral .q7-9{fill:rgb(102,194,165)}\n.Spectral .q8-9{fill:rgb(50,136,189)}\n.Spectral .q0-10{fill:rgb(158,1,66)}\n.Spectral .q1-10{fill:rgb(213,62,79)}\n.Spectral .q2-10{fill:rgb(244,109,67)}\n.Spectral .q3-10{fill:rgb(253,174,97)}\n.Spectral .q4-10{fill:rgb(254,224,139)}\n.Spectral .q5-10{fill:rgb(230,245,152)}\n.Spectral .q6-10{fill:rgb(171,221,164)}\n.Spectral .q7-10{fill:rgb(102,194,165)}\n.Spectral .q8-10{fill:rgb(50,136,189)}\n.Spectral .q9-10{fill:rgb(94,79,162)}\n.Spectral .q0-11{fill:rgb(158,1,66)}\n.Spectral .q1-11{fill:rgb(213,62,79)}\n.Spectral .q2-11{fill:rgb(244,109,67)}\n.Spectral .q3-11{fill:rgb(253,174,97)}\n.Spectral .q4-11{fill:rgb(254,224,139)}\n.Spectral .q5-11{fill:rgb(255,255,191)}\n.Spectral .q6-11{fill:rgb(230,245,152)}\n.Spectral .q7-11{fill:rgb(171,221,164)}\n.Spectral .q8-11{fill:rgb(102,194,165)}\n.Spectral .q9-11{fill:rgb(50,136,189)}\n.Spectral .q10-11{fill:rgb(94,79,162)}\n.RdYlGn .q0-3{fill:rgb(252,141,89)}\n.RdYlGn .q1-3{fill:rgb(255,255,191)}\n.RdYlGn .q2-3{fill:rgb(145,207,96)}\n.RdYlGn .q0-4{fill:rgb(215,25,28)}\n.RdYlGn .q1-4{fill:rgb(253,174,97)}\n.RdYlGn .q2-4{fill:rgb(166,217,106)}\n.RdYlGn .q3-4{fill:rgb(26,150,65)}\n.RdYlGn .q0-5{fill:rgb(215,25,28)}\n.RdYlGn .q1-5{fill:rgb(253,174,97)}\n.RdYlGn .q2-5{fill:rgb(255,255,191)}\n.RdYlGn .q3-5{fill:rgb(166,217,106)}\n.RdYlGn .q4-5{fill:rgb(26,150,65)}\n.RdYlGn .q0-6{fill:rgb(215,48,39)}\n.RdYlGn .q1-6{fill:rgb(252,141,89)}\n.RdYlGn .q2-6{fill:rgb(254,224,139)}\n.RdYlGn .q3-6{fill:rgb(217,239,139)}\n.RdYlGn .q4-6{fill:rgb(145,207,96)}\n.RdYlGn .q5-6{fill:rgb(26,152,80)}\n.RdYlGn .q0-7{fill:rgb(215,48,39)}\n.RdYlGn .q1-7{fill:rgb(252,141,89)}\n.RdYlGn .q2-7{fill:rgb(254,224,139)}\n.RdYlGn .q3-7{fill:rgb(255,255,191)}\n.RdYlGn .q4-7{fill:rgb(217,239,139)}\n.RdYlGn .q5-7{fill:rgb(145,207,96)}\n.RdYlGn .q6-7{fill:rgb(26,152,80)}\n.RdYlGn .q0-8{fill:rgb(215,48,39)}\n.RdYlGn .q1-8{fill:rgb(244,109,67)}\n.RdYlGn .q2-8{fill:rgb(253,174,97)}\n.RdYlGn .q3-8{fill:rgb(254,224,139)}\n.RdYlGn .q4-8{fill:rgb(217,239,139)}\n.RdYlGn .q5-8{fill:rgb(166,217,106)}\n.RdYlGn .q6-8{fill:rgb(102,189,99)}\n.RdYlGn .q7-8{fill:rgb(26,152,80)}\n.RdYlGn .q0-9{fill:rgb(215,48,39)}\n.RdYlGn .q1-9{fill:rgb(244,109,67)}\n.RdYlGn .q2-9{fill:rgb(253,174,97)}\n.RdYlGn .q3-9{fill:rgb(254,224,139)}\n.RdYlGn .q4-9{fill:rgb(255,255,191)}\n.RdYlGn .q5-9{fill:rgb(217,239,139)}\n.RdYlGn .q6-9{fill:rgb(166,217,106)}\n.RdYlGn .q7-9{fill:rgb(102,189,99)}\n.RdYlGn .q8-9{fill:rgb(26,152,80)}\n.RdYlGn .q0-10{fill:rgb(165,0,38)}\n.RdYlGn .q1-10{fill:rgb(215,48,39)}\n.RdYlGn .q2-10{fill:rgb(244,109,67)}\n.RdYlGn .q3-10{fill:rgb(253,174,97)}\n.RdYlGn .q4-10{fill:rgb(254,224,139)}\n.RdYlGn .q5-10{fill:rgb(217,239,139)}\n.RdYlGn .q6-10{fill:rgb(166,217,106)}\n.RdYlGn .q7-10{fill:rgb(102,189,99)}\n.RdYlGn .q8-10{fill:rgb(26,152,80)}\n.RdYlGn .q9-10{fill:rgb(0,104,55)}\n.RdYlGn .q0-11{fill:rgb(165,0,38)}\n.RdYlGn .q1-11{fill:rgb(215,48,39)}\n.RdYlGn .q2-11{fill:rgb(244,109,67)}\n.RdYlGn .q3-11{fill:rgb(253,174,97)}\n.RdYlGn .q4-11{fill:rgb(254,224,139)}\n.RdYlGn .q5-11{fill:rgb(255,255,191)}\n.RdYlGn .q6-11{fill:rgb(217,239,139)}\n.RdYlGn .q7-11{fill:rgb(166,217,106)}\n.RdYlGn .q8-11{fill:rgb(102,189,99)}\n.RdYlGn .q9-11{fill:rgb(26,152,80)}\n.RdYlGn .q10-11{fill:rgb(0,104,55)}\n.Accent .q0-3{fill:rgb(127,201,127)}\n.Accent .q1-3{fill:rgb(190,174,212)}\n.Accent .q2-3{fill:rgb(253,192,134)}\n.Accent .q0-4{fill:rgb(127,201,127)}\n.Accent .q1-4{fill:rgb(190,174,212)}\n.Accent .q2-4{fill:rgb(253,192,134)}\n.Accent .q3-4{fill:rgb(255,255,153)}\n.Accent .q0-5{fill:rgb(127,201,127)}\n.Accent .q1-5{fill:rgb(190,174,212)}\n.Accent .q2-5{fill:rgb(253,192,134)}\n.Accent .q3-5{fill:rgb(255,255,153)}\n.Accent .q4-5{fill:rgb(56,108,176)}\n.Accent .q0-6{fill:rgb(127,201,127)}\n.Accent .q1-6{fill:rgb(190,174,212)}\n.Accent .q2-6{fill:rgb(253,192,134)}\n.Accent .q3-6{fill:rgb(255,255,153)}\n.Accent .q4-6{fill:rgb(56,108,176)}\n.Accent .q5-6{fill:rgb(240,2,127)}\n.Accent .q0-7{fill:rgb(127,201,127)}\n.Accent .q1-7{fill:rgb(190,174,212)}\n.Accent .q2-7{fill:rgb(253,192,134)}\n.Accent .q3-7{fill:rgb(255,255,153)}\n.Accent .q4-7{fill:rgb(56,108,176)}\n.Accent .q5-7{fill:rgb(240,2,127)}\n.Accent .q6-7{fill:rgb(191,91,23)}\n.Accent .q0-8{fill:rgb(127,201,127)}\n.Accent .q1-8{fill:rgb(190,174,212)}\n.Accent .q2-8{fill:rgb(253,192,134)}\n.Accent .q3-8{fill:rgb(255,255,153)}\n.Accent .q4-8{fill:rgb(56,108,176)}\n.Accent .q5-8{fill:rgb(240,2,127)}\n.Accent .q6-8{fill:rgb(191,91,23)}\n.Accent .q7-8{fill:rgb(102,102,102)}\n.Dark2 .q0-3{fill:rgb(27,158,119)}\n.Dark2 .q1-3{fill:rgb(217,95,2)}\n.Dark2 .q2-3{fill:rgb(117,112,179)}\n.Dark2 .q0-4{fill:rgb(27,158,119)}\n.Dark2 .q1-4{fill:rgb(217,95,2)}\n.Dark2 .q2-4{fill:rgb(117,112,179)}\n.Dark2 .q3-4{fill:rgb(231,41,138)}\n.Dark2 .q0-5{fill:rgb(27,158,119)}\n.Dark2 .q1-5{fill:rgb(217,95,2)}\n.Dark2 .q2-5{fill:rgb(117,112,179)}\n.Dark2 .q3-5{fill:rgb(231,41,138)}\n.Dark2 .q4-5{fill:rgb(102,166,30)}\n.Dark2 .q0-6{fill:rgb(27,158,119)}\n.Dark2 .q1-6{fill:rgb(217,95,2)}\n.Dark2 .q2-6{fill:rgb(117,112,179)}\n.Dark2 .q3-6{fill:rgb(231,41,138)}\n.Dark2 .q4-6{fill:rgb(102,166,30)}\n.Dark2 .q5-6{fill:rgb(230,171,2)}\n.Dark2 .q0-7{fill:rgb(27,158,119)}\n.Dark2 .q1-7{fill:rgb(217,95,2)}\n.Dark2 .q2-7{fill:rgb(117,112,179)}\n.Dark2 .q3-7{fill:rgb(231,41,138)}\n.Dark2 .q4-7{fill:rgb(102,166,30)}\n.Dark2 .q5-7{fill:rgb(230,171,2)}\n.Dark2 .q6-7{fill:rgb(166,118,29)}\n.Dark2 .q0-8{fill:rgb(27,158,119)}\n.Dark2 .q1-8{fill:rgb(217,95,2)}\n.Dark2 .q2-8{fill:rgb(117,112,179)}\n.Dark2 .q3-8{fill:rgb(231,41,138)}\n.Dark2 .q4-8{fill:rgb(102,166,30)}\n.Dark2 .q5-8{fill:rgb(230,171,2)}\n.Dark2 .q6-8{fill:rgb(166,118,29)}\n.Dark2 .q7-8{fill:rgb(102,102,102)}\n.Paired .q0-3{fill:rgb(166,206,227)}\n.Paired .q1-3{fill:rgb(31,120,180)}\n.Paired .q2-3{fill:rgb(178,223,138)}\n.Paired .q0-4{fill:rgb(166,206,227)}\n.Paired .q1-4{fill:rgb(31,120,180)}\n.Paired .q2-4{fill:rgb(178,223,138)}\n.Paired .q3-4{fill:rgb(51,160,44)}\n.Paired .q0-5{fill:rgb(166,206,227)}\n.Paired .q1-5{fill:rgb(31,120,180)}\n.Paired .q2-5{fill:rgb(178,223,138)}\n.Paired .q3-5{fill:rgb(51,160,44)}\n.Paired .q4-5{fill:rgb(251,154,153)}\n.Paired .q0-6{fill:rgb(166,206,227)}\n.Paired .q1-6{fill:rgb(31,120,180)}\n.Paired .q2-6{fill:rgb(178,223,138)}\n.Paired .q3-6{fill:rgb(51,160,44)}\n.Paired .q4-6{fill:rgb(251,154,153)}\n.Paired .q5-6{fill:rgb(227,26,28)}\n.Paired .q0-7{fill:rgb(166,206,227)}\n.Paired .q1-7{fill:rgb(31,120,180)}\n.Paired .q2-7{fill:rgb(178,223,138)}\n.Paired .q3-7{fill:rgb(51,160,44)}\n.Paired .q4-7{fill:rgb(251,154,153)}\n.Paired .q5-7{fill:rgb(227,26,28)}\n.Paired .q6-7{fill:rgb(253,191,111)}\n.Paired .q0-8{fill:rgb(166,206,227)}\n.Paired .q1-8{fill:rgb(31,120,180)}\n.Paired .q2-8{fill:rgb(178,223,138)}\n.Paired .q3-8{fill:rgb(51,160,44)}\n.Paired .q4-8{fill:rgb(251,154,153)}\n.Paired .q5-8{fill:rgb(227,26,28)}\n.Paired .q6-8{fill:rgb(253,191,111)}\n.Paired .q7-8{fill:rgb(255,127,0)}\n.Paired .q0-9{fill:rgb(166,206,227)}\n.Paired .q1-9{fill:rgb(31,120,180)}\n.Paired .q2-9{fill:rgb(178,223,138)}\n.Paired .q3-9{fill:rgb(51,160,44)}\n.Paired .q4-9{fill:rgb(251,154,153)}\n.Paired .q5-9{fill:rgb(227,26,28)}\n.Paired .q6-9{fill:rgb(253,191,111)}\n.Paired .q7-9{fill:rgb(255,127,0)}\n.Paired .q8-9{fill:rgb(202,178,214)}\n.Paired .q0-10{fill:rgb(166,206,227)}\n.Paired .q1-10{fill:rgb(31,120,180)}\n.Paired .q2-10{fill:rgb(178,223,138)}\n.Paired .q3-10{fill:rgb(51,160,44)}\n.Paired .q4-10{fill:rgb(251,154,153)}\n.Paired .q5-10{fill:rgb(227,26,28)}\n.Paired .q6-10{fill:rgb(253,191,111)}\n.Paired .q7-10{fill:rgb(255,127,0)}\n.Paired .q8-10{fill:rgb(202,178,214)}\n.Paired .q9-10{fill:rgb(106,61,154)}\n.Paired .q0-11{fill:rgb(166,206,227)}\n.Paired .q1-11{fill:rgb(31,120,180)}\n.Paired .q2-11{fill:rgb(178,223,138)}\n.Paired .q3-11{fill:rgb(51,160,44)}\n.Paired .q4-11{fill:rgb(251,154,153)}\n.Paired .q5-11{fill:rgb(227,26,28)}\n.Paired .q6-11{fill:rgb(253,191,111)}\n.Paired .q7-11{fill:rgb(255,127,0)}\n.Paired .q8-11{fill:rgb(202,178,214)}\n.Paired .q9-11{fill:rgb(106,61,154)}\n.Paired .q10-11{fill:rgb(255,255,153)}\n.Paired .q0-12{fill:rgb(166,206,227)}\n.Paired .q1-12{fill:rgb(31,120,180)}\n.Paired .q2-12{fill:rgb(178,223,138)}\n.Paired .q3-12{fill:rgb(51,160,44)}\n.Paired .q4-12{fill:rgb(251,154,153)}\n.Paired .q5-12{fill:rgb(227,26,28)}\n.Paired .q6-12{fill:rgb(253,191,111)}\n.Paired .q7-12{fill:rgb(255,127,0)}\n.Paired .q8-12{fill:rgb(202,178,214)}\n.Paired .q9-12{fill:rgb(106,61,154)}\n.Paired .q10-12{fill:rgb(255,255,153)}\n.Paired .q11-12{fill:rgb(177,89,40)}\n.Pastel1 .q0-3{fill:rgb(251,180,174)}\n.Pastel1 .q1-3{fill:rgb(179,205,227)}\n.Pastel1 .q2-3{fill:rgb(204,235,197)}\n.Pastel1 .q0-4{fill:rgb(251,180,174)}\n.Pastel1 .q1-4{fill:rgb(179,205,227)}\n.Pastel1 .q2-4{fill:rgb(204,235,197)}\n.Pastel1 .q3-4{fill:rgb(222,203,228)}\n.Pastel1 .q0-5{fill:rgb(251,180,174)}\n.Pastel1 .q1-5{fill:rgb(179,205,227)}\n.Pastel1 .q2-5{fill:rgb(204,235,197)}\n.Pastel1 .q3-5{fill:rgb(222,203,228)}\n.Pastel1 .q4-5{fill:rgb(254,217,166)}\n.Pastel1 .q0-6{fill:rgb(251,180,174)}\n.Pastel1 .q1-6{fill:rgb(179,205,227)}\n.Pastel1 .q2-6{fill:rgb(204,235,197)}\n.Pastel1 .q3-6{fill:rgb(222,203,228)}\n.Pastel1 .q4-6{fill:rgb(254,217,166)}\n.Pastel1 .q5-6{fill:rgb(255,255,204)}\n.Pastel1 .q0-7{fill:rgb(251,180,174)}\n.Pastel1 .q1-7{fill:rgb(179,205,227)}\n.Pastel1 .q2-7{fill:rgb(204,235,197)}\n.Pastel1 .q3-7{fill:rgb(222,203,228)}\n.Pastel1 .q4-7{fill:rgb(254,217,166)}\n.Pastel1 .q5-7{fill:rgb(255,255,204)}\n.Pastel1 .q6-7{fill:rgb(229,216,189)}\n.Pastel1 .q0-8{fill:rgb(251,180,174)}\n.Pastel1 .q1-8{fill:rgb(179,205,227)}\n.Pastel1 .q2-8{fill:rgb(204,235,197)}\n.Pastel1 .q3-8{fill:rgb(222,203,228)}\n.Pastel1 .q4-8{fill:rgb(254,217,166)}\n.Pastel1 .q5-8{fill:rgb(255,255,204)}\n.Pastel1 .q6-8{fill:rgb(229,216,189)}\n.Pastel1 .q7-8{fill:rgb(253,218,236)}\n.Pastel1 .q0-9{fill:rgb(251,180,174)}\n.Pastel1 .q1-9{fill:rgb(179,205,227)}\n.Pastel1 .q2-9{fill:rgb(204,235,197)}\n.Pastel1 .q3-9{fill:rgb(222,203,228)}\n.Pastel1 .q4-9{fill:rgb(254,217,166)}\n.Pastel1 .q5-9{fill:rgb(255,255,204)}\n.Pastel1 .q6-9{fill:rgb(229,216,189)}\n.Pastel1 .q7-9{fill:rgb(253,218,236)}\n.Pastel1 .q8-9{fill:rgb(242,242,242)}\n.Pastel2 .q0-3{fill:rgb(179,226,205)}\n.Pastel2 .q1-3{fill:rgb(253,205,172)}\n.Pastel2 .q2-3{fill:rgb(203,213,232)}\n.Pastel2 .q0-4{fill:rgb(179,226,205)}\n.Pastel2 .q1-4{fill:rgb(253,205,172)}\n.Pastel2 .q2-4{fill:rgb(203,213,232)}\n.Pastel2 .q3-4{fill:rgb(244,202,228)}\n.Pastel2 .q0-5{fill:rgb(179,226,205)}\n.Pastel2 .q1-5{fill:rgb(253,205,172)}\n.Pastel2 .q2-5{fill:rgb(203,213,232)}\n.Pastel2 .q3-5{fill:rgb(244,202,228)}\n.Pastel2 .q4-5{fill:rgb(230,245,201)}\n.Pastel2 .q0-6{fill:rgb(179,226,205)}\n.Pastel2 .q1-6{fill:rgb(253,205,172)}\n.Pastel2 .q2-6{fill:rgb(203,213,232)}\n.Pastel2 .q3-6{fill:rgb(244,202,228)}\n.Pastel2 .q4-6{fill:rgb(230,245,201)}\n.Pastel2 .q5-6{fill:rgb(255,242,174)}\n.Pastel2 .q0-7{fill:rgb(179,226,205)}\n.Pastel2 .q1-7{fill:rgb(253,205,172)}\n.Pastel2 .q2-7{fill:rgb(203,213,232)}\n.Pastel2 .q3-7{fill:rgb(244,202,228)}\n.Pastel2 .q4-7{fill:rgb(230,245,201)}\n.Pastel2 .q5-7{fill:rgb(255,242,174)}\n.Pastel2 .q6-7{fill:rgb(241,226,204)}\n.Pastel2 .q0-8{fill:rgb(179,226,205)}\n.Pastel2 .q1-8{fill:rgb(253,205,172)}\n.Pastel2 .q2-8{fill:rgb(203,213,232)}\n.Pastel2 .q3-8{fill:rgb(244,202,228)}\n.Pastel2 .q4-8{fill:rgb(230,245,201)}\n.Pastel2 .q5-8{fill:rgb(255,242,174)}\n.Pastel2 .q6-8{fill:rgb(241,226,204)}\n.Pastel2 .q7-8{fill:rgb(204,204,204)}\n.Set1 .q0-3{fill:rgb(228,26,28)}\n.Set1 .q1-3{fill:rgb(55,126,184)}\n.Set1 .q2-3{fill:rgb(77,175,74)}\n.Set1 .q0-4{fill:rgb(228,26,28)}\n.Set1 .q1-4{fill:rgb(55,126,184)}\n.Set1 .q2-4{fill:rgb(77,175,74)}\n.Set1 .q3-4{fill:rgb(152,78,163)}\n.Set1 .q0-5{fill:rgb(228,26,28)}\n.Set1 .q1-5{fill:rgb(55,126,184)}\n.Set1 .q2-5{fill:rgb(77,175,74)}\n.Set1 .q3-5{fill:rgb(152,78,163)}\n.Set1 .q4-5{fill:rgb(255,127,0)}\n.Set1 .q0-6{fill:rgb(228,26,28)}\n.Set1 .q1-6{fill:rgb(55,126,184)}\n.Set1 .q2-6{fill:rgb(77,175,74)}\n.Set1 .q3-6{fill:rgb(152,78,163)}\n.Set1 .q4-6{fill:rgb(255,127,0)}\n.Set1 .q5-6{fill:rgb(255,255,51)}\n.Set1 .q0-7{fill:rgb(228,26,28)}\n.Set1 .q1-7{fill:rgb(55,126,184)}\n.Set1 .q2-7{fill:rgb(77,175,74)}\n.Set1 .q3-7{fill:rgb(152,78,163)}\n.Set1 .q4-7{fill:rgb(255,127,0)}\n.Set1 .q5-7{fill:rgb(255,255,51)}\n.Set1 .q6-7{fill:rgb(166,86,40)}\n.Set1 .q0-8{fill:rgb(228,26,28)}\n.Set1 .q1-8{fill:rgb(55,126,184)}\n.Set1 .q2-8{fill:rgb(77,175,74)}\n.Set1 .q3-8{fill:rgb(152,78,163)}\n.Set1 .q4-8{fill:rgb(255,127,0)}\n.Set1 .q5-8{fill:rgb(255,255,51)}\n.Set1 .q6-8{fill:rgb(166,86,40)}\n.Set1 .q7-8{fill:rgb(247,129,191)}\n.Set1 .q0-9{fill:rgb(228,26,28)}\n.Set1 .q1-9{fill:rgb(55,126,184)}\n.Set1 .q2-9{fill:rgb(77,175,74)}\n.Set1 .q3-9{fill:rgb(152,78,163)}\n.Set1 .q4-9{fill:rgb(255,127,0)}\n.Set1 .q5-9{fill:rgb(255,255,51)}\n.Set1 .q6-9{fill:rgb(166,86,40)}\n.Set1 .q7-9{fill:rgb(247,129,191)}\n.Set1 .q8-9{fill:rgb(153,153,153)}\n.Set2 .q0-3{fill:rgb(102,194,165)}\n.Set2 .q1-3{fill:rgb(252,141,98)}\n.Set2 .q2-3{fill:rgb(141,160,203)}\n.Set2 .q0-4{fill:rgb(102,194,165)}\n.Set2 .q1-4{fill:rgb(252,141,98)}\n.Set2 .q2-4{fill:rgb(141,160,203)}\n.Set2 .q3-4{fill:rgb(231,138,195)}\n.Set2 .q0-5{fill:rgb(102,194,165)}\n.Set2 .q1-5{fill:rgb(252,141,98)}\n.Set2 .q2-5{fill:rgb(141,160,203)}\n.Set2 .q3-5{fill:rgb(231,138,195)}\n.Set2 .q4-5{fill:rgb(166,216,84)}\n.Set2 .q0-6{fill:rgb(102,194,165)}\n.Set2 .q1-6{fill:rgb(252,141,98)}\n.Set2 .q2-6{fill:rgb(141,160,203)}\n.Set2 .q3-6{fill:rgb(231,138,195)}\n.Set2 .q4-6{fill:rgb(166,216,84)}\n.Set2 .q5-6{fill:rgb(255,217,47)}\n.Set2 .q0-7{fill:rgb(102,194,165)}\n.Set2 .q1-7{fill:rgb(252,141,98)}\n.Set2 .q2-7{fill:rgb(141,160,203)}\n.Set2 .q3-7{fill:rgb(231,138,195)}\n.Set2 .q4-7{fill:rgb(166,216,84)}\n.Set2 .q5-7{fill:rgb(255,217,47)}\n.Set2 .q6-7{fill:rgb(229,196,148)}\n.Set2 .q0-8{fill:rgb(102,194,165)}\n.Set2 .q1-8{fill:rgb(252,141,98)}\n.Set2 .q2-8{fill:rgb(141,160,203)}\n.Set2 .q3-8{fill:rgb(231,138,195)}\n.Set2 .q4-8{fill:rgb(166,216,84)}\n.Set2 .q5-8{fill:rgb(255,217,47)}\n.Set2 .q6-8{fill:rgb(229,196,148)}\n.Set2 .q7-8{fill:rgb(179,179,179)}\n.Set3 .q0-3{fill:rgb(141,211,199)}\n.Set3 .q1-3{fill:rgb(255,255,179)}\n.Set3 .q2-3{fill:rgb(190,186,218)}\n.Set3 .q0-4{fill:rgb(141,211,199)}\n.Set3 .q1-4{fill:rgb(255,255,179)}\n.Set3 .q2-4{fill:rgb(190,186,218)}\n.Set3 .q3-4{fill:rgb(251,128,114)}\n.Set3 .q0-5{fill:rgb(141,211,199)}\n.Set3 .q1-5{fill:rgb(255,255,179)}\n.Set3 .q2-5{fill:rgb(190,186,218)}\n.Set3 .q3-5{fill:rgb(251,128,114)}\n.Set3 .q4-5{fill:rgb(128,177,211)}\n.Set3 .q0-6{fill:rgb(141,211,199)}\n.Set3 .q1-6{fill:rgb(255,255,179)}\n.Set3 .q2-6{fill:rgb(190,186,218)}\n.Set3 .q3-6{fill:rgb(251,128,114)}\n.Set3 .q4-6{fill:rgb(128,177,211)}\n.Set3 .q5-6{fill:rgb(253,180,98)}\n.Set3 .q0-7{fill:rgb(141,211,199)}\n.Set3 .q1-7{fill:rgb(255,255,179)}\n.Set3 .q2-7{fill:rgb(190,186,218)}\n.Set3 .q3-7{fill:rgb(251,128,114)}\n.Set3 .q4-7{fill:rgb(128,177,211)}\n.Set3 .q5-7{fill:rgb(253,180,98)}\n.Set3 .q6-7{fill:rgb(179,222,105)}\n.Set3 .q0-8{fill:rgb(141,211,199)}\n.Set3 .q1-8{fill:rgb(255,255,179)}\n.Set3 .q2-8{fill:rgb(190,186,218)}\n.Set3 .q3-8{fill:rgb(251,128,114)}\n.Set3 .q4-8{fill:rgb(128,177,211)}\n.Set3 .q5-8{fill:rgb(253,180,98)}\n.Set3 .q6-8{fill:rgb(179,222,105)}\n.Set3 .q7-8{fill:rgb(252,205,229)}\n.Set3 .q0-9{fill:rgb(141,211,199)}\n.Set3 .q1-9{fill:rgb(255,255,179)}\n.Set3 .q2-9{fill:rgb(190,186,218)}\n.Set3 .q3-9{fill:rgb(251,128,114)}\n.Set3 .q4-9{fill:rgb(128,177,211)}\n.Set3 .q5-9{fill:rgb(253,180,98)}\n.Set3 .q6-9{fill:rgb(179,222,105)}\n.Set3 .q7-9{fill:rgb(252,205,229)}\n.Set3 .q8-9{fill:rgb(217,217,217)}\n.Set3 .q0-10{fill:rgb(141,211,199)}\n.Set3 .q1-10{fill:rgb(255,255,179)}\n.Set3 .q2-10{fill:rgb(190,186,218)}\n.Set3 .q3-10{fill:rgb(251,128,114)}\n.Set3 .q4-10{fill:rgb(128,177,211)}\n.Set3 .q5-10{fill:rgb(253,180,98)}\n.Set3 .q6-10{fill:rgb(179,222,105)}\n.Set3 .q7-10{fill:rgb(252,205,229)}\n.Set3 .q8-10{fill:rgb(217,217,217)}\n.Set3 .q9-10{fill:rgb(188,128,189)}\n.Set3 .q0-11{fill:rgb(141,211,199)}\n.Set3 .q1-11{fill:rgb(255,255,179)}\n.Set3 .q2-11{fill:rgb(190,186,218)}\n.Set3 .q3-11{fill:rgb(251,128,114)}\n.Set3 .q4-11{fill:rgb(128,177,211)}\n.Set3 .q5-11{fill:rgb(253,180,98)}\n.Set3 .q6-11{fill:rgb(179,222,105)}\n.Set3 .q7-11{fill:rgb(252,205,229)}\n.Set3 .q8-11{fill:rgb(217,217,217)}\n.Set3 .q9-11{fill:rgb(188,128,189)}\n.Set3 .q10-11{fill:rgb(204,235,197)}\n.Set3 .q0-12{fill:rgb(141,211,199)}\n.Set3 .q1-12{fill:rgb(255,255,179)}\n.Set3 .q2-12{fill:rgb(190,186,218)}\n.Set3 .q3-12{fill:rgb(251,128,114)}\n.Set3 .q4-12{fill:rgb(128,177,211)}\n.Set3 .q5-12{fill:rgb(253,180,98)}\n.Set3 .q6-12{fill:rgb(179,222,105)}\n.Set3 .q7-12{fill:rgb(252,205,229)}\n.Set3 .q8-12{fill:rgb(217,217,217)}\n.Set3 .q9-12{fill:rgb(188,128,189)}\n.Set3 .q10-12{fill:rgb(204,235,197)}\n.Set3 .q11-12{fill:rgb(255,237,111)}", ""]);

	// exports


/***/ }
/******/ ]);