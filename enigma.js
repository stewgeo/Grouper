/**
 * enigma.js v2.0.2
 * Copyright (c) 2017 QlikTech International AB
 * This library is licensed under MIT - See the LICENSE file for full details
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.enigma = factory());
}(this, (function () { 'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray$1 = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

var extend$1 = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray$1(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray$1(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var extend = extend$1.bind(null, true);
var JSONPatch = {};
var isArray = Array.isArray;
function isObject(v) {
  return v != null && !Array.isArray(v) && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object';
}
function isUndef(v) {
  return typeof v === 'undefined';
}
function isFunction(v) {
  return typeof v === 'function';
}

/**
* Generate an exact duplicate (with no references) of a specific value.
*
* @private
* @param {Object} The value to duplicate
* @returns {Object} a unique, duplicated value
*/
function generateValue(val) {
  if (val) {
    val = extend({}, { val: val }).val;
  }
  return val;
}

/**
* An additional type checker used to determine if the property is of internal
* use or not a type that can be translated into JSON (like functions).
*
* @private
* @param {Object} obj The object which has the property to check
* @param {String} The property name to check
* @returns {Boolean} Whether the property is deemed special or not
*/
function isSpecialProperty(obj, key) {
  return isFunction(obj[key]) || key.substring(0, 2) === '$$' || key.substring(0, 1) === '_';
}

/**
* Finds the parent object from a JSON-Pointer ("/foo/bar/baz" = "bar" is "baz" parent),
* also creates the object structure needed.
*
* @private
* @param {Object} data The root object to traverse through
* @param {String} The JSON-Pointer string to use when traversing
* @returns {Object} The parent object
*/
function getParent(data, str) {
  var seperator = '/';
  var parts = str.substring(1).split(seperator).slice(0, -1);
  var numPart = void 0;

  parts.forEach(function (part, i) {
    if (i === parts.length) {
      return;
    }
    numPart = +part;
    var newPart = !isNaN(numPart) ? [] : {};
    data[numPart || part] = isUndef(data[numPart || part]) ? newPart : data[part];
    data = data[numPart || part];
  });

  return data;
}

/**
* Cleans an object of all its properties, unless they're deemed special or
* cannot be removed by configuration.
*
* @private
* @param {Object} obj The object to clean
*/
function emptyObject(obj) {
  Object.keys(obj).forEach(function (key) {
    var config = Object.getOwnPropertyDescriptor(obj, key);

    if (config.configurable && !isSpecialProperty(obj, key)) {
      delete obj[key];
    }
  });
}

