/* *********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                                *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions                     *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures                            *
 *                                                                                             *
 ********************************************************************************************* */


/**
 * Returns the functions composition of two specified functions f(x) and g(x).
 * The result of compose is to be a function of one argument, (lets call the argument x),
 * which works like applying function f to the result of applying function g to x, i.e.
 *  getComposition(f,g)(x) = f(g(x))
 *
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 *
 * @example
 *   getComposition(Math.sin, Math.asin)(x) => Math.sin(Math.asin(x))
 *
 */
function getComposition(f, g) {
  return (...args) => f(g(...args));
}


/**
 * Returns the math power function with the specified exponent
 *
 * @param {number} exponent
 * @return {Function}
 *
 * @example
 *   const power2 = getPowerFunction(2); // => x^2
 *   power2(2) => 4
 *   power2(4) => 16
 *
 *   const power05 = getPowerFunction(0.5); // => x^0.5
 *   power05(4) => 2
 *   power05(16) => 4
 *
 */
function getPowerFunction(exponent) {
  return (f) => f ** exponent;
}


/**
 * Returns the polynom function of one argument based on specified coefficients.
 * See: https://en.wikipedia.org/wiki/Polynomial#Definition
 *
 * @params {integer}
 * @return {Function}
 *
 * @example
 *   getPolynom(2,3,5) => y = 2*x^2 + 3*x + 5
 *   getPolynom(1,-3)  => y = x - 3
 *   getPolynom(8)     => y = 8
 *   getPolynom()      => null
 */
function getPolynom(...args) {
  const f = args.length - 1;
  if (f === -1) return null;
  return (x) => args.reduce((sum, k, i) => sum + k * (x ** (f - i)), 0);
}


/**
 * Memoizes passed function and returns function
 * which invoked first time calls the passed function and then always returns cached result.
 *
 * @params {Function} func - function to memoize
 * @return {Function} memoized function
 *
 * @example
 *   const memoizer = memoize(() => Math.random());
 *   memoizer() => some random number  (first run, evaluates the result of Math.random())
 *   memoizer() => the same random number  (second run, returns the previous cached result)
 *   ...
 *   memoizer() => the same random number  (next run, returns the previous cached result)
 */
function memoize(func) {
  const memory = new Map();
  return (arg) => {
    if (memory.has(arg)) {
      return memory.get(arg);
    }
    const result = func(arg);
    memory.set(arg, result);
    return result;
  };
}


/**
 * Returns the function trying to call the passed function and if it throws,
 * retrying it specified number of attempts.
 *
 * @param {Function} func
 * @param {number} attempts
 * @return {Function}
 *
 * @example
 * const attempt = 0, retryer = retry(() => {
 *      if (++attempt % 2) throw new Error('test');
 *      else return attempt;
 * }, 2);
 * retryer() => 2
 */
function retry(func, attempt) {
  return () => {
    try {
      if (attempt > 0) {
        return func();
      }
    } catch (e) {
      return retry(func, attempt - 1)();
    }
    return null;
  };
}


/**
 * Returns the logging wrapper for the specified method,
 * Logger has to log the start and end of calling the specified function.
 * Logger has to log the arguments of invoked function.
 * The format of output log is:
 * <function name>(<arg1>, <arg2>,...,<argN>) starts
 * <function name>(<arg1>, <arg2>,...,<argN>) ends
 *
 *
 * @param {Function} func
 * @param {Function} logFunc - function to output log with single string argument
 * @return {Function}
 *
 * @example
 *
 * const cosLogger = logger(Math.cos, console.log);
 * const result = cosLogger(Math.PI));     // -1
 *
 * log from console.log:
 * cos(3.141592653589793) starts
 * cos(3.141592653589793) ends
 *
 */
function logger(func, logFunc) {
  return (...args) => {
    logFunc(`${func.name}(${args.map((el) => JSON.stringify(el))}) starts`);
    const res = func(...args);
    logFunc(`${func.name}(${args.map((el) => JSON.stringify(el))}) ends`);
    return res;
  };
}


/**
 * Return the function with partial applied arguments
 *
 * @param {Function} fn
 * @return {Function}
 *
 * @example
 *   const fn = function(x1,x2,x3,x4) { return  x1 + x2 + x3 + x4; };
 *   partialUsingArguments(fn, 'a')('b','c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b')('c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c')('d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c','d')() => 'abcd'
 */
function partialUsingArguments(fn, ...args1) {
  return (...args) => fn(...args1, ...args);
}


/**
 * Returns the id generator function that returns next integer starting
 * from specified number every time when invoking.
 *
 * @param {Number} startFrom
 * @return {Function}
 *
 * @example
 *   const getId4 = getIdGenerator(4);
 *   const getId10 = gerIdGenerator(10);
 *   getId4() => 4
 *   getId10() => 10
 *   getId4() => 5
 *   getId4() => 6
 *   getId4() => 7
 *   getId10() => 11
 */
function getIdGeneratorFunction(startFrom) {
  let count = startFrom - 1;
  return () => {
    count += 1;
    return count;
  };
}


module.exports = {
  getComposition,
  getPowerFunction,
  getPolynom,
  memoize,
  retry,
  logger,
  partialUsingArguments,
  getIdGeneratorFunction,
};
