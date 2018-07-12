/** @license React v16.4.1
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.React = factory();
})(undefined, function () {
  'use strict';

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  /* eslint-disable no-unused-vars */

  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  // TODO: this is special because it gets imported during build.

  var ReactVersion = '16.4.1';

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;

  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable === 'undefined') {
      return null;
    }
    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }
    return null;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */

  var validateFormat = function validateFormat(format) {};

  {
    validateFormat = function validateFormat(format) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    };
  }

  function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);

    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  }

  var invariant_1 = invariant;

  // Relying on the `invariant()` implementation lets us
  // have preserve the format and params in the www builds.

  // Exports ReactDOM.createRoot


  // Experimental error-boundary API that can recover from errors within a single
  // render phase

  // Suspense
  var enableSuspense = false;
  // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


  // In some cases, StrictMode should also double-render lifecycles.
  // This can be confusing for tests though,
  // And it can be bad for performance in production.
  // This feature flag can be used to control the behavior:


  // To preserve the "Pause on caught exceptions" behavior of the debugger, we
  // replay the begin phase of a failed component inside invokeGuardedCallback.


  // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


  // Warn about legacy context API


  // Gather advanced timing metrics for Profiler subtrees.


  // Only used in www builds.

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  var emptyObject = {};

  {
    Object.freeze(emptyObject);
  }

  var emptyObject_1 = emptyObject;

  /**
   * Forked from fbjs/warning:
   * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
   *
   * Only change is we use console.warn instead of console.error,
   * and do nothing when 'console' is not supported.
   * This really simplifies the code.
   * ---
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var lowPriorityWarning = function lowPriorityWarning() {};

  {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.warn(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    lowPriorityWarning = function lowPriorityWarning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }
      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }

  var lowPriorityWarning$1 = lowPriorityWarning;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  function makeEmptyFunction(arg) {
    return function () {
      return arg;
    };
  }

  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  var emptyFunction = function emptyFunction() {};

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function () {
    return this;
  };
  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };

  var emptyFunction_1 = emptyFunction;

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = emptyFunction_1;

  {
    var printWarning$1 = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning$1.apply(undefined, [format].concat(args));
      }
    };
  }

  var warning_1 = warning;

  var didWarnStateUpdateForUnmountedComponent = {};

  function warnNoop(publicInstance, callerName) {
    {
      var _constructor = publicInstance.constructor;
      var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
      var warningKey = componentName + '.' + callerName;
      if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
        return;
      }
      warning_1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
      didWarnStateUpdateForUnmountedComponent[warningKey] = true;
    }
  }

  /**
   * This is the abstract API for an update queue.
   */
  var ReactNoopUpdateQueue = {
    /**
     * Checks whether or not this composite component is mounted.
     * @param {ReactClass} publicInstance The instance we want to test.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function isMounted(publicInstance) {
      return false;
    },

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
      warnNoop(publicInstance, 'forceUpdate');
    },

    /**
     * Replaces all of the state. Always use this or `setState` to mutate state.
     * You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} completeState Next state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
      warnNoop(publicInstance, 'replaceState');
    },

    /**
     * Sets a subset of the state. This only exists because _pendingState is
     * internal. This provides a merging strategy that is not available to deep
     * properties which is confusing. TODO: Expose pendingState or don't use it
     * during the merge.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialState Next partial state to be merged with state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} Name of the calling function in the public API.
     * @internal
     */
    enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
      warnNoop(publicInstance, 'setState');
    }
  };

  /**
   * Base class helpers for the updating state of a component.
   */
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject_1;
    // We initialize the default updater but the real one gets injected by the
    // renderer.
    this.updater = updater || ReactNoopUpdateQueue;
  }

  Component.prototype.isReactComponent = {};

  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * When a function is provided to setState, it will be called at some point in
   * the future (not synchronously). It will be called with the up to date
   * component arguments (state, props, context). These values can be different
   * from this.* because your function may be called after receiveProps but before
   * shouldComponentUpdate, and this new state, props, and context will not yet be
   * assigned to this.
   *
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */
  Component.prototype.setState = function (partialState, callback) {
    !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant_1(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */
  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  };

  /**
   * Deprecated APIs. These APIs used to exist on classic React classes but since
   * we would like to deprecate them, we're not going to move them over to this
   * modern base class. Instead, we define a getter that warns if it's accessed.
   */
  {
    var deprecatedAPIs = {
      isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
      replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
    };
    var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function get() {
          lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    };
    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }

  function ComponentDummy() {}
  ComponentDummy.prototype = Component.prototype;

  /**
   * Convenience component with default shallow equality check for sCU.
   */
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject_1;
    this.updater = updater || ReactNoopUpdateQueue;
  }

  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent;
  // Avoid an extra prototype jump for these methods.
  objectAssign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true;

  // an immutable object with a single mutable value
  function createRef() {
    var refObject = {
      current: null
    };
    {
      Object.seal(refObject);
    }
    return refObject;
  }

  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   */
  var ReactCurrentOwner = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null
  };

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };

  var specialPropKeyWarningShown = void 0;
  var specialPropRefWarningShown = void 0;

  function hasValidRef(config) {
    {
      if (hasOwnProperty$1.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty$1.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.key !== undefined;
  }

  function defineKeyPropWarningGetter(props, displayName) {
    var warnAboutAccessingKey = function warnAboutAccessingKey() {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        warning_1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    };
    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }

  function defineRefPropWarningGetter(props, displayName) {
    var warnAboutAccessingRef = function warnAboutAccessingRef() {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        warning_1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    };
    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }

  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, no instanceof check
   * will work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} key
   * @param {string|object} ref
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @param {*} owner
   * @param {*} props
   * @internal
   */
  var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
    var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,

      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,

      // Record the component responsible for creating this element.
      _owner: owner
    };

    {
      // The validation flag is currently mutative. We put it on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      element._store = {};

      // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }

    return element;
  };

  /**
   * Create and return a new ReactElement of the given type.
   * See https://reactjs.org/docs/react-api.html#createelement
   */
  function createElement(type, config, children) {
    var propName = void 0;

    // Reserved names are extracted
    var props = {};

    var key = null;
    var ref = null;
    var self = null;
    var source = null;

    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
      }
      if (hasValidKey(config)) {
        key = '' + config.key;
      }

      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source;
      // Remaining properties are added to a new props object
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    }

    // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      {
        if (Object.freeze) {
          Object.freeze(childArray);
        }
      }
      props.children = childArray;
    }

    // Resolve default props
    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }
    {
      if (key || ref) {
        if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }
          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
      }
    }
    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }

  /**
   * Return a function that produces ReactElements of a given type.
   * See https://reactjs.org/docs/react-api.html#createfactory
   */

  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

    return newElement;
  }

  /**
   * Clone and return a new ReactElement using element as the starting point.
   * See https://reactjs.org/docs/react-api.html#cloneelement
   */
  function cloneElement(element, config, children) {
    !!(element === null || element === undefined) ? invariant_1(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

    var propName = void 0;

    // Original props are copied
    var props = objectAssign({}, element.props);

    // Reserved names are extracted
    var key = element.key;
    var ref = element.ref;
    // Self is preserved since the owner is preserved.
    var self = element._self;
    // Source is preserved since cloneElement is unlikely to be targeted by a
    // transpiler, and the original source is probably a better indicator of the
    // true owner.
    var source = element._source;

    // Owner will be preserved, unless ref is overridden
    var owner = element._owner;

    if (config != null) {
      if (hasValidRef(config)) {
        // Silently steal the ref from the parent.
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }
      if (hasValidKey(config)) {
        key = '' + config.key;
      }

      // Remaining properties override existing props
      var defaultProps = void 0;
      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            // Resolve default props
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    }

    // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }

    return ReactElement(element.type, key, ref, self, source, owner, props);
  }

  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a valid component.
   * @final
   */
  function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }

  var ReactDebugCurrentFrame = {};

  {
    // Component that is being worked on
    ReactDebugCurrentFrame.getCurrentStack = null;

    ReactDebugCurrentFrame.getStackAddendum = function () {
      var impl = ReactDebugCurrentFrame.getCurrentStack;
      if (impl) {
        return impl();
      }
      return null;
    };
  }

  var SEPARATOR = '.';
  var SUBSEPARATOR = ':';

  /**
   * Escape and wrap key so it is safe to use as a reactid
   *
   * @param {string} key to be escaped.
   * @return {string} the escaped key.
   */
  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    };
    var escapedString = ('' + key).replace(escapeRegex, function (match) {
      return escaperLookup[match];
    });

    return '$' + escapedString;
  }

  /**
   * TODO: Test that a single child and an array with one item have the same key
   * pattern.
   */

  var didWarnAboutMaps = false;

  var userProvidedKeyEscapeRegex = /\/+/g;
  function escapeUserProvidedKey(text) {
    return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
  }

  var POOL_SIZE = 10;
  var traverseContextPool = [];
  function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
    if (traverseContextPool.length) {
      var traverseContext = traverseContextPool.pop();
      traverseContext.result = mapResult;
      traverseContext.keyPrefix = keyPrefix;
      traverseContext.func = mapFunction;
      traverseContext.context = mapContext;
      traverseContext.count = 0;
      return traverseContext;
    } else {
      return {
        result: mapResult,
        keyPrefix: keyPrefix,
        func: mapFunction,
        context: mapContext,
        count: 0
      };
    }
  }

  function releaseTraverseContext(traverseContext) {
    traverseContext.result = null;
    traverseContext.keyPrefix = null;
    traverseContext.func = null;
    traverseContext.context = null;
    traverseContext.count = 0;
    if (traverseContextPool.length < POOL_SIZE) {
      traverseContextPool.push(traverseContext);
    }
  }

  /**
   * @param {?*} children Children tree container.
   * @param {!string} nameSoFar Name of the key path so far.
   * @param {!function} callback Callback to invoke with each child found.
   * @param {?*} traverseContext Used to pass information throughout the traversal
   * process.
   * @return {!number} The number of children in this subtree.
   */
  function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
    var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

    if (type === 'undefined' || type === 'boolean') {
      // All of the above are perceived as null.
      children = null;
    }

    var invokeCallback = false;

    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case 'string':
        case 'number':
          invokeCallback = true;
          break;
        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }
      }
    }

    if (invokeCallback) {
      callback(traverseContext, children,
      // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows.
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
      return 1;
    }

    var child = void 0;
    var nextName = void 0;
    var subtreeCount = 0; // Count of children found in the current subtree.
    var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getComponentKey(child, i);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else {
      var iteratorFn = getIteratorFn(children);
      if (typeof iteratorFn === 'function') {
        {
          // Warn about using Maps as children
          if (iteratorFn === children.entries) {
            !didWarnAboutMaps ? warning_1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
            didWarnAboutMaps = true;
          }
        }

        var iterator = iteratorFn.call(children);
        var step = void 0;
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else if (type === 'object') {
        var addendum = '';
        {
          addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
        }
        var childrenString = '' + children;
        invariant_1(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
      }
    }

    return subtreeCount;
  }

  /**
   * Traverses children that are typically specified as `props.children`, but
   * might also be specified through attributes:
   *
   * - `traverseAllChildren(this.props.children, ...)`
   * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
   *
   * The `traverseContext` is an optional argument that is passed through the
   * entire traversal. It can be used to store accumulations or anything else that
   * the callback might find relevant.
   *
   * @param {?*} children Children tree object.
   * @param {!function} callback To invoke upon traversing each child.
   * @param {?*} traverseContext Context for traversal.
   * @return {!number} The number of children in this subtree.
   */
  function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }

    return traverseAllChildrenImpl(children, '', callback, traverseContext);
  }

  /**
   * Generate a key string that identifies a component within a set.
   *
   * @param {*} component A component that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */
  function getComponentKey(component, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && component !== null && component.key != null) {
      // Explicit key
      return escape(component.key);
    }
    // Implicit key determined by the index in the set
    return index.toString(36);
  }

  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func,
        context = bookKeeping.context;

    func.call(context, child, bookKeeping.count++);
  }

  /**
   * Iterates through children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc
   * @param {*} forEachContext Context for forEachContext.
   */
  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }
    var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    releaseTraverseContext(traverseContext);
  }

  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result,
        keyPrefix = bookKeeping.keyPrefix,
        func = bookKeeping.func,
        context = bookKeeping.context;

    var mappedChild = func.call(context, child, bookKeeping.count++);
    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction_1.thatReturnsArgument);
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(mappedChild,
        // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
      }
      result.push(mappedChild);
    }
  }

  function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    var escapedPrefix = '';
    if (prefix != null) {
      escapedPrefix = escapeUserProvidedKey(prefix) + '/';
    }
    var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    releaseTraverseContext(traverseContext);
  }

  /**
   * Maps children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenmap
   *
   * The provided mapFunction(child, key, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func The map function.
   * @param {*} context Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }

  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrencount
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */
  function countChildren(children) {
    return traverseAllChildren(children, emptyFunction_1.thatReturnsNull, null);
  }

  /**
   * Flatten a children object (typically specified as `props.children`) and
   * return an array with appropriately re-keyed children.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
   */
  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction_1.thatReturnsArgument);
    return result;
  }

  /**
   * Returns the first child in a collection of children and verifies that there
   * is only one child in the collection.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenonly
   *
   * The current implementation of this function assumes that a single child gets
   * passed without a wrapper, but the purpose of this helper function is to
   * abstract away the particular structure of children.
   *
   * @param {?object} children Child collection structure.
   * @return {ReactElement} The first and only `ReactElement` contained in the
   * structure.
   */
  function onlyChild(children) {
    !isValidElement(children) ? invariant_1(false, 'React.Children.only expected to receive a single React element child.') : void 0;
    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      {
        !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning_1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
      }
    }

    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      _defaultValue: defaultValue,
      _currentValue: defaultValue,
      // As a workaround to support multiple concurrent renderers, we categorize
      // some renderers as primary and others as secondary. We only expect
      // there to be two concurrent renderers at most: React Native (primary) and
      // Fabric (secondary); React DOM (primary) and React ART (secondary).
      // Secondary renderers store their context values on separate fields.
      _currentValue2: defaultValue,
      _changedBits: 0,
      _changedBits2: 0,
      // These are circular
      Provider: null,
      Consumer: null
    };

    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    };
    context.Consumer = context;

    {
      context._currentRenderer = null;
      context._currentRenderer2 = null;
    }

    return context;
  }

  function forwardRef(render) {
    {
      !(typeof render === 'function') ? warning_1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render === 'undefined' ? 'undefined' : _typeof(render)) : void 0;

      if (render != null) {
        !(render.defaultProps == null && render.propTypes == null) ? warning_1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
      }
    }

    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
  }

  var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
    return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
  };

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  function getComponentName(fiber) {
    var type = fiber.type;

    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
    if (typeof type === 'string') {
      return type;
    }
    switch (type) {
      case REACT_ASYNC_MODE_TYPE:
        return 'AsyncMode';
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';
      case REACT_FRAGMENT_TYPE:
        return 'ReactFragment';
      case REACT_PORTAL_TYPE:
        return 'ReactPortal';
      case REACT_PROFILER_TYPE:
        return 'Profiler(' + fiber.pendingProps.id + ')';
      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';
      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';
      case REACT_TIMEOUT_TYPE:
        return 'Timeout';
    }
    if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null) {
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          var functionName = type.render.displayName || type.render.name || '';
          return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
      }
    }
    return null;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var invariant$2 = invariant_1;
    var warning$2 = warning_1;
    var ReactPropTypesSecret = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            invariant$2(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          warning$2(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            warning$2(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
          }
        }
      }
    }
  }

  var checkPropTypes_1 = checkPropTypes;

  /**
   * ReactElementValidator provides a wrapper around a element factory
   * which validates the props passed to the element. This is intended to be
   * used only in DEV and could be replaced by a static type checker for languages
   * that support it.
   */

  var currentlyValidatingElement = void 0;
  var propTypesMisspellWarningShown = void 0;

  var getDisplayName = function getDisplayName() {};
  var getStackAddendum = function getStackAddendum() {};

  {
    currentlyValidatingElement = null;

    propTypesMisspellWarningShown = false;

    getDisplayName = function getDisplayName(element) {
      if (element == null) {
        return '#empty';
      } else if (typeof element === 'string' || typeof element === 'number') {
        return '#text';
      } else if (typeof element.type === 'string') {
        return element.type;
      }

      var type = element.type;
      if (type === REACT_FRAGMENT_TYPE) {
        return 'React.Fragment';
      } else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && type.$$typeof === REACT_FORWARD_REF_TYPE) {
        var functionName = type.render.displayName || type.render.name || '';
        return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
      } else {
        return type.displayName || type.name || 'Unknown';
      }
    };

    getStackAddendum = function getStackAddendum() {
      var stack = '';
      if (currentlyValidatingElement) {
        var name = getDisplayName(currentlyValidatingElement);
        var owner = currentlyValidatingElement._owner;
        stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
      }
      stack += ReactDebugCurrentFrame.getStackAddendum() || '';
      return stack;
    };
  }

  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current);
      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }
    return '';
  }

  function getSourceInfoErrorAddendum(elementProps) {
    if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
      var source = elementProps.__source;
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }
    return '';
  }

  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */
  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
      if (parentName) {
        info = '\n\nCheck the top-level render call using <' + parentName + '>.';
      }
    }
    return info;
  }

  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */
  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }
    element._store.validated = true;

    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

    // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.
    var childOwner = '';
    if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
      // Give the component that originally created this child.
      childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
    }

    currentlyValidatingElement = element;
    {
      warning_1(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
    }
    currentlyValidatingElement = null;
  }

  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */
  function validateChildKeys(node, parentType) {
    if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
      return;
    }
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];
        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);
      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step = void 0;
          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }

  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */
  function validatePropTypes(element) {
    var type = element.type;
    var name = void 0,
        propTypes = void 0;
    if (typeof type === 'function') {
      // Class or functional component
      name = type.displayName || type.name;
      propTypes = type.propTypes;
    } else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && type.$$typeof === REACT_FORWARD_REF_TYPE) {
      // ForwardRef
      var functionName = type.render.displayName || type.render.name || '';
      name = functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
      propTypes = type.propTypes;
    } else {
      return;
    }
    if (propTypes) {
      currentlyValidatingElement = element;
      checkPropTypes_1(propTypes, element.props, 'prop', name, getStackAddendum);
      currentlyValidatingElement = null;
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;
      warning_1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
    }
    if (typeof type.getDefaultProps === 'function') {
      !type.getDefaultProps.isReactClassApproved ? warning_1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
    }
  }

  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */
  function validateFragmentProps(fragment) {
    currentlyValidatingElement = fragment;

    var keys = Object.keys(fragment.props);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key !== 'children' && key !== 'key') {
        warning_1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }

    if (fragment.ref !== null) {
      warning_1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
    }

    currentlyValidatingElement = null;
  }

  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type);

    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      var info = '';
      if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      info += getStackAddendum() || '';

      var typeString = void 0;
      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else {
        typeString = typeof type === 'undefined' ? 'undefined' : _typeof(type);
      }

      warning_1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }

  function createFactoryWithValidation(type) {
    var validatedFactory = createElementWithValidation.bind(null, type);
    validatedFactory.type = type;
    // Legacy hook: remove it
    {
      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function get() {
          lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }

    return validatedFactory;
  }

  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

  var React = {
    Children: {
      map: mapChildren,
      forEach: forEachChildren,
      count: countChildren,
      toArray: toArray,
      only: onlyChild
    },

    createRef: createRef,
    Component: Component,
    PureComponent: PureComponent,

    createContext: createContext,
    forwardRef: forwardRef,

    Fragment: REACT_FRAGMENT_TYPE,
    StrictMode: REACT_STRICT_MODE_TYPE,
    unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
    unstable_Profiler: REACT_PROFILER_TYPE,

    createElement: createElementWithValidation,
    cloneElement: cloneElementWithValidation,
    createFactory: createFactoryWithValidation,
    isValidElement: isValidElement,

    version: ReactVersion,

    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      ReactCurrentOwner: ReactCurrentOwner,
      // Used by renderers to avoid bundling object-assign twice in UMD bundles:
      assign: objectAssign
    }
  };

  if (enableSuspense) {
    React.Timeout = REACT_TIMEOUT_TYPE;
  }

  {
    objectAssign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
      // These should not be included in production.
      ReactDebugCurrentFrame: ReactDebugCurrentFrame,
      // Shim for React DOM 16.0.0 which still destructured (but not used) this.
      // TODO: remove in React 17.0.
      ReactComponentTreeHook: {}
    });
  }

  var React$2 = Object.freeze({
    default: React
  });

  var React$3 = React$2 && React || React$2;

  // TODO: decide on the top-level export form.
  // This is hacky but makes it work with both Rollup and Jest.
  var react = React$3.default ? React$3.default : React$3;

  return react;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9yZWFjdC5kZXZlbG9wbWVudC5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsIlJlYWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJwcm90b3R5cGUiLCJwcm9wSXNFbnVtZXJhYmxlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJ0b09iamVjdCIsInZhbCIsInVuZGVmaW5lZCIsIlR5cGVFcnJvciIsInNob3VsZFVzZU5hdGl2ZSIsImFzc2lnbiIsInRlc3QxIiwiU3RyaW5nIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInRlc3QyIiwiaSIsImZyb21DaGFyQ29kZSIsIm9yZGVyMiIsIm1hcCIsIm4iLCJqb2luIiwidGVzdDMiLCJzcGxpdCIsImZvckVhY2giLCJsZXR0ZXIiLCJrZXlzIiwiZXJyIiwib2JqZWN0QXNzaWduIiwidGFyZ2V0Iiwic291cmNlIiwiZnJvbSIsInRvIiwic3ltYm9scyIsInMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJrZXkiLCJjYWxsIiwiUmVhY3RWZXJzaW9uIiwiaGFzU3ltYm9sIiwiU3ltYm9sIiwiZm9yIiwiUkVBQ1RfRUxFTUVOVF9UWVBFIiwiUkVBQ1RfUE9SVEFMX1RZUEUiLCJSRUFDVF9GUkFHTUVOVF9UWVBFIiwiUkVBQ1RfU1RSSUNUX01PREVfVFlQRSIsIlJFQUNUX1BST0ZJTEVSX1RZUEUiLCJSRUFDVF9QUk9WSURFUl9UWVBFIiwiUkVBQ1RfQ09OVEVYVF9UWVBFIiwiUkVBQ1RfQVNZTkNfTU9ERV9UWVBFIiwiUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSIsIlJFQUNUX1RJTUVPVVRfVFlQRSIsIk1BWUJFX0lURVJBVE9SX1NZTUJPTCIsIml0ZXJhdG9yIiwiRkFVWF9JVEVSQVRPUl9TWU1CT0wiLCJnZXRJdGVyYXRvckZuIiwibWF5YmVJdGVyYWJsZSIsIm1heWJlSXRlcmF0b3IiLCJ2YWxpZGF0ZUZvcm1hdCIsImZvcm1hdCIsIkVycm9yIiwiaW52YXJpYW50IiwiY29uZGl0aW9uIiwiYSIsImIiLCJjIiwiZCIsImUiLCJmIiwiZXJyb3IiLCJhcmdzIiwiYXJnSW5kZXgiLCJyZXBsYWNlIiwibmFtZSIsImZyYW1lc1RvUG9wIiwiaW52YXJpYW50XzEiLCJlbmFibGVTdXNwZW5zZSIsImVtcHR5T2JqZWN0IiwiZnJlZXplIiwiZW1wdHlPYmplY3RfMSIsImxvd1ByaW9yaXR5V2FybmluZyIsInByaW50V2FybmluZyIsIl9sZW4iLCJBcnJheSIsIl9rZXkiLCJtZXNzYWdlIiwiY29uc29sZSIsIndhcm4iLCJ4IiwiX2xlbjIiLCJfa2V5MiIsImFwcGx5IiwiY29uY2F0IiwibG93UHJpb3JpdHlXYXJuaW5nJDEiLCJtYWtlRW1wdHlGdW5jdGlvbiIsImFyZyIsImVtcHR5RnVuY3Rpb24iLCJ0aGF0UmV0dXJucyIsInRoYXRSZXR1cm5zRmFsc2UiLCJ0aGF0UmV0dXJuc1RydWUiLCJ0aGF0UmV0dXJuc051bGwiLCJ0aGF0UmV0dXJuc1RoaXMiLCJ0aGF0UmV0dXJuc0FyZ3VtZW50IiwiZW1wdHlGdW5jdGlvbl8xIiwid2FybmluZyIsInByaW50V2FybmluZyQxIiwiaW5kZXhPZiIsIndhcm5pbmdfMSIsImRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCIsIndhcm5Ob29wIiwicHVibGljSW5zdGFuY2UiLCJjYWxsZXJOYW1lIiwiX2NvbnN0cnVjdG9yIiwiY29uc3RydWN0b3IiLCJjb21wb25lbnROYW1lIiwiZGlzcGxheU5hbWUiLCJ3YXJuaW5nS2V5IiwiUmVhY3ROb29wVXBkYXRlUXVldWUiLCJpc01vdW50ZWQiLCJlbnF1ZXVlRm9yY2VVcGRhdGUiLCJjYWxsYmFjayIsImVucXVldWVSZXBsYWNlU3RhdGUiLCJjb21wbGV0ZVN0YXRlIiwiZW5xdWV1ZVNldFN0YXRlIiwicGFydGlhbFN0YXRlIiwiQ29tcG9uZW50IiwicHJvcHMiLCJjb250ZXh0IiwidXBkYXRlciIsInJlZnMiLCJpc1JlYWN0Q29tcG9uZW50Iiwic2V0U3RhdGUiLCJmb3JjZVVwZGF0ZSIsImRlcHJlY2F0ZWRBUElzIiwicmVwbGFjZVN0YXRlIiwiZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nIiwibWV0aG9kTmFtZSIsImluZm8iLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImZuTmFtZSIsIkNvbXBvbmVudER1bW15IiwiUHVyZUNvbXBvbmVudCIsInB1cmVDb21wb25lbnRQcm90b3R5cGUiLCJpc1B1cmVSZWFjdENvbXBvbmVudCIsImNyZWF0ZVJlZiIsInJlZk9iamVjdCIsImN1cnJlbnQiLCJzZWFsIiwiUmVhY3RDdXJyZW50T3duZXIiLCJoYXNPd25Qcm9wZXJ0eSQxIiwiUkVTRVJWRURfUFJPUFMiLCJyZWYiLCJfX3NlbGYiLCJfX3NvdXJjZSIsInNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duIiwic3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24iLCJoYXNWYWxpZFJlZiIsImNvbmZpZyIsImdldHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzUmVhY3RXYXJuaW5nIiwiaGFzVmFsaWRLZXkiLCJkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlciIsIndhcm5BYm91dEFjY2Vzc2luZ0tleSIsImNvbmZpZ3VyYWJsZSIsImRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyIiwid2FybkFib3V0QWNjZXNzaW5nUmVmIiwiUmVhY3RFbGVtZW50IiwidHlwZSIsInNlbGYiLCJvd25lciIsImVsZW1lbnQiLCIkJHR5cGVvZiIsIl9vd25lciIsIl9zdG9yZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsInZhbHVlIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwicHJvcE5hbWUiLCJjaGlsZHJlbkxlbmd0aCIsImNoaWxkQXJyYXkiLCJkZWZhdWx0UHJvcHMiLCJjbG9uZUFuZFJlcGxhY2VLZXkiLCJvbGRFbGVtZW50IiwibmV3S2V5IiwibmV3RWxlbWVudCIsIl9zZWxmIiwiX3NvdXJjZSIsImNsb25lRWxlbWVudCIsImlzVmFsaWRFbGVtZW50Iiwib2JqZWN0IiwiUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSIsImdldEN1cnJlbnRTdGFjayIsImdldFN0YWNrQWRkZW5kdW0iLCJpbXBsIiwiU0VQQVJBVE9SIiwiU1VCU0VQQVJBVE9SIiwiZXNjYXBlIiwiZXNjYXBlUmVnZXgiLCJlc2NhcGVyTG9va3VwIiwiZXNjYXBlZFN0cmluZyIsIm1hdGNoIiwiZGlkV2FybkFib3V0TWFwcyIsInVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4IiwiZXNjYXBlVXNlclByb3ZpZGVkS2V5IiwidGV4dCIsIlBPT0xfU0laRSIsInRyYXZlcnNlQ29udGV4dFBvb2wiLCJnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQiLCJtYXBSZXN1bHQiLCJrZXlQcmVmaXgiLCJtYXBGdW5jdGlvbiIsIm1hcENvbnRleHQiLCJ0cmF2ZXJzZUNvbnRleHQiLCJwb3AiLCJyZXN1bHQiLCJmdW5jIiwiY291bnQiLCJyZWxlYXNlVHJhdmVyc2VDb250ZXh0IiwicHVzaCIsInRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsIiwibmFtZVNvRmFyIiwiaW52b2tlQ2FsbGJhY2siLCJnZXRDb21wb25lbnRLZXkiLCJjaGlsZCIsIm5leHROYW1lIiwic3VidHJlZUNvdW50IiwibmV4dE5hbWVQcmVmaXgiLCJpc0FycmF5IiwiaXRlcmF0b3JGbiIsImVudHJpZXMiLCJzdGVwIiwiaWkiLCJuZXh0IiwiZG9uZSIsImFkZGVuZHVtIiwiY2hpbGRyZW5TdHJpbmciLCJ0cmF2ZXJzZUFsbENoaWxkcmVuIiwiY29tcG9uZW50IiwiaW5kZXgiLCJ0b1N0cmluZyIsImZvckVhY2hTaW5nbGVDaGlsZCIsImJvb2tLZWVwaW5nIiwiZm9yRWFjaENoaWxkcmVuIiwiZm9yRWFjaEZ1bmMiLCJmb3JFYWNoQ29udGV4dCIsIm1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQiLCJjaGlsZEtleSIsIm1hcHBlZENoaWxkIiwibWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbCIsImFycmF5IiwicHJlZml4IiwiZXNjYXBlZFByZWZpeCIsIm1hcENoaWxkcmVuIiwiY291bnRDaGlsZHJlbiIsInRvQXJyYXkiLCJvbmx5Q2hpbGQiLCJjcmVhdGVDb250ZXh0IiwiZGVmYXVsdFZhbHVlIiwiY2FsY3VsYXRlQ2hhbmdlZEJpdHMiLCJfY2FsY3VsYXRlQ2hhbmdlZEJpdHMiLCJfZGVmYXVsdFZhbHVlIiwiX2N1cnJlbnRWYWx1ZSIsIl9jdXJyZW50VmFsdWUyIiwiX2NoYW5nZWRCaXRzIiwiX2NoYW5nZWRCaXRzMiIsIlByb3ZpZGVyIiwiQ29uc3VtZXIiLCJfY29udGV4dCIsIl9jdXJyZW50UmVuZGVyZXIiLCJfY3VycmVudFJlbmRlcmVyMiIsImZvcndhcmRSZWYiLCJyZW5kZXIiLCJwcm9wVHlwZXMiLCJkZXNjcmliZUNvbXBvbmVudEZyYW1lIiwib3duZXJOYW1lIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiaXNWYWxpZEVsZW1lbnRUeXBlIiwiZ2V0Q29tcG9uZW50TmFtZSIsImZpYmVyIiwicGVuZGluZ1Byb3BzIiwiaWQiLCJmdW5jdGlvbk5hbWUiLCJSZWFjdFByb3BUeXBlc1NlY3JldCQxIiwiUmVhY3RQcm9wVHlwZXNTZWNyZXRfMSIsImludmFyaWFudCQyIiwid2FybmluZyQyIiwiUmVhY3RQcm9wVHlwZXNTZWNyZXQiLCJsb2dnZWRUeXBlRmFpbHVyZXMiLCJjaGVja1Byb3BUeXBlcyIsInR5cGVTcGVjcyIsInZhbHVlcyIsImxvY2F0aW9uIiwiZ2V0U3RhY2siLCJ0eXBlU3BlY05hbWUiLCJleCIsInN0YWNrIiwiY2hlY2tQcm9wVHlwZXNfMSIsImN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50IiwicHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24iLCJnZXREaXNwbGF5TmFtZSIsImdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSIsImdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtIiwiZWxlbWVudFByb3BzIiwib3duZXJIYXNLZXlVc2VXYXJuaW5nIiwiZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyIsInBhcmVudFR5cGUiLCJwYXJlbnROYW1lIiwidmFsaWRhdGVFeHBsaWNpdEtleSIsInZhbGlkYXRlZCIsImN1cnJlbnRDb21wb25lbnRFcnJvckluZm8iLCJjaGlsZE93bmVyIiwidmFsaWRhdGVDaGlsZEtleXMiLCJub2RlIiwidmFsaWRhdGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc1JlYWN0Q2xhc3NBcHByb3ZlZCIsInZhbGlkYXRlRnJhZ21lbnRQcm9wcyIsImZyYWdtZW50IiwiY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uIiwidmFsaWRUeXBlIiwic291cmNlSW5mbyIsInR5cGVTdHJpbmciLCJjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24iLCJ2YWxpZGF0ZWRGYWN0b3J5IiwiYmluZCIsImNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uIiwiQ2hpbGRyZW4iLCJvbmx5IiwiRnJhZ21lbnQiLCJTdHJpY3RNb2RlIiwidW5zdGFibGVfQXN5bmNNb2RlIiwidW5zdGFibGVfUHJvZmlsZXIiLCJjcmVhdGVGYWN0b3J5IiwidmVyc2lvbiIsIl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEIiwiVGltZW91dCIsIlJlYWN0Q29tcG9uZW50VHJlZUhvb2siLCJSZWFjdCQyIiwiZGVmYXVsdCIsIlJlYWN0JDMiLCJyZWFjdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQVNBOzs7O0FBRUMsV0FBVUEsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkI7QUFDM0IsVUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUFuQixJQUErQixPQUFPQyxNQUFQLEtBQWtCLFdBQWpELEdBQStEQSxPQUFPRCxPQUFQLEdBQWlCRCxTQUFoRixHQUNBLE9BQU9HLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQXZDLEdBQTZDRCxPQUFPSCxPQUFQLENB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QnlWLE9BQXRDOztBQUVBO0FBQ0E7QUFDQSxNQUFJRyxRQUFRRCxRQUFRRCxPQUFSLEdBQWtCQyxRQUFRRCxPQUExQixHQUFvQ0MsT0FBaEQ7O0FBRUEsU0FBT0MsS0FBUDtBQUVDLENBendEQSxDQUFEIiwiZmlsZSI6InJlYWN0LmRldmVsb3BtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi40LjFcbiAqIHJlYWN0LmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuUmVhY3QgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbnZhciBvYmplY3RBc3NpZ24gPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG4vLyBUT0RPOiB0aGlzIGlzIHNwZWNpYWwgYmVjYXVzZSBpdCBnZXRzIGltcG9ydGVkIGR1cmluZyBidWlsZC5cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi40LjEnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfVElNRU9VVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QudGltZW91dCcpIDogMHhlYWQxO1xuXG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7XG5cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICBpZiAobWF5YmVJdGVyYWJsZSA9PT0gbnVsbCB8fCB0eXBlb2YgbWF5YmVJdGVyYWJsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbWF5YmVJdGVyYXRvciA9IE1BWUJFX0lURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW01BWUJFX0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF07XG4gIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtYXliZUl0ZXJhdG9yO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG5cblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxue1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbnZhciBpbnZhcmlhbnRfMSA9IGludmFyaWFudDtcblxuLy8gUmVseWluZyBvbiB0aGUgYGludmFyaWFudCgpYCBpbXBsZW1lbnRhdGlvbiBsZXRzIHVzXG4vLyBoYXZlIHByZXNlcnZlIHRoZSBmb3JtYXQgYW5kIHBhcmFtcyBpbiB0aGUgd3d3IGJ1aWxkcy5cblxuLy8gRXhwb3J0cyBSZWFjdERPTS5jcmVhdGVSb290XG5cblxuLy8gRXhwZXJpbWVudGFsIGVycm9yLWJvdW5kYXJ5IEFQSSB0aGF0IGNhbiByZWNvdmVyIGZyb20gZXJyb3JzIHdpdGhpbiBhIHNpbmdsZVxuLy8gcmVuZGVyIHBoYXNlXG5cbi8vIFN1c3BlbnNlXG52YXIgZW5hYmxlU3VzcGVuc2UgPSBmYWxzZTtcbi8vIEhlbHBzIGlkZW50aWZ5IHNpZGUgZWZmZWN0cyBpbiBiZWdpbi1waGFzZSBsaWZlY3ljbGUgaG9va3MgYW5kIHNldFN0YXRlIHJlZHVjZXJzOlxuXG5cbi8vIEluIHNvbWUgY2FzZXMsIFN0cmljdE1vZGUgc2hvdWxkIGFsc28gZG91YmxlLXJlbmRlciBsaWZlY3ljbGVzLlxuLy8gVGhpcyBjYW4gYmUgY29uZnVzaW5nIGZvciB0ZXN0cyB0aG91Z2gsXG4vLyBBbmQgaXQgY2FuIGJlIGJhZCBmb3IgcGVyZm9ybWFuY2UgaW4gcHJvZHVjdGlvbi5cbi8vIFRoaXMgZmVhdHVyZSBmbGFnIGNhbiBiZSB1c2VkIHRvIGNvbnRyb2wgdGhlIGJlaGF2aW9yOlxuXG5cbi8vIFRvIHByZXNlcnZlIHRoZSBcIlBhdXNlIG9uIGNhdWdodCBleGNlcHRpb25zXCIgYmVoYXZpb3Igb2YgdGhlIGRlYnVnZ2VyLCB3ZVxuLy8gcmVwbGF5IHRoZSBiZWdpbiBwaGFzZSBvZiBhIGZhaWxlZCBjb21wb25lbnQgaW5zaWRlIGludm9rZUd1YXJkZWRDYWxsYmFjay5cblxuXG4vLyBXYXJuIGFib3V0IGRlcHJlY2F0ZWQsIGFzeW5jLXVuc2FmZSBsaWZlY3ljbGVzOyByZWxhdGVzIHRvIFJGQyAjNjpcblxuXG4vLyBXYXJuIGFib3V0IGxlZ2FjeSBjb250ZXh0IEFQSVxuXG5cbi8vIEdhdGhlciBhZHZhbmNlZCB0aW1pbmcgbWV0cmljcyBmb3IgUHJvZmlsZXIgc3VidHJlZXMuXG5cblxuLy8gT25seSB1c2VkIGluIHd3dyBidWlsZHMuXG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cblxuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxue1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxudmFyIGVtcHR5T2JqZWN0XzEgPSBlbXB0eU9iamVjdDtcblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbnZhciBlbXB0eUZ1bmN0aW9uXzEgPSBlbXB0eUZ1bmN0aW9uO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG5cblxuXG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbl8xO1xuXG57XG4gIHZhciBwcmludFdhcm5pbmckMSA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmckMS5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgd2FybmluZ18xID0gd2FybmluZztcblxudmFyIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCA9IHt9O1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB7XG4gICAgdmFyIF9jb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gX2NvbnN0cnVjdG9yICYmIChfY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgX2NvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJztcbiAgICB2YXIgd2FybmluZ0tleSA9IGNvbXBvbmVudE5hbWUgKyAnLicgKyBjYWxsZXJOYW1lO1xuICAgIGlmIChkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2FybmluZ18xKGZhbHNlLCBcIkNhbid0IGNhbGwgJXMgb24gYSBjb21wb25lbnQgdGhhdCBpcyBub3QgeWV0IG1vdW50ZWQuIFwiICsgJ1RoaXMgaXMgYSBuby1vcCwgYnV0IGl0IG1pZ2h0IGluZGljYXRlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uICcgKyAnSW5zdGVhZCwgYXNzaWduIHRvIGB0aGlzLnN0YXRlYCBkaXJlY3RseSBvciBkZWZpbmUgYSBgc3RhdGUgPSB7fTtgICcgKyAnY2xhc3MgcHJvcGVydHkgd2l0aCB0aGUgZGVzaXJlZCBzdGF0ZSBpbiB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNvbXBvbmVudE5hbWUpO1xuICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0XzE7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcblxuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICAhKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpID8gaW52YXJpYW50XzEoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbn07XG5cbi8qKlxuICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gKlxuICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gKlxuICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAqXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHVwZGF0ZSBpcyBjb21wbGV0ZS5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbntcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvd1ByaW9yaXR5V2FybmluZyQxKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG5Db21wb25lbnREdW1teS5wcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuXG4vKipcbiAqIENvbnZlbmllbmNlIGNvbXBvbmVudCB3aXRoIGRlZmF1bHQgc2hhbGxvdyBlcXVhbGl0eSBjaGVjayBmb3Igc0NVLlxuICovXG5mdW5jdGlvbiBQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3RfMTtcbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxudmFyIHB1cmVDb21wb25lbnRQcm90b3R5cGUgPSBQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xucHVyZUNvbXBvbmVudFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFB1cmVDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbm9iamVjdEFzc2lnbihwdXJlQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG4vLyBhbiBpbW11dGFibGUgb2JqZWN0IHdpdGggYSBzaW5nbGUgbXV0YWJsZSB2YWx1ZVxuZnVuY3Rpb24gY3JlYXRlUmVmKCkge1xuICB2YXIgcmVmT2JqZWN0ID0ge1xuICAgIGN1cnJlbnQ6IG51bGxcbiAgfTtcbiAge1xuICAgIE9iamVjdC5zZWFsKHJlZk9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIHJlZk9iamVjdDtcbn1cblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG59O1xuXG52YXIgaGFzT3duUHJvcGVydHkkMSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHZvaWQgMDtcbnZhciBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHZvaWQgMDtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkkMS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5JDEuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nXzEoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nXzEoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvd3MgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7XG4gICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc2VsZlxuICAgIH0pO1xuICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNvdXJjZVxuICAgIH0pO1xuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWUgPSB2b2lkIDA7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHtcbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wcy4kJHR5cGVvZiA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcHMuJCR0eXBlb2YgIT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2NyZWF0ZWZhY3RvcnlcbiAqL1xuXG5cbmZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcblxuICByZXR1cm4gbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY2xvbmVlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNsb25lRWxlbWVudChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gICEhKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkKSA/IGludmFyaWFudF8xKGZhbHNlLCAnUmVhY3QuY2xvbmVFbGVtZW50KC4uLik6IFRoZSBhcmd1bWVudCBtdXN0IGJlIGEgUmVhY3QgZWxlbWVudCwgYnV0IHlvdSBwYXNzZWQgJXMuJywgZWxlbWVudCkgOiB2b2lkIDA7XG5cbiAgdmFyIHByb3BOYW1lID0gdm9pZCAwO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gb2JqZWN0QXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB2b2lkIDA7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5JDEuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0ge307XG5cbntcbiAgLy8gQ29tcG9uZW50IHRoYXQgaXMgYmVpbmcgd29ya2VkIG9uXG4gIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrID0gbnVsbDtcblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGltcGwgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjaztcbiAgICBpZiAoaW1wbCkge1xuICAgICAgcmV0dXJuIGltcGwoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG59XG5cbnZhciBTRVBBUkFUT1IgPSAnLic7XG52YXIgU1VCU0VQQVJBVE9SID0gJzonO1xuXG4vKipcbiAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0nOiAnPTAnLFxuICAgICc6JzogJz0yJ1xuICB9O1xuICB2YXIgZXNjYXBlZFN0cmluZyA9ICgnJyArIGtleSkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcblxuICByZXR1cm4gJyQnICsgZXNjYXBlZFN0cmluZztcbn1cblxuLyoqXG4gKiBUT0RPOiBUZXN0IHRoYXQgYSBzaW5nbGUgY2hpbGQgYW5kIGFuIGFycmF5IHdpdGggb25lIGl0ZW0gaGF2ZSB0aGUgc2FtZSBrZXlcbiAqIHBhdHRlcm4uXG4gKi9cblxudmFyIGRpZFdhcm5BYm91dE1hcHMgPSBmYWxzZTtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcbmZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gIHJldHVybiAoJycgKyB0ZXh0KS5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCAnJCYvJyk7XG59XG5cbnZhciBQT09MX1NJWkUgPSAxMDtcbnZhciB0cmF2ZXJzZUNvbnRleHRQb29sID0gW107XG5mdW5jdGlvbiBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIGlmICh0cmF2ZXJzZUNvbnRleHRQb29sLmxlbmd0aCkge1xuICAgIHZhciB0cmF2ZXJzZUNvbnRleHQgPSB0cmF2ZXJzZUNvbnRleHRQb29sLnBvcCgpO1xuICAgIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gICAgdHJhdmVyc2VDb250ZXh0LmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgICB0cmF2ZXJzZUNvbnRleHQuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICAgIHRyYXZlcnNlQ29udGV4dC5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgICB0cmF2ZXJzZUNvbnRleHQuY291bnQgPSAwO1xuICAgIHJldHVybiB0cmF2ZXJzZUNvbnRleHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3VsdDogbWFwUmVzdWx0LFxuICAgICAga2V5UHJlZml4OiBrZXlQcmVmaXgsXG4gICAgICBmdW5jOiBtYXBGdW5jdGlvbixcbiAgICAgIGNvbnRleHQ6IG1hcENvbnRleHQsXG4gICAgICBjb3VudDogMFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdHJhdmVyc2VDb250ZXh0LnJlc3VsdCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5rZXlQcmVmaXggPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuZnVuYyA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5jb250ZXh0ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmNvdW50ID0gMDtcbiAgaWYgKHRyYXZlcnNlQ29udGV4dFBvb2wubGVuZ3RoIDwgUE9PTF9TSVpFKSB7XG4gICAgdHJhdmVyc2VDb250ZXh0UG9vbC5wdXNoKHRyYXZlcnNlQ29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgdmFyIGludm9rZUNhbGxiYWNrID0gZmFsc2U7XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsKSB7XG4gICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBzd2l0Y2ggKGNoaWxkcmVuLiQkdHlwZW9mKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbnZva2VDYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKHRyYXZlcnNlQ29udGV4dCwgY2hpbGRyZW4sXG4gICAgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHZvaWQgMDtcbiAgdmFyIG5leHROYW1lID0gdm9pZCAwO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cbiAgdmFyIG5leHROYW1lUHJlZml4ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiA6IG5hbWVTb0ZhciArIFNVQlNFUEFSQVRPUjtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHtcbiAgICAgICAgLy8gV2FybiBhYm91dCB1c2luZyBNYXBzIGFzIGNoaWxkcmVuXG4gICAgICAgIGlmIChpdGVyYXRvckZuID09PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgICAgIWRpZFdhcm5BYm91dE1hcHMgPyB3YXJuaW5nXzEoZmFsc2UsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIHVuc3VwcG9ydGVkIGFuZCB3aWxsIGxpa2VseSB5aWVsZCAnICsgJ3VuZXhwZWN0ZWQgcmVzdWx0cy4gQ29udmVydCBpdCB0byBhIHNlcXVlbmNlL2l0ZXJhYmxlIG9mIGtleWVkICcgKyAnUmVhY3RFbGVtZW50cyBpbnN0ZWFkLiVzJywgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCkpIDogdm9pZCAwO1xuICAgICAgICAgIGRpZFdhcm5BYm91dE1hcHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcCA9IHZvaWQgMDtcbiAgICAgIHZhciBpaSA9IDA7XG4gICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgIGNoaWxkID0gc3RlcC52YWx1ZTtcbiAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuICAgICAge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQuJyArIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICAgICAgfVxuICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gJycgKyBjaGlsZHJlbjtcbiAgICAgIGludmFyaWFudF8xKGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50ICE9PSBudWxsICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBlc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbmZvcmVhY2hcbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQobnVsbCwgbnVsbCwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkLCB0cmF2ZXJzZUNvbnRleHQpO1xuICByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0LFxuICAgICAga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4LFxuICAgICAgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuXG4gIHZhciBtYXBwZWRDaGlsZCA9IGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGVtcHR5RnVuY3Rpb25fMS50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm1hcFxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVuY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbikge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZW1wdHlGdW5jdGlvbl8xLnRoYXRSZXR1cm5zTnVsbCwgbnVsbCk7XG59XG5cbi8qKlxuICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVudG9hcnJheVxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uXzEudGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gKiBpcyBvbmx5IG9uZSBjaGlsZCBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5vbmx5XG4gKlxuICogVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0c1xuICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAqIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdEVsZW1lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RFbGVtZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gaW52YXJpYW50XzEoZmFsc2UsICdSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC4nKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KGRlZmF1bHRWYWx1ZSwgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIHtcbiAgaWYgKGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSB1bmRlZmluZWQpIHtcbiAgICBjYWxjdWxhdGVDaGFuZ2VkQml0cyA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAge1xuICAgICAgIShjYWxjdWxhdGVDaGFuZ2VkQml0cyA9PT0gbnVsbCB8fCB0eXBlb2YgY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPT09ICdmdW5jdGlvbicpID8gd2FybmluZ18xKGZhbHNlLCAnY3JlYXRlQ29udGV4dDogRXhwZWN0ZWQgdGhlIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCB0byBiZSBhICcgKyAnZnVuY3Rpb24uIEluc3RlYWQgcmVjZWl2ZWQ6ICVzJywgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb250ZXh0ID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9DT05URVhUX1RZUEUsXG4gICAgX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBjYWxjdWxhdGVDaGFuZ2VkQml0cyxcbiAgICBfZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgX2N1cnJlbnRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgIC8vIEFzIGEgd29ya2Fyb3VuZCB0byBzdXBwb3J0IG11bHRpcGxlIGNvbmN1cnJlbnQgcmVuZGVyZXJzLCB3ZSBjYXRlZ29yaXplXG4gICAgLy8gc29tZSByZW5kZXJlcnMgYXMgcHJpbWFyeSBhbmQgb3RoZXJzIGFzIHNlY29uZGFyeS4gV2Ugb25seSBleHBlY3RcbiAgICAvLyB0aGVyZSB0byBiZSB0d28gY29uY3VycmVudCByZW5kZXJlcnMgYXQgbW9zdDogUmVhY3QgTmF0aXZlIChwcmltYXJ5KSBhbmRcbiAgICAvLyBGYWJyaWMgKHNlY29uZGFyeSk7IFJlYWN0IERPTSAocHJpbWFyeSkgYW5kIFJlYWN0IEFSVCAoc2Vjb25kYXJ5KS5cbiAgICAvLyBTZWNvbmRhcnkgcmVuZGVyZXJzIHN0b3JlIHRoZWlyIGNvbnRleHQgdmFsdWVzIG9uIHNlcGFyYXRlIGZpZWxkcy5cbiAgICBfY3VycmVudFZhbHVlMjogZGVmYXVsdFZhbHVlLFxuICAgIF9jaGFuZ2VkQml0czogMCxcbiAgICBfY2hhbmdlZEJpdHMyOiAwLFxuICAgIC8vIFRoZXNlIGFyZSBjaXJjdWxhclxuICAgIFByb3ZpZGVyOiBudWxsLFxuICAgIENvbnN1bWVyOiBudWxsXG4gIH07XG5cbiAgY29udGV4dC5Qcm92aWRlciA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfUFJPVklERVJfVFlQRSxcbiAgICBfY29udGV4dDogY29udGV4dFxuICB9O1xuICBjb250ZXh0LkNvbnN1bWVyID0gY29udGV4dDtcblxuICB7XG4gICAgY29udGV4dC5fY3VycmVudFJlbmRlcmVyID0gbnVsbDtcbiAgICBjb250ZXh0Ll9jdXJyZW50UmVuZGVyZXIyID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0O1xufVxuXG5mdW5jdGlvbiBmb3J3YXJkUmVmKHJlbmRlcikge1xuICB7XG4gICAgISh0eXBlb2YgcmVuZGVyID09PSAnZnVuY3Rpb24nKSA/IHdhcm5pbmdfMShmYWxzZSwgJ2ZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHdhcyBnaXZlbiAlcy4nLCByZW5kZXIgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgcmVuZGVyKSA6IHZvaWQgMDtcblxuICAgIGlmIChyZW5kZXIgIT0gbnVsbCkge1xuICAgICAgIShyZW5kZXIuZGVmYXVsdFByb3BzID09IG51bGwgJiYgcmVuZGVyLnByb3BUeXBlcyA9PSBudWxsKSA/IHdhcm5pbmdfMShmYWxzZSwgJ2ZvcndhcmRSZWYgcmVuZGVyIGZ1bmN0aW9ucyBkbyBub3Qgc3VwcG9ydCBwcm9wVHlwZXMgb3IgZGVmYXVsdFByb3BzLiAnICsgJ0RpZCB5b3UgYWNjaWRlbnRhbGx5IHBhc3MgYSBSZWFjdCBjb21wb25lbnQ/JykgOiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSxcbiAgICByZW5kZXI6IHJlbmRlclxuICB9O1xufVxuXG52YXIgZGVzY3JpYmVDb21wb25lbnRGcmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgKG5hbWUgfHwgJ1Vua25vd24nKSArIChzb3VyY2UgPyAnIChhdCAnICsgc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknIDogb3duZXJOYW1lID8gJyAoY3JlYXRlZCBieSAnICsgb3duZXJOYW1lICsgJyknIDogJycpO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfVElNRU9VVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZShmaWJlcikge1xuICB2YXIgdHlwZSA9IGZpYmVyLnR5cGU7XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lO1xuICB9XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnQXN5bmNNb2RlJztcbiAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgIHJldHVybiAnQ29udGV4dC5Db25zdW1lcic7XG4gICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgcmV0dXJuICdSZWFjdEZyYWdtZW50JztcbiAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgcmV0dXJuICdSZWFjdFBvcnRhbCc7XG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuICdQcm9maWxlcignICsgZmliZXIucGVuZGluZ1Byb3BzLmlkICsgJyknO1xuICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgIHJldHVybiAnQ29udGV4dC5Qcm92aWRlcic7XG4gICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgcmV0dXJuICdTdHJpY3RNb2RlJztcbiAgICBjYXNlIFJFQUNUX1RJTUVPVVRfVFlQRTpcbiAgICAgIHJldHVybiAnVGltZW91dCc7XG4gIH1cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsKSB7XG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSB0eXBlLnJlbmRlci5kaXNwbGF5TmFtZSB8fCB0eXBlLnJlbmRlci5uYW1lIHx8ICcnO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb25OYW1lICE9PSAnJyA/ICdGb3J3YXJkUmVmKCcgKyBmdW5jdGlvbk5hbWUgKyAnKScgOiAnRm9yd2FyZFJlZic7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cblxuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQkMSA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldF8xID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQkMTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5cblxue1xuICB2YXIgaW52YXJpYW50JDIgPSBpbnZhcmlhbnRfMTtcbiAgdmFyIHdhcm5pbmckMiA9IHdhcm5pbmdfMTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gUmVhY3RQcm9wVHlwZXNTZWNyZXRfMTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCQyKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICd0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJXNgLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKTtcbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgd2FybmluZyQyKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyQyKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnZhciBjaGVja1Byb3BUeXBlc18xID0gY2hlY2tQcm9wVHlwZXM7XG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbnZhciBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IHZvaWQgMDtcbnZhciBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHZvaWQgMDtcblxudmFyIGdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24gKCkge307XG52YXIgZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcblxuICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xuXG4gIGdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyNlbXB0eSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJyN0ZXh0JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICAgIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgICByZXR1cm4gJ1JlYWN0LkZyYWdtZW50JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUpIHtcbiAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSB0eXBlLnJlbmRlci5kaXNwbGF5TmFtZSB8fCB0eXBlLnJlbmRlci5uYW1lIHx8ICcnO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uTmFtZSAhPT0gJycgPyAnRm9yd2FyZFJlZignICsgZnVuY3Rpb25OYW1lICsgJyknIDogJ0ZvcndhcmRSZWYnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nO1xuICAgIH1cbiAgfTtcblxuICBnZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFjayA9ICcnO1xuICAgIGlmIChjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXREaXNwbGF5TmFtZShjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC5fb3duZXI7XG4gICAgICBzdGFjayArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIGdldENvbXBvbmVudE5hbWUob3duZXIpKTtcbiAgICB9XG4gICAgc3RhY2sgKz0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCkgfHwgJyc7XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oZWxlbWVudFByb3BzKSB7XG4gIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudFByb3BzLl9fc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudFByb3BzLl9fc291cmNlO1xuICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZ2V0Q29tcG9uZW50TmFtZShlbGVtZW50Ll9vd25lcikgKyAnLic7XG4gIH1cblxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IGVsZW1lbnQ7XG4gIHtcbiAgICB3YXJuaW5nXzEoZmFsc2UsICdFYWNoIGNoaWxkIGluIGFuIGFycmF5IG9yIGl0ZXJhdG9yIHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1rZXlzIGZvciBtb3JlIGluZm9ybWF0aW9uLiVzJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lciwgZ2V0U3RhY2tBZGRlbmR1bSgpKTtcbiAgfVxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgLy8gYnV0IG5vdyB3ZSBwcmludCBhIHNlcGFyYXRlIHdhcm5pbmcgZm9yIHRoZW0gbGF0ZXIuXG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXAgPSB2b2lkIDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gIHZhciBuYW1lID0gdm9pZCAwLFxuICAgICAgcHJvcFR5cGVzID0gdm9pZCAwO1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBDbGFzcyBvciBmdW5jdGlvbmFsIGNvbXBvbmVudFxuICAgIG5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZTtcbiAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFKSB7XG4gICAgLy8gRm9yd2FyZFJlZlxuICAgIHZhciBmdW5jdGlvbk5hbWUgPSB0eXBlLnJlbmRlci5kaXNwbGF5TmFtZSB8fCB0eXBlLnJlbmRlci5uYW1lIHx8ICcnO1xuICAgIG5hbWUgPSBmdW5jdGlvbk5hbWUgIT09ICcnID8gJ0ZvcndhcmRSZWYoJyArIGZ1bmN0aW9uTmFtZSArICcpJyA6ICdGb3J3YXJkUmVmJztcbiAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHByb3BUeXBlcykge1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAgICBjaGVja1Byb3BUeXBlc18xKHByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgJ3Byb3AnLCBuYW1lLCBnZXRTdGFja0FkZGVuZHVtKTtcbiAgICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG4gIH0gZWxzZSBpZiAodHlwZS5Qcm9wVHlwZXMgIT09IHVuZGVmaW5lZCAmJiAhcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24pIHtcbiAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgd2FybmluZ18xKGZhbHNlLCAnQ29tcG9uZW50ICVzIGRlY2xhcmVkIGBQcm9wVHlwZXNgIGluc3RlYWQgb2YgYHByb3BUeXBlc2AuIERpZCB5b3UgbWlzc3BlbGwgdGhlIHByb3BlcnR5IGFzc2lnbm1lbnQ/JywgbmFtZSB8fCAnVW5rbm93bicpO1xuICB9XG4gIGlmICh0eXBlb2YgdHlwZS5nZXREZWZhdWx0UHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAhdHlwZS5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQgPyB3YXJuaW5nXzEoZmFsc2UsICdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhIGZyYWdtZW50LCB2YWxpZGF0ZSB0aGF0IGl0IGNhbiBvbmx5IGJlIHByb3ZpZGVkIHdpdGggZnJhZ21lbnQgcHJvcHNcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBmcmFnbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBmcmFnbWVudDtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyYWdtZW50LnByb3BzKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBrZXkgIT09ICdrZXknKSB7XG4gICAgICB3YXJuaW5nXzEoZmFsc2UsICdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJXMnLCBrZXksIGdldFN0YWNrQWRkZW5kdW0oKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgd2FybmluZ18xKGZhbHNlLCAnSW52YWxpZCBhdHRyaWJ1dGUgYHJlZmAgc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4lcycsIGdldFN0YWNrQWRkZW5kdW0oKSk7XG4gIH1cblxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbih0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIHZhbGlkVHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKTtcblxuICAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICBpZiAoIXZhbGlkVHlwZSkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0eXBlKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHMuXCI7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUluZm8gPSBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShwcm9wcyk7XG4gICAgaWYgKHNvdXJjZUluZm8pIHtcbiAgICAgIGluZm8gKz0gc291cmNlSW5mbztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICB9XG5cbiAgICBpbmZvICs9IGdldFN0YWNrQWRkZW5kdW0oKSB8fCAnJztcblxuICAgIHZhciB0eXBlU3RyaW5nID0gdm9pZCAwO1xuICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICB0eXBlU3RyaW5nID0gJ251bGwnO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgdHlwZVN0cmluZyA9ICdhcnJheSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGVTdHJpbmcgPSB0eXBlb2YgdHlwZTtcbiAgICB9XG5cbiAgICB3YXJuaW5nXzEoZmFsc2UsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGVTdHJpbmcsIGluZm8pO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICBpZiAodmFsaWRUeXBlKSB7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUpIHtcbiAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uKHR5cGUpIHtcbiAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24uYmluZChudWxsLCB0eXBlKTtcbiAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcbiAgLy8gTGVnYWN5IGhvb2s6IHJlbW92ZSBpdFxuICB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbn1cblxuZnVuY3Rpb24gY2xvbmVFbGVtZW50V2l0aFZhbGlkYXRpb24oZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciBuZXdFbGVtZW50ID0gY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICB9XG4gIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICByZXR1cm4gbmV3RWxlbWVudDtcbn1cblxudmFyIFJlYWN0ID0ge1xuICBDaGlsZHJlbjoge1xuICAgIG1hcDogbWFwQ2hpbGRyZW4sXG4gICAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICAgIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICAgIHRvQXJyYXk6IHRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgY3JlYXRlUmVmOiBjcmVhdGVSZWYsXG4gIENvbXBvbmVudDogQ29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBQdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUNvbnRleHQ6IGNyZWF0ZUNvbnRleHQsXG4gIGZvcndhcmRSZWY6IGZvcndhcmRSZWYsXG5cbiAgRnJhZ21lbnQ6IFJFQUNUX0ZSQUdNRU5UX1RZUEUsXG4gIFN0cmljdE1vZGU6IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUsXG4gIHVuc3RhYmxlX0FzeW5jTW9kZTogUkVBQ1RfQVNZTkNfTU9ERV9UWVBFLFxuICB1bnN0YWJsZV9Qcm9maWxlcjogUkVBQ1RfUFJPRklMRVJfVFlQRSxcblxuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24sXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50V2l0aFZhbGlkYXRpb24sXG4gIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnlXaXRoVmFsaWRhdGlvbixcbiAgaXNWYWxpZEVsZW1lbnQ6IGlzVmFsaWRFbGVtZW50LFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvbixcblxuICBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDoge1xuICAgIFJlYWN0Q3VycmVudE93bmVyOiBSZWFjdEN1cnJlbnRPd25lcixcbiAgICAvLyBVc2VkIGJ5IHJlbmRlcmVycyB0byBhdm9pZCBidW5kbGluZyBvYmplY3QtYXNzaWduIHR3aWNlIGluIFVNRCBidW5kbGVzOlxuICAgIGFzc2lnbjogb2JqZWN0QXNzaWduXG4gIH1cbn07XG5cbmlmIChlbmFibGVTdXNwZW5zZSkge1xuICBSZWFjdC5UaW1lb3V0ID0gUkVBQ1RfVElNRU9VVF9UWVBFO1xufVxuXG57XG4gIG9iamVjdEFzc2lnbihSZWFjdC5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCwge1xuICAgIC8vIFRoZXNlIHNob3VsZCBub3QgYmUgaW5jbHVkZWQgaW4gcHJvZHVjdGlvbi5cbiAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lOiBSZWFjdERlYnVnQ3VycmVudEZyYW1lLFxuICAgIC8vIFNoaW0gZm9yIFJlYWN0IERPTSAxNi4wLjAgd2hpY2ggc3RpbGwgZGVzdHJ1Y3R1cmVkIChidXQgbm90IHVzZWQpIHRoaXMuXG4gICAgLy8gVE9ETzogcmVtb3ZlIGluIFJlYWN0IDE3LjAuXG4gICAgUmVhY3RDb21wb25lbnRUcmVlSG9vazoge31cbiAgfSk7XG59XG5cblxuXG52YXIgUmVhY3QkMiA9IE9iamVjdC5mcmVlemUoe1xuXHRkZWZhdWx0OiBSZWFjdFxufSk7XG5cbnZhciBSZWFjdCQzID0gKCBSZWFjdCQyICYmIFJlYWN0ICkgfHwgUmVhY3QkMjtcblxuLy8gVE9ETzogZGVjaWRlIG9uIHRoZSB0b3AtbGV2ZWwgZXhwb3J0IGZvcm0uXG4vLyBUaGlzIGlzIGhhY2t5IGJ1dCBtYWtlcyBpdCB3b3JrIHdpdGggYm90aCBSb2xsdXAgYW5kIEplc3QuXG52YXIgcmVhY3QgPSBSZWFjdCQzLmRlZmF1bHQgPyBSZWFjdCQzLmRlZmF1bHQgOiBSZWFjdCQzO1xuXG5yZXR1cm4gcmVhY3Q7XG5cbn0pKSk7XG4iXX0=