/**
* Compare an object with another, could be object, array, number, string, bool.
*
* @param {Object} a The first object to compare
* @param {Object} a The second object to compare
* @returns {Boolean} Whether the objects are identical
*/
function compare(a, b) {
  var isIdentical = true;

  if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    Object.keys(a).forEach(function (key) {
      if (!compare(a[key], b[key])) {
        isIdentical = false;
      }
    });
    return isIdentical;
  } else if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0, l = a.length; i < l; i += 1) {
      if (!compare(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
}

/**
* Generates patches by comparing two arrays.
*
* @private
* @param {Array} oldA The old (original) array, which will be patched
* @param {Array} newA The new array, which will be used to compare against
* @returns {Array} An array of patches (if any)
*/
function patchArray(original, newA, basePath) {
  var patches = [];
  var oldA = original.slice();
  var tmpIdx = -1;

  function findIndex(a, id, idx) {
    if (a[idx] && isUndef(a[idx].qInfo)) {
      return null;
    } else if (a[idx] && a[idx].qInfo.qId === id) {
      // shortcut if identical
      return idx;
    }
    for (var ii = 0, ll = a.length; ii < ll; ii += 1) {
      if (a[ii] && a[ii].qInfo.qId === id) {
        return ii;
      }
    }
    return -1;
  }

  if (compare(newA, oldA)) {
    // array is unchanged
    return patches;
  }

  if (!isUndef(newA[0]) && isUndef(newA[0].qInfo)) {
    // we cannot create patches without unique identifiers, replace array...
    patches.push({
      op: 'replace',
      path: basePath,
      value: newA
    });
    return patches;
  }

  for (var i = oldA.length - 1; i >= 0; i -= 1) {
    tmpIdx = findIndex(newA, oldA[i].qInfo && oldA[i].qInfo.qId, i);
    if (tmpIdx === -1) {
      patches.push({
        op: 'remove',
        path: basePath + '/' + i
      });
      oldA.splice(i, 1);
    } else {
      patches = patches.concat(JSONPatch.generate(oldA[i], newA[tmpIdx], basePath + '/' + i));
    }
  }

  for (var _i = 0, l = newA.length; _i < l; _i += 1) {
    tmpIdx = findIndex(oldA, newA[_i].qInfo && newA[_i].qInfo.qId);
    if (tmpIdx === -1) {
      patches.push({
        op: 'add',
        path: basePath + '/' + _i,
        value: newA[_i]
      });
      oldA.splice(_i, 0, newA[_i]);
    } else if (tmpIdx !== _i) {
      patches.push({
        op: 'move',
        path: basePath + '/' + _i,
        from: basePath + '/' + tmpIdx
      });
      oldA.splice(_i, 0, oldA.splice(tmpIdx, 1)[0]);
    }
  }
  return patches;
}

/**
* Generate an array of JSON-Patch:es following the JSON-Patch Specification Draft.
*
* See [specification draft](http://tools.ietf.org/html/draft-ietf-appsawg-json-patch-10)
*
* Does NOT currently generate patches for arrays (will replace them)
*
* @param {Object} original The object to patch to
* @param {Object} newData The object to patch from
* @param {String} [basePath] The base path to use when generating the paths for
*                            the patches (normally not used)
* @returns {Array} An array of patches
*/
JSONPatch.generate = function generate(original, newData, basePath) {
  basePath = basePath || '';
  var patches = [];

  Object.keys(newData).forEach(function (key) {
    var val = generateValue(newData[key]);
    var oldVal = original[key];
    var tmpPath = basePath + '/' + key;

    if (compare(val, oldVal) || isSpecialProperty(newData, key)) {
      return;
    }
    if (isUndef(oldVal)) {
      // property does not previously exist
      patches.push({
        op: 'add',
        path: tmpPath,
        value: val
      });
    } else if (isObject(val) && isObject(oldVal)) {
      // we need to generate sub-patches for this, since it already exist
      patches = patches.concat(JSONPatch.generate(oldVal, val, tmpPath));
    } else if (isArray(val) && isArray(oldVal)) {
      patches = patches.concat(patchArray(oldVal, val, tmpPath));
    } else {
      // it's a simple property (bool, string, number)
      patches.push({
        op: 'replace',
        path: basePath + '/' + key,
        value: val
      });
    }
  });

  Object.keys(original).forEach(function (key) {
    if (isUndef(newData[key]) && !isSpecialProperty(original, key)) {
      // this property does not exist anymore
      patches.push({
        op: 'remove',
        path: basePath + '/' + key
      });
    }
  });

  return patches;
};

/**
* Apply a list of patches to an object.
*
* @param {Object} original The object to patch
* @param {Array} patches The list of patches to apply
*/
JSONPatch.apply = function apply(original, patches) {
  patches.forEach(function (patch) {
    var parent = getParent(original, patch.path);
    var key = patch.path.split('/').splice(-1)[0];
    var target = key && isNaN(+key) ? parent[key] : parent[+key] || parent;
    var from = patch.from ? patch.from.split('/').splice(-1)[0] : null;

    if (patch.path === '/') {
      parent = null;
      target = original;
    }

    if (patch.op === 'add' || patch.op === 'replace') {
      if (isArray(parent)) {
        // trust indexes from patches, so don't replace the index if it's an add
        if (key === '-') {
          key = parent.length;
        }
        parent.splice(+key, patch.op === 'add' ? 0 : 1, patch.value);
      } else if (isArray(target) && isArray(patch.value)) {
        var _target;

        var newValues = patch.value.slice();
        // keep array reference if possible...
        target.length = 0;
        (_target = target).push.apply(_target, toConsumableArray(newValues));
      } else if (isObject(target) && isObject(patch.value)) {
        // keep object reference if possible...
        emptyObject(target);
        extend(target, patch.value);
      } else if (!parent) {
        throw new Error('Patchee is not an object we can patch');
      } else {
        // simple value
        parent[key] = patch.value;
      }
    } else if (patch.op === 'move') {
      var oldParent = getParent(original, patch.from);
      if (isArray(parent)) {
        parent.splice(+key, 0, oldParent.splice(+from, 1)[0]);
      } else {
        parent[key] = oldParent[from];
        delete oldParent[from];
      }
    } else if (patch.op === 'remove') {
      if (isArray(parent)) {
        parent.splice(+key, 1);
      } else {
        delete parent[key];
      }
    }
  });
};

/**
* Deep clone an object.
*
* @param {Object} obj The object to clone
* @returns {Object} A new object identical to the `obj`
*/
JSONPatch.clone = function clone(obj) {
  return extend({}, obj);
};

/**
* Creates a JSON-patch.
*
* @param {String} op The operation of the patch. Available values: "add", "remove", "move"
* @param {Object} [val] The value to set the `path` to. If `op` is `move`, `val`
*                       is the "from JSON-path" path
* @param {String} path The JSON-path for the property to change (e.g. "/qHyperCubeDef/columnOrder")
* @returns {Object} A patch following the JSON-patch specification
*/
JSONPatch.createPatch = function createPatch(op, val, path) {
  var patch = {
    op: op.toLowerCase(),
    path: path
  };
  if (patch.op === 'move') {
    patch.from = val;
  } else if (typeof val !== 'undefined') {
    patch.value = val;
  }
  return patch;
};

/**
* Apply the differences of two objects (keeping references if possible).
* Identical to running `JSONPatch.apply(original, JSONPatch.generate(original, newData));`
*
* @param {Object} original The object to update/patch
* @param {Object} newData the object to diff against
*
* @example
* var obj1 = { foo: [1,2,3], bar: { baz: true, qux: 1 } };
* var obj2 = { foo: [4,5,6], bar: { baz: false } };
* JSONPatch.updateObject(obj1, obj2);
* // => { foo: [4,5,6], bar: { baz: false } };
*/
JSONPatch.updateObject = function updateObject(original, newData) {
  if (!Object.keys(original).length) {
    extend(original, newData);
    return;
  }
  JSONPatch.apply(original, JSONPatch.generate(original, newData));
};

/**
 * Utility functions
 */

var util = {};

util.isObject = function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
};

util.isNumber = function isNumber(arg) {
  return typeof arg === 'number';
};

util.isUndefined = function isUndefined(arg) {
  return arg === void 0;
};

util.isFunction = function isFunction(arg){
  return typeof arg === 'function';
};


/**
 * EventEmitter class
 */

function EventEmitter() {
  EventEmitter.init.call(this);
}
var nodeEventEmitter = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!util.isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error' && !this._events.error) {
    er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      throw Error('Uncaught, unspecified "error" event.');
    }
    return false;
  }

  handler = this._events[type];

  if (util.isUndefined(handler))
    return false;

  if (util.isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (util.isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!util.isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              util.isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (util.isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (util.isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!util.isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;

      if (util.isFunction(console.error)) {
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
      }
      if (util.isFunction(console.trace))
        console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!util.isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!util.isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (util.isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (util.isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (util.isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (Array.isArray(listeners)) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (util.isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (util.isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

/**
* @module EventEmitter
*/
var Events = {

  /**
  * Function used to add event handling to objects passed in.
  * @param {Object} obj Object instance that will get event handling.
  */
  mixin: function mixin(obj) {
    Object.keys(nodeEventEmitter.prototype).forEach(function (key) {
      obj[key] = nodeEventEmitter.prototype[key];
    });
    nodeEventEmitter.init(obj);
  }
};

var RPC_CLOSE_NORMAL = 1000;
var RPC_CLOSE_MANUAL_SUSPEND = 4000;

var Session = function () {
  /**
  * Creates a new Session instance.
  * @param {Object} options The configuration option for this class.
  * @param {Intercept} options.intercept The intercept instance to use.
  * @param {ApiCache} options.apis The ApiCache instance to bridge events towards.
  * @param {Promise} options.Promise The promise constructor to use.
  * @param {RPC} options.rpc The RPC instance to use when communicating towards Engine.
  * @param {Schema} options.definition The Schema instance to use when generating APIs.
  * @param {Object} options.protocol Additional protocol properties.
  * @param {Boolean} options.protocol.delta Flag indicating if delta should be used or not.
  * @param {SuspendResume} options.suspendResume The SuspendResume instance to use.
  * @param {Object} [options.eventListeners] An object containing keys (event names) and
  *                                          values (event handlers) that will be bound
  *                                          during instantiation.
  */
  function Session(options) {
    classCallCheck(this, Session);

    var session = this;
    _extends(session, options);
    Events.mixin(session);
    session.rpc.on('socket-error', session.onRpcError.bind(session));
    session.rpc.on('closed', session.onRpcClosed.bind(session));
    session.rpc.on('message', session.onRpcMessage.bind(session));
    session.rpc.on('notification', session.onRpcNotification.bind(session));
    session.rpc.on('traffic', session.onRpcTraffic.bind(session));
    session.on('closed', function () {
      return session.onSessionClosed();
    });
  }

  /**
  * Event handler for re-triggering error events from RPC.
  * @emits socket-error
  * @param {Error} err Webocket error event.
  */


  createClass(Session, [{
    key: 'onRpcError',
    value: function onRpcError(err) {
      if (this.suspendResume.isSuspended) {
        return;
      }
      this.emit('socket-error', err);
    }

    /**
    * Event handler for the RPC close event.
    * @emits suspended
    * @emits closed
    * @param {Event} evt WebSocket close event.
    */

  }, {
    key: 'onRpcClosed',
    value: function onRpcClosed(evt) {
      var _this = this;

      if (this.suspendResume.isSuspended) {
        return;
      }
      if (evt.code === RPC_CLOSE_NORMAL || evt.code === RPC_CLOSE_MANUAL_SUSPEND) {
        return;
      }
      if (this.suspendOnClose) {
        this.suspendResume.suspend().then(function () {
          return _this.emit('suspended', { initiator: 'network' });
        });
      } else {
        this.emit('closed', evt);
      }
    }

    /**
    * Event handler for the RPC message event.
    * @param {Object} response JSONRPC response.
    */

  }, {
    key: 'onRpcMessage',
    value: function onRpcMessage(response) {
      var _this2 = this;

      if (this.suspendResume.isSuspended) {
        return;
      }
      if (response.change) {
        response.change.forEach(function (handle) {
          return _this2.emitHandleChanged(handle);
        });
      }
      if (response.close) {
        response.close.forEach(function (handle) {
          return _this2.emitHandleClosed(handle);
        });
      }
    }

    /**
    * Event handler for the RPC notification event.
    * @emits notification:*
    * @emits notification:[JSONRPC notification name]
    * @param {Object} response The JSONRPC notification.
    */

  }, {
    key: 'onRpcNotification',
    value: function onRpcNotification(response) {
      this.emit('notification:*', response.method, response.params);
      this.emit('notification:' + response.method, response.params);
    }

    /**
    * Event handler for the RPC traffic event.
    * @emits traffic:*
    * @emits traffic:sent
    * @emits traffic:received
    * @param {String} dir The traffic direction, sent or received.
    * @param {Object} data JSONRPC request/response/WebSocket message.
    */

  }, {
    key: 'onRpcTraffic',
    value: function onRpcTraffic(dir, data) {
      this.emit('traffic:*', dir, data);
      this.emit('traffic:' + dir, data);
    }

    /**
    * Event handler for cleaning up API instances when a session has been closed.
    * @emits api#closed
    */

  }, {
    key: 'onSessionClosed',
    value: function onSessionClosed() {
      this.apis.getApis().forEach(function (entry) {
        entry.api.emit('closed');
        entry.api.removeAllListeners();
      });
      this.apis.clear();
    }

    /**
     * Function used to get an API for a backend object.
     * @param {Object} args Arguments used to create object API.
     * @param {Number} args.handle Handle of the backend object.
     * @param {String} args.id ID of the backend object.
     * @param {String} args.type QIX type of the backend object. Can for example
     *                           be "Doc" or "GenericVariable".
     * @param {String} args.genericType Custom type of the backend object, if defined in qInfo.
     * @returns {*} Returns the generated and possibly augmented API.
     */

  }, {
    key: 'getObjectApi',
    value: function getObjectApi(args) {
      var handle = args.handle,
          id = args.id,
          type = args.type,
          genericType = args.genericType;

      var api = this.apis.getApi(handle);
      if (api) {
        return api;
      }
      api = this.definition.generate(type).create(this, handle, id, this.protocol.delta, genericType);
      this.apis.add(handle, api);
      return api;
    }

    /**
    * Response handler for generating APIs. Handles the quirks of engine not returning an error
    * when an object is missing.
    * @param {Object} response The response message.
    * @returns {Promise} A promise that resolves with the created object.
    */

  }, {
    key: 'handleObjectReferenceResponse',
    value: function handleObjectReferenceResponse(response) {
      if (response.qHandle && response.qType) {
        return this.getObjectApi({
          handle: response.qHandle,
          type: response.qType,
          id: response.qGenericId,
          genericType: response.qGenericType
        });
      }
      return this.Promise.reject(new Error('Object not found'));
    }

    /**
    * Establishes the RPC socket connection and returns the Global instance.
    * @returns {Promise} Eventually resolved if the connection was successful.
    */

  }, {
    key: 'open',
    value: function open() {
      var _this3 = this;

      if (!this.globalPromise) {
        var args = { handle: -1, id: 'Global', type: 'Global', genericType: 'Global' };
        this.globalPromise = this.rpc.open().then(function () {
          return _this3.getObjectApi(args);
        }).then(function (global) {
          _this3.emit('opened');
          return global;
        });
      }
      return this.globalPromise;
    }

    /**
    * Function used to send data on the RPC socket.
    * @param {Object} request The request to be sent. (data and some meta info)
    * @returns {Object} Returns a promise instance.
    */

  }, {
    key: 'send',
    value: function send(request) {
      var _this4 = this;

      if (this.suspendResume.isSuspended) {
        return this.Promise.reject(new Error('Session suspended'));
      }
      var data = _extends({}, this.protocol, {
        method: request.method,
        handle: request.handle,
        params: request.params,
        delta: request.delta
      });
      var response = this.rpc.send(data);
      request.id = data.id;
      request.retry = function () {
        return _this4.send(request);
      };

      var promise = this.intercept.execute(this, response, request).then(function (res) {
        if (typeof res.qHandle !== 'undefined' && typeof res.qType !== 'undefined') {
          return _this4.handleObjectReferenceResponse(res);
        }
        return res;
      });
      Session.addToPromiseChain(promise, 'requestId', request.id);
      return promise;
    }

    /**
    * Suspends the session ("sleeping state"), and closes the RPC connection.
    * @emits suspended
    * @returns {Promise} Eventually resolved when the RPC connection is closed.
    */

  }, {
    key: 'suspend',
    value: function suspend() {
      var _this5 = this;

      return this.suspendResume.suspend().then(function () {
        return _this5.emit('suspended', { initiator: 'manual' });
      });
    }

    /**
    * Resumes a previously suspended session.
    * @param {Boolean} onlyIfAttached If true, resume only if the session was re-attached.
    * @returns {Promise} Eventually resolved if the session was successfully resumed,
    *                    otherwise rejected.
    */

  }, {
    key: 'resume',
    value: function resume(onlyIfAttached) {
      var _this6 = this;

      return this.suspendResume.resume(onlyIfAttached).then(function (value) {
        _this6.emit('resumed');
        return value;
      });
    }

    /**
    * Function used to close the session.
    * @returns {Promise} Eventually resolved when the RPC connection is closed.
    */

  }, {
    key: 'close',
    value: function close() {
      var _this7 = this;

      this.globalPromise = undefined;
      return this.rpc.close().then(function (evt) {
        return _this7.emit('closed', evt);
      });
    }

    /**
    * Given a handle, this function will emit the 'changed' event on the
    * corresponding API instance.
    * @param {Number} handle The handle of the API instance.
    * @emits api#changed
    */

  }, {
    key: 'emitHandleChanged',
    value: function emitHandleChanged(handle) {
      var api = this.apis.getApi(handle);
      if (api) {
        api.emit('changed');
      }
    }

    /**
    * Given a handle, this function will emit the 'closed' event on the
    * corresponding API instance.
    * @param {Number} handle The handle of the API instance.
    * @emits api#closed
    */

  }, {
    key: 'emitHandleClosed',
    value: function emitHandleClosed(handle) {
      var api = this.apis.getApi(handle);
      if (api) {
        api.emit('closed');
        api.removeAllListeners();
      }
    }

    /**
    * Function used to add info on the promise chain.
    * @private
    * @param {Promise} promise The promise to add info on.
    * @param {String} name The property to add info on.
    * @param {Any} value The info to add.
    */

  }], [{
    key: 'addToPromiseChain',
    value: function addToPromiseChain(promise, name, value) {
      promise[name] = value;
      var then = promise.then;
      promise.then = function patchedThen() {
        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        var chain = then.apply(this, params);
        Session.addToPromiseChain(chain, name, value);
        return chain;
      };
    }
  }]);
  return Session;
}();

/**
* Key-value cache
*/
var KeyValueCache = function () {
  function KeyValueCache() {
    classCallCheck(this, KeyValueCache);

    this.entries = {};
  }

  /**
  * Adds an entry.
  * @function KeyValueCache#add
  * @param {String} key The key representing an entry.
  * @param {*} entry The entry to be added.
  */


  createClass(KeyValueCache, [{
    key: 'add',
    value: function add(key, entry) {
      key += '';
      if (typeof this.entries[key] !== 'undefined') {
        throw new Error('Entry already defined with key ' + key);
      }
      this.entries[key] = entry;
    }

    /**
    * Sets an entry.
    * @function KeyValueCache#set
    * @param {String} key The key representing an entry.
    * @param {*} entry The entry.
    */

  }, {
    key: 'set',
    value: function set$$1(key, entry) {
      key += '';
      this.entries[key] = entry;
    }

    /**
    * Removes an entry.
    * @function KeyValueCache#remove
    * @param {String} key The key representing an entry.
    */

  }, {
    key: 'remove',
    value: function remove(key) {
      delete this.entries[key];
    }

    /**
    * Gets an entry.
    * @function KeyValueCache#get
    * @param {String} key The key representing an entry.
    * @returns {*} The entry for the key.
    */

  }, {
    key: 'get',
    value: function get$$1(key) {
      return this.entries[key];
    }

    /**
    * Gets a list of all entries.
    * @function KeyValueCache#getAll
    * @returns {Array} The list of entries including its `key` and `value` properties.
    */

  }, {
    key: 'getAll',
    value: function getAll() {
      var _this = this;

      return Object.keys(this.entries).map(function (key) {
        return {
          key: key,
          value: _this.entries[key]
        };
      });
    }

    /**
    * Gets a key for an entry.
    * @function KeyValueCache#getKey
    * @param {*} entry The entry to locate the key for.
    * @returns {String} The key representing an entry.
    */

  }, {
    key: 'getKey',
    value: function getKey(entry) {
      var _this2 = this;

      return Object.keys(this.entries).filter(function (key) {
        return _this2.entries[key] === entry;
      })[0];
    }

    /**
    * Clears the cache of all entries.
    * @function KeyValueCache#clear
    */

  }, {
    key: 'clear',
    value: function clear() {
      this.entries = {};
    }
  }]);
  return KeyValueCache;
}();

var IGNORE_DELTA_METHODS = ['GetProperties', 'SetProperties', 'GetFullPropertyTree', 'SetFullPropertyTree', 'GetAppProperties', 'SetAppProperties'];

var SUCCESS_KEY = 'qSuccess';

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

/**
* Returns the camelCase counterpart of a symbol.
* @param {String} symbol The symbol.
* @return the camelCase counterpart.
*/
function toCamelCase(symbol) {
  return symbol.substring(0, 1).toLowerCase() + symbol.substring(1);
}

/**
 * A facade function that allows parameters to be passed either by name
 * (through an object), or by position (through an array).
 * @param {Function} base The function that is being overriden. Will be
 *                        called with parameters in array-form.
 * @param {Object} defaults Parameter list and it's default values.
 * @param {*} params The parameters.
 */
function namedParamFacade(base, defaults$$1) {
  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  if (params.length === 1 && _typeof(params[0]) === 'object') {
    var valid = Object.keys(params[0]).every(function (key) {
      return hasOwnProperty$1.call(defaults$$1, key);
    });
    if (valid) {
      params = Object.keys(defaults$$1).map(function (key) {
        return params[0][key] || defaults$$1[key];
      });
    }
  }
  return base.apply(this, params);
}

/**
* Qix schema definition.
*/

var Schema = function () {
  /**
  * Create a new schema instance.
  * @param {Configuration} config The configuration for QIX.
  */
  function Schema(config) {
    classCallCheck(this, Schema);

    this.config = config;
    this.Promise = config.Promise;
    this.schema = config.schema;
    this.mixins = new KeyValueCache();
    this.types = new KeyValueCache();
  }

  /**
  * Function used to add a mixin object to the mixin cache. Will be mixed into the API
  * of the specified key when generated.
  * @param {Object} mixin Mixin object.
  * @param {String|Array<String>} mixin.types String or array of strings containing the
  *                                           API-types that will be mixed in.
  * @param {Object} [mixin.extend] Object literal containing the methods that
  *                                will be extended on the specified API.
  * @param {Object} [mixin.override] Object literal containing the methods to
  *                                  override existing methods.
  * @param {Function} [mixin.init] Init function that, if defined, will run when an API is
  *                                instantiated. It runs with Promise and API object as parameters.
  */


  createClass(Schema, [{
    key: 'registerMixin',
    value: function registerMixin(_ref) {
      var _this = this;

      var types = _ref.types,
          type = _ref.type,
          extend = _ref.extend,
          override = _ref.override,
          init = _ref.init;

      if (!Array.isArray(types)) {
        types = [types];
      }
      // to support a single type
      if (type) {
        types.push(type);
      }
      var cached = { extend: extend, override: override, init: init };
      types.forEach(function (typeKey) {
        var entryList = _this.mixins.get(typeKey);
        if (entryList) {
          entryList.push(cached);
        } else {
          _this.mixins.add(typeKey, [cached]);
        }
      });
    }

    /**
    * Function used to generate a type definition.
    * @param {String} type The type.
    * @returns {{create: Function, def: Object}} Returns an object with a definition
    *          of the type and a create factory.
    */

  }, {
    key: 'generate',
    value: function generate(type) {
      var entry = this.types.get(type);
      if (entry) {
        return entry;
      }
      if (!this.schema.structs[type]) {
        throw new Error(type + ' not found');
      }
      var factory = this.generateApi(type, this.schema.structs[type]);
      this.types.add(type, factory);
      return factory;
    }

    /**
    * Function used to generate an API definition for a given type.
    * @param {String} type The type to generate.
    * @param {Object} schema The schema describing the type.
    * @returns {{create: (function(session:Object, handle:Number, id:String,
    *          delta:Boolean, customKey:String)), def: Object}} Returns the API definition.
    */

  }, {
    key: 'generateApi',
    value: function generateApi(type, schema) {
      var api = Object.create({});

      this.generateDefaultApi(api, schema); // Generate default
      this.mixinType(type, api); // Mixin default type
      this.mixinNamedParamFacade(api, schema); // Mixin named parameter support

      var create = function create(session, handle, id, delta, customKey) {
        var _this2 = this;

        var instance = Object.create(api);

        Events.mixin(instance); // Always mixin event-emitter per instance

        Object.defineProperties(instance, {
          session: {
            enumerable: true,
            value: session
          },
          handle: {
            enumerable: true,
            value: handle,
            writable: true
          },
          id: {
            enumerable: true,
            value: id
          },
          delta: {
            enumerable: true,
            value: delta
          },
          type: {
            enumerable: true,
            value: type
          },
          genericType: {
            enumerable: true,
            value: customKey
          }
        });

        var mixinList = this.mixins.get(type) || [];
        if (customKey !== type) {
          this.mixinType(customKey, instance); // Mixin custom types
          mixinList = mixinList.concat(this.mixins.get(customKey) || []);
        }
        mixinList.forEach(function (mixin) {
          if (typeof mixin.init === 'function') {
            mixin.init({ config: _this2.config, api: instance });
          }
        });

        return instance;
      }.bind(this);

      return {
        create: create,
        def: api
      };
    }

    /**
    * Function used to generate the methods with the right handlers to the object
    * API that is being generated.
    * @param {Object} api The object API that is currently being generated.
    * @param {Object} schema The API definition.
    */

  }, {
    key: 'generateDefaultApi',
    value: function generateDefaultApi(api, schema) {
      Object.keys(schema).forEach(function (key) {
        var fnName = toCamelCase(key);
        var outKey = schema[key].Out && schema[key].Out.length === 1 ? schema[key].Out[0].Name : -1;

        var allowDelta = IGNORE_DELTA_METHODS.indexOf(key) === -1 && outKey !== -1 && outKey !== SUCCESS_KEY;

        function fn() {
          for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            params[_key2] = arguments[_key2];
          }

          return this.session.send({
            method: key,
            handle: this.handle,
            params: params,
            delta: this.delta && allowDelta,
            outKey: outKey
          });
        }

        Object.defineProperty(api, fnName, {
          enumerable: true,
          writable: true,
          value: fn
        });
      });
    }

    /**
    * Function used to add mixin methods to a specified API.
    * @param {String} type Used to specify which mixin should be woven in.
    * @param {Object} api The object that will be woven.
    */

  }, {
    key: 'mixinType',
    value: function mixinType(type, api) {
      var mixinList = this.mixins.get(type);
      if (mixinList) {
        mixinList.forEach(function (_ref2) {
          var _ref2$extend = _ref2.extend,
              extend = _ref2$extend === undefined ? {} : _ref2$extend,
              _ref2$override = _ref2.override,
              override = _ref2$override === undefined ? {} : _ref2$override;

          Object.keys(override).forEach(function (key) {
            if (typeof api[key] === 'function' && typeof override[key] === 'function') {
              var baseFn = api[key];
              api[key] = function wrappedFn() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = arguments[_key3];
                }

                return override[key].apply(this, [baseFn.bind(this)].concat(args));
              };
            } else {
              throw new Error('No function to override. Type: ' + type + ' function: ' + key);
            }
          });
          Object.keys(extend).forEach(function (key) {
            // handle overrides
            if (typeof api[key] === 'function' && typeof extend[key] === 'function') {
              throw new Error('Extend is not allowed for this mixin. Type: ' + type + ' function: ' + key);
            } else {
              api[key] = extend[key];
            }
          });
        });
      }
    }

    /**
    * Function used to mixin the named parameter facade.
    * @param {Object} api The object API that is currently being generated.
    * @param {Object} schema The API definition.
    */

  }, {
    key: 'mixinNamedParamFacade',
    value: function mixinNamedParamFacade(api, schema) {
      Object.keys(schema).forEach(function (key) {
        var fnName = toCamelCase(key);
        var base = api[fnName];
        var defaults$$1 = schema[key].In.reduce(function (result, item) {
          result[item.Name] = item.DefaultValue;
          return result;
        }, {});

        api[fnName] = function namedParamWrapper() {
          for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            params[_key4] = arguments[_key4];
          }

          return namedParamFacade.apply(this, [base, defaults$$1].concat(params));
        };
      });
    }
  }]);
  return Schema;
}();

/**
 * Helper class for handling RPC calls
 */

var RPCResolver = function () {
  function RPCResolver(id, resolve, reject) {
    classCallCheck(this, RPCResolver);

    Events.mixin(this);
    this.id = id;
    this.resolve = resolve;
    this.reject = reject;
  }

  createClass(RPCResolver, [{
    key: 'resolveWith',
    value: function resolveWith(data) {
      this.resolve(data);
      this.emit('resolved', this.id);
    }
  }, {
    key: 'rejectWith',
    value: function rejectWith(err) {
      this.reject(err);
      this.emit('rejected', this.id);
    }
  }]);
  return RPCResolver;
}();

/**
* This class handles remote procedure calls on a web socket.
*/

var RPC = function () {
  /**
  * Create a new RPC instance.
  * @param {Object} options The configuration options for this class.
  * @param {Function} options.Promise The promise constructor to use.
  * @param {String} options.url The complete websocket URL used to connect.
  * @param {Function} options.createSocket The function callback to create a WebSocket.
  */
  function RPC(options) {
    classCallCheck(this, RPC);

    _extends(this, options);
    Events.mixin(this);
    this.resolvers = {};
    this.requestId = 0;
    this.openedPromise = undefined;
  }

  /**
  * Opens a connection to the configured endpoint.
  * @param {Boolean} force - ignores all previous and outstanding open calls if set to true.
  * @returns {Object} A promise instance.
  */


  createClass(RPC, [{
    key: 'open',
    value: function open() {
      var _this = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!force && this.openedPromise) {
        return this.openedPromise;
      }

      try {
        this.socket = this.createSocket(this.url);
      } catch (err) {
        return this.Promise.reject(err);
      }

      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
      this.openedPromise = new this.Promise(function (resolve, reject) {
        return _this.registerResolver('opened', resolve, reject);
      });
      this.closedPromise = new this.Promise(function (resolve, reject) {
        return _this.registerResolver('closed', resolve, reject);
      });
      return this.openedPromise;
    }

    /**
    * Resolves the open promise when a connection is successfully established.
    */

  }, {
    key: 'onOpen',
    value: function onOpen() {
      var _this2 = this;

      this.resolvers.opened.resolveWith(function () {
        return _this2.closedPromise;
      });
    }

    /**
    * Resolves the close promise when a connection is closed.
    * @param {Object} event - The event describing close.
    */

  }, {
    key: 'onClose',
    value: function onClose(event) {
      this.emit('closed', event);
      this.resolvers.closed.resolveWith(event);
      this.rejectAllOutstandingResolvers({ code: -1, message: 'Socket closed' });
    }

    /**
    * Closes a connection.
    * @param {Number} [code=1000] - The reason code for closing the connection.
    * @param {String} [reason=""] - The human readable string describing why the connection is closed.
    * @returns {Object} Returns a promise instance.
    */

  }, {
    key: 'close',
    value: function close() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var reason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (this.socket) {
        this.socket.close(code, reason);
        this.socket = null;
      }
      return this.closedPromise;
    }

    /**
    * Emits an error event and rejects the open promise if an error is raised on the connection.
    * @param {Object} event - The event describing the error.
    */

  }, {
    key: 'onError',
    value: function onError(event) {
      if (this.resolvers.opened) {
        this.resolvers.opened.rejectWith(event);
      } else {
        // only emit errors after the initial open promise has been resolved,
        // this makes it possible to catch early websocket errors as well
        // as run-time ones:
        this.emit('socket-error', event);
      }
      this.rejectAllOutstandingResolvers({ code: -1, message: 'Socket error' });
    }

    /**
    * Parses the onMessage event on the connection and resolve the promise for the request.
    * @param {Object} event - The event describing the message.
    */

  }, {
    key: 'onMessage',
    value: function onMessage(event) {
      var data = JSON.parse(event.data);
      this.emit('traffic', 'received', data);
      if (typeof data.id !== 'undefined') {
        this.emit('message', data);
        this.resolvers[data.id].resolveWith(data);
      } else {
        this.emit(data.params ? 'notification' : 'message', data);
      }
    }

    /**
    * Rejects all outstanding resolvers.
    * @param {Object} reason - The reject reason.
    */

  }, {
    key: 'rejectAllOutstandingResolvers',
    value: function rejectAllOutstandingResolvers(reason) {
      var _this3 = this;

      Object.keys(this.resolvers).forEach(function (id) {
        if (id === 'opened' || id === 'closed') {
          return; // "opened" and "closed" should not be handled here
        }
        var resolver = _this3.resolvers[id];
        resolver.rejectWith(reason);
      });
    }

    /**
    * Unregisters a resolver.
    * @param {Number|String} id - The ID to unregister the resolver with.
    */

  }, {
    key: 'unregisterResolver',
    value: function unregisterResolver(id) {
      var resolver = this.resolvers[id];
      resolver.removeAllListeners();
      delete this.resolvers[id];
    }

    /**
    * Registers a resolver.
    * @param {Number|String} id - The ID to register the resolver with.
    * @returns {Function} The promise executor function.
    */

  }, {
    key: 'registerResolver',
    value: function registerResolver(id, resolve, reject) {
      var _this4 = this;

      var resolver = new RPCResolver(id, resolve, reject);
      this.resolvers[id] = resolver;
      resolver.on('resolved', function (resolvedId) {
        return _this4.unregisterResolver(resolvedId);
      });
      resolver.on('rejected', function (rejectedId) {
        return _this4.unregisterResolver(rejectedId);
      });
    }

    /**
    * Sends data on the socket.
    * @param {Object} data - The data to send.
    * @returns {Object} A promise instance.
    */

  }, {
    key: 'send',
    value: function send(data) {
      var _this5 = this;

      if (!this.socket || this.socket.readyState !== this.socket.OPEN) {
        return this.Promise.reject(new Error('Not connected'));
      }
      this.requestId += 1;
      data.jsonrpc = '2.0';
      data.id = this.requestId;
      return new this.Promise(function (resolve, reject) {
        _this5.socket.send(JSON.stringify(data));
        _this5.emit('traffic', 'sent', data);
        return _this5.registerResolver(data.id, resolve, reject);
      });
    }
  }]);
  return RPC;
}();

var ON_ATTACHED_TIMEOUT_MS = 5000;
var RPC_CLOSE_MANUAL_SUSPEND$1 = 4000;

var SuspendResume = function () {
  /**
  * Creates a new SuspendResume instance.
  * @param {Object} options The configuration option for this class.
  * @param {Promise} options.Promise The promise constructor to use.
  * @param {RPC} options.rpc The RPC instance to use when communicating towards Engine.
  * @param {ApiCache} options.apis The ApiCache instance to use.
  */
  function SuspendResume(options) {
    var _this = this;

    classCallCheck(this, SuspendResume);

    _extends(this, options);
    this.isSuspended = false;
    this.rpc.on('traffic', function (dir, data) {
      if (dir === 'sent' && data.method === 'OpenDoc') {
        _this.openDocParams = data.params;
      }
    });
  }

  /**
  * Function used to restore the rpc connection.
  * @param {Boolean} onlyIfAttached - if true, the returned promise will resolve
  *                                   only if the session can be re-attached.
  * @returns {Object} Returns a promise instance.
  */


  createClass(SuspendResume, [{
    key: 'restoreRpcConnection',
    value: function restoreRpcConnection(onlyIfAttached) {
      var _this2 = this;

      return this.reopen(ON_ATTACHED_TIMEOUT_MS).then(function (sessionState) {
        if (sessionState === 'SESSION_CREATED' && onlyIfAttached) {
          return _this2.Promise.reject(new Error('Not attached'));
        }
        return _this2.Promise.resolve();
      });
    }

    /**
    * Function used to restore the global API.
    * @param {Object} changed - A list where the restored APIs will be added.
    * @returns {Object} Returns a promise instance.
    */

  }, {
    key: 'restoreGlobal',
    value: function restoreGlobal(changed) {
      var global = this.apis.getApisByType('Global').pop();
      changed.push(global.api);
      return this.Promise.resolve();
    }

    /**
    * Function used to restore the doc API.
    * @param {String} sessionState - The state of the session, attached or created.
    * @param {Array} closed - A list where the closed of APIs APIs will be added.
    * @param {Object} changed - A list where the restored APIs will be added.
    * @returns {Object} Returns a promise instance.
    */

  }, {
    key: 'restoreDoc',
    value: function restoreDoc(closed, changed) {
      var _this3 = this;

      var doc = this.apis.getApisByType('Doc').pop();

      if (!doc) {
        return this.Promise.resolve();
      }

      return this.rpc.send({
        method: 'GetActiveDoc',
        handle: -1,
        params: []
      }).then(function (response) {
        if (response.error && _this3.openDocParams) {
          return _this3.rpc.send({
            method: 'OpenDoc',
            handle: -1,
            params: _this3.openDocParams
          });
        }
        return response;
      }).then(function (response) {
        if (response.error) {
          closed.push(doc.api);
          return _this3.Promise.resolve();
        }
        var handle = response.result.qReturn.qHandle;
        doc.api.handle = handle;
        changed.push(doc.api);
        return _this3.Promise.resolve(doc.api);
      });
    }

    /**
    * Function used to restore the APIs on the doc.
    * @param {Object} doc - The doc API on which the APIs we want to restore exist.
    * @param {Array} closed - A list where the closed of APIs APIs will be added.
    * @param {Object} changed - A list where the restored APIs will be added.
    * @returns {Object} Returns a promise instance.
    */

  }, {
    key: 'restoreDocObjects',
    value: function restoreDocObjects(doc, closed, changed) {
      var _this4 = this;

      var tasks = [];
      var apis = this.apis.getApis().map(function (entry) {
        return entry.api;
      }).filter(function (api) {
        return api.type !== 'Global' && api.type !== 'Doc';
      });

      if (!doc) {
        apis.forEach(function (api) {
          return closed.push(api);
        });
        return this.Promise.resolve();
      }

      apis.forEach(function (api) {
        var method = SuspendResume.buildGetMethodName(api.type);

        if (!method) {
          closed.push(api);
        } else {
          var request = _this4.rpc.send({
            method: method,
            handle: doc.handle,
            params: [api.id]
          }).then(function (response) {
            if (response.error || !response.result.qReturn.qHandle) {
              closed.push(api);
            } else {
              api.handle = response.result.qReturn.qHandle;
              changed.push(api);
            }
          });
          tasks.push(request);
        }
      });
      return this.Promise.all(tasks);
    }

    /**
    * Set the instance as suspended.
    */

  }, {
    key: 'suspend',
    value: function suspend() {
      this.isSuspended = true;
      return this.rpc.close(RPC_CLOSE_MANUAL_SUSPEND$1);
    }

    /**
    * Resumes a previously suspended RPC connection, and refreshes the API cache.
    *                                APIs unabled to be restored has their 'closed'
    *                                event triggered, otherwise 'changed'.
    * @param {Boolean} onlyIfAttached if true, resume only if the session was re-attached.
    * @returns {Promise} Eventually resolved if the RPC connection was successfully resumed,
    *                    otherwise rejected.
    */

  }, {
    key: 'resume',
    value: function resume(onlyIfAttached) {
      var _this5 = this;

      var changed = [];
      var closed = [];

      return this.restoreRpcConnection(onlyIfAttached).then(function () {
        return _this5.restoreGlobal(changed);
      }).then(function () {
        return _this5.restoreDoc(closed, changed);
      }).then(function (doc) {
        return _this5.restoreDocObjects(doc, closed, changed);
      }).then(function () {
        _this5.isSuspended = false;
        _this5.apis.clear();
        closed.forEach(function (api) {
          api.emit('closed');
          api.removeAllListeners();
        });
        changed.forEach(function (api) {
          _this5.apis.add(api.handle, api);
          if (api.type !== 'Global') {
            api.emit('changed');
          }
        });
      }).catch(function (err) {
        return _this5.rpc.close().then(function () {
          return _this5.Promise.reject(err);
        });
      });
    }

    /**
    * Reopens the connection and waits for the OnConnected notification.
    * @param {Number} timeout - The time to wait for the OnConnected notification.
    * @returns {Object} A promise containing the session state (SESSION_CREATED or SESSION_ATTACHED).
    */

  }, {
    key: 'reopen',
    value: function reopen(timeout) {
      var _this6 = this;

      var timer = void 0;
      var notificationResolve = void 0;
      var notificationReceived = false;
      var notificationPromise = new this.Promise(function (resolve) {
        notificationResolve = resolve;
      });

      var waitForNotification = function waitForNotification() {
        if (!notificationReceived) {
          timer = setTimeout(function () {
            return notificationResolve('SESSION_CREATED');
          }, timeout);
        }
        return notificationPromise;
      };

      var onNotification = function onNotification(data) {
        if (data.method !== 'OnConnected') return;
        clearTimeout(timer);
        notificationResolve(data.params.qSessionState);
        notificationReceived = true;
      };

      this.rpc.on('notification', onNotification);

      return this.rpc.open(true).then(waitForNotification).then(function (state) {
        _this6.rpc.removeListener('notification', onNotification);
        return state;
      }).catch(function (err) {
        _this6.rpc.removeListener('notification', onNotification);
        return _this6.Promise.reject(err);
      });
    }

    /**
    * Function used to build the get method names for Doc APIs.
    * @param {String} type - The API type.
    * @returns {String} Returns the get method name, or undefined if the type cannot be restored.
    */

  }], [{
    key: 'buildGetMethodName',
    value: function buildGetMethodName(type) {
      if (type === 'Field' || type === 'Variable') {
        return null;
      } else if (type === 'GenericVariable') {
        return 'GetVariableById';
      }
      return type.replace('Generic', 'Get');
    }
  }]);
  return SuspendResume;
}();

var RETURN_KEY = 'qReturn';

var Intercept = function () {
  /**
  * Create a new Intercept instance.
  * @param {Object} options The configuration options for this class.
  * @param {Promise} options.Promise The promise constructor to use.
  * @param {ApiCache} options.apis The ApiCache instance to use.
  * @param {Boolean} options.delta Whether to use the delta protocol.
  * @param {Array} [options.interceptors] Additional interceptors to use.
  * @param {JSONPatch} [options.JSONPatch] The JSONPatch implementation to use (for testing).
  */
  function Intercept(options) {
    classCallCheck(this, Intercept);

    _extends(this, options);
    this.interceptors = [{
      onFulfilled: this.processErrorInterceptor
    }, {
      onFulfilled: this.processDeltaInterceptor
    }, {
      onFulfilled: this.processResultInterceptor
    }, {
      onFulfilled: this.processMultipleOutParamInterceptor
    }, {
      onFulfilled: this.processOutInterceptor
    }].concat(toConsumableArray(this.interceptors || []));
  }

  /**
  * Function used to determine if it is a primitive patch.
  * @param  {Array}  patches Patches from engine.
  * @return {Boolean} Returns true if it is a primitive patch.
  */


  createClass(Intercept, [{
    key: 'isPrimitivePatch',
    value: function isPrimitivePatch(patches) {
      // It's only `add` and `replace` that has a
      // value property according to the jsonpatch spec
      return patches.length === 1 && ['add', 'replace'].indexOf(patches[0].op) !== -1 && this.isPrimitiveValue(patches[0].value) && patches[0].path === '/';
    }

    /**
    * Function used to determine if it is a primitive value.
    * @param  {Any} value.
    * @return {Boolean} Returns true if it is a primitive value.
    */

  }, {
    key: 'isPrimitiveValue',
    value: function isPrimitiveValue(value) {
      return typeof value !== 'undefined' && value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && !Array.isArray(value);
    }

    /**
    * Function used to get a patchee.
    * @param {Number} handle - The handle.
    * @param {Array} patches - The patches.
    * @param {String} cacheId - The cacheId.
    * @returns {Object} Returns the patchee.
    */

  }, {
    key: 'getPatchee',
    value: function getPatchee(handle, patches, cacheId) {
      // handle primitive types, e.g. string, int, bool
      if (this.isPrimitivePatch(patches)) {
        var value = patches[0].value;
        this.apis.setPatchee(handle, cacheId, value);
        return value;
      }

      var patchee = this.apis.getPatchee(handle, cacheId);

      if (!this.isPrimitiveValue(patchee)) {
        patchee = patchee || (patches.length && Array.isArray(patches[0].value) ? [] : {});
        this.applyPatch(patchee, patches);
      }

      this.apis.setPatchee(handle, cacheId, patchee);

      return patchee;
    }

    /**
    * Function used to apply a patch.
    * @param {Object} patchee - The object to patch.
    * @param {Array} patches - The list of patches to apply.
    */

  }, {
    key: 'applyPatch',
    value: function applyPatch(patchee, patches) {
      this.JSONPatch.apply(patchee, patches);
    }

    /**
    * Process error interceptor.
    * @param {Object} session - The session the intercept is being executed on.
    * @param {Object} request - The JSON-RPC request.
    * @param {Object} response - The response.
    * @returns {Object} - Returns the defined error for an error, else the response.
    */

  }, {
    key: 'processErrorInterceptor',
    value: function processErrorInterceptor(session, request, response) {
      if (typeof response.error !== 'undefined') {
        var data = response.error;
        var error = new Error(data.message);
        error.code = data.code;
        error.parameter = data.parameter;
        return this.Promise.reject(error);
      }
      return response;
    }

    /**
    * Process delta interceptor.
    * @param {Object} session - The session the intercept is being executed on.
    * @param {Object} request - The JSON-RPC request.
    * @param {Object} response - The response.
    * @returns {Object} - Returns the patched response
    */

  }, {
    key: 'processDeltaInterceptor',
    value: function processDeltaInterceptor(session, request, response) {
      var result = response.result;
      if (response.delta) {
        // when delta is on the response data is expected to be an array of patches
        var keys = Object.keys(result);
        for (var i = 0, cnt = keys.length; i < cnt; i += 1) {
          var key = keys[i];
          var patches = result[key];
          if (!Array.isArray(patches)) {
            return this.Promise.reject(new Error('Unexpected rpc response, expected array of patches'));
          }
          result[key] = this.getPatchee(request.handle, patches, request.method + '-' + key);
        }
        // return a cloned response object to avoid patched object references:
        return JSON.parse(JSON.stringify(response));
      }
      return response;
    }

    /**
    * Process result interceptor.
    * @param {Object} session - The session the intercept is being executed on.
    * @param {Object} request - The JSON-RPC request.
    * @param {Object} response - The response.
    * @returns {Object} - Returns the result property on the response
    */

  }, {
    key: 'processResultInterceptor',
    value: function processResultInterceptor(session, request, response) {
      return response.result;
    }

    /**
    * Processes specific QIX methods that are breaking the protocol specification
    * and normalizes the response.
    * @param {Object} session - The session the intercept is being executed on.
    * @param {Object} request - The JSON-RPC request.
    * @param {Object} response - The response.
    * @returns {Object} - Returns the result property on the response
    */

  }, {
    key: 'processMultipleOutParamInterceptor',
    value: function processMultipleOutParamInterceptor(session, request, response) {
      if (request.method === 'CreateSessionApp' || request.method === 'CreateSessionAppFromApp') {
        // this method returns multiple out params that we need
        // to normalize before processing the response further:
        response[RETURN_KEY].qGenericId = response[RETURN_KEY].qGenericId || response.qSessionAppId;
      } else if (request.method === 'GetInteract') {
        // this method returns a qReturn value when it should only return
        // meta.outKey:
        delete response[RETURN_KEY];
      }
      return response;
    }

    /**
    * Process out interceptor.
    * @param {Object} session - The session the intercept is being executed on.
    * @param {Object} request - The JSON-RPC request.
    * @param {Object} response - The result.
    * @returns {Object} - Returns the out property on result
    */

  }, {
    key: 'processOutInterceptor',
    value: function processOutInterceptor(session, request, response) {
      if (hasOwnProperty.call(response, RETURN_KEY)) {
        return response[RETURN_KEY];
      } else if (request.outKey !== -1) {
        return response[request.outKey];
      }
      return response;
    }

    /**
    * Execute the interceptor queue, each interceptor will get the result from
    * the previous interceptor.
    * @param {Object} session The session instance to execute against.
    * @param {Promise} promise The promise to chain on to.
    * @param {Object} request The JSONRPC request object for the intercepted response.
    * @returns {Promise}
    */

  }, {
    key: 'execute',
    value: function execute(session, promise, request) {
      var _this = this;

      return this.interceptors.reduce(function (interception, interceptor) {
        return interception.then(interceptor.onFulfilled && interceptor.onFulfilled.bind(_this, session, request), interceptor.onRejected && interceptor.onRejected.bind(_this, session, request));
      }, promise);
    }
  }]);
  return Intercept;
}();

/**
* API cache for instances of QIX types, e.g. GenericObject.
* @extends KeyValueCache
*/

var ApiCache = function (_KeyValueCache) {
  inherits(ApiCache, _KeyValueCache);

  function ApiCache() {
    classCallCheck(this, ApiCache);
    return possibleConstructorReturn(this, (ApiCache.__proto__ || Object.getPrototypeOf(ApiCache)).apply(this, arguments));
  }

  createClass(ApiCache, [{
    key: 'add',

    /**
    * Adds an API.
    * @function ApiCache#add
    * @param {Number} handle - The handle for the API.
    * @param {*} api - The API.
    * @returns {{api: *, deltaCache}} The entry.
    */
    value: function add(handle, api) {
      var _this2 = this;

      var entry = {
        api: api,
        deltaCache: new KeyValueCache()
      };
      get(ApiCache.prototype.__proto__ || Object.getPrototypeOf(ApiCache.prototype), 'add', this).call(this, handle.toString(), entry);
      api.on('closed', function () {
        return _this2.remove(handle);
      });
      return entry;
    }

    /**
    * Gets an API.
    * @function ApiCache#getApi
    * @param {Number} handle - The handle for the API.
    * @returns {*} The API for the handle.
    */

  }, {
    key: 'getApi',
    value: function getApi(handle) {
      var entry = typeof handle !== 'undefined' ? this.get(handle.toString()) : undefined;
      return entry && entry.api;
    }

    /**
    * Gets a list of APIs.
    * @function ApiCache#getApis
    * @returns {Array} The list of entries including `handle` and `api` properties for each entry.
    */

  }, {
    key: 'getApis',
    value: function getApis() {
      return get(ApiCache.prototype.__proto__ || Object.getPrototypeOf(ApiCache.prototype), 'getAll', this).call(this).map(function (entry) {
        return {
          handle: entry.key,
          api: entry.value.api
        };
      });
    }

    /**
    * Gets a list of APIs with a given type.
    * @function ApiCache#getApisByType
    * @param {String} type - The type of APIs to get.
    * @returns {Array} The list of entries including `handle` and `api` properties for each entry.
    */

  }, {
    key: 'getApisByType',
    value: function getApisByType(type) {
      return this.getApis().filter(function (entry) {
        return entry.api.type === type;
      });
    }

    /**
    * Gets a patchee.
    * @function ApiCache#getPatchee
    * @param {Number} handle - The handle for the API to patch.
    * @param {String} method - The method to patch.
    * @returns {*} The patchee.
    */

  }, {
    key: 'getPatchee',
    value: function getPatchee(handle, method) {
      var entry = this.get(handle.toString());
      return entry && entry.deltaCache.get(method);
    }

    /**
    * Adds a patchee.
    * @function ApiCache#addPatchee
    * @param {Number} handle - The handle for the API to patch.
    * @param {String} method - The method to patch.
    * @param {Object} patchee - The patchee to add.
    */

  }, {
    key: 'addPatchee',
    value: function addPatchee(handle, method, patchee) {
      this.get(handle.toString()).deltaCache.add(method, patchee);
    }

    /**
    * Sets a patchee.
    * @function ApiCache#setPatchee
    * @param {Number} handle - The handle for the API.
    * @param {String} method - The method.
    * @param {Object} patchee - The patchee to add.
    */

  }, {
    key: 'setPatchee',
    value: function setPatchee(handle, method, patchee) {
      this.get(handle.toString()).deltaCache.set(method, patchee);
    }
  }]);
  return ApiCache;
}(KeyValueCache);

/**
* Qix service.
*/

var Qix = function () {
  function Qix() {
    classCallCheck(this, Qix);
  }

  createClass(Qix, null, [{
    key: 'getSession',

    /**
    * Function used to get a session.
    * @param {Configuration} config The configuration object for this session.
    * @returns {Object} Returns a session instance.
    */
    value: function getSession(config) {
      var createSocket = config.createSocket,
          definition = config.definition,
          JSONPatch$$1 = config.JSONPatch,
          Promise = config.Promise,
          protocol = config.protocol,
          responseInterceptors = config.responseInterceptors,
          suspendOnClose = config.suspendOnClose,
          url = config.url;

      var apis = new ApiCache();
      var intercept = new Intercept({
        apis: apis,
        interceptors: responseInterceptors,
        JSONPatch: JSONPatch$$1,
        Promise: Promise
      });
      var rpc = new RPC({ createSocket: createSocket, Promise: Promise, url: url });
      var suspendResume = new SuspendResume({ apis: apis, Promise: Promise, rpc: rpc });
      var session = new Session({
        apis: apis,
        definition: definition,
        intercept: intercept,
        Promise: Promise,
        protocol: protocol,
        rpc: rpc,
        suspendOnClose: suspendOnClose,
        suspendResume: suspendResume
      });
      return session;
    }

    /**
    * Function used to create a QIX session.
    * @param {Object} config The configuration object for the QIX session.
    * @returns {Session} Returns a new QIX session.
    */

  }, {
    key: 'create',
    value: function create(config) {
      Qix.configureDefaults(config);
      config.mixins.forEach(function (mixin) {
        config.definition.registerMixin(mixin);
      });
      return Qix.getSession(config);
    }

    /**
    * Function used to configure defaults.
    * @param {Configuration} config The configuration object for how to connect
    *                               and retrieve end QIX APIs.
    */

  }, {
    key: 'configureDefaults',
    value: function configureDefaults(config) {
      if (!config) {
        throw new Error('You need to supply a configuration.');
      }

      if (!config.Promise && typeof Promise === 'undefined') {
        // eslint-disable-line no-restricted-globals
        throw new Error('Your environment has no Promise implementation. You must provide a Promise implementation in the config.');
      }

      if (typeof config.createSocket !== 'function' && typeof WebSocket === 'function') {
        config.createSocket = function (url) {
          return new WebSocket(url);
        }; // eslint-disable-line no-undef
      }

      if (typeof config.suspendOnClose === 'undefined') {
        config.suspendOnClose = false;
      }

      config.protocol = config.protocol || {};
      config.protocol.delta = config.protocol.delta || true;
      config.Promise = config.Promise || Promise; // eslint-disable-line no-restricted-globals
      config.mixins = config.mixins || [];
      config.JSONPatch = config.JSONPatch || JSONPatch;
      config.definition = config.definition || new Schema(config);
    }
  }]);
  return Qix;
}();

return Qix;

})));
//# sourceMappingURL=enigma.js.map
