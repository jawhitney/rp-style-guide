// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame ||
			function(callback, element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

// https://gist.github.com/joelambert/1002116#gistcomment-1953925
/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
window.requestInterval = function(fn, delay, ...args) {
	if (!window.requestAnimationFrame) {
        return window.setInterval(fn, delay, args);
    }

	var start = new Date().getTime(),
		handle = {};

	function loop() {
		var current = new Date().getTime(),
			delta = current - start;

		if (delta >= delay) {
			fn.call(this, args);
			start = new Date().getTime();
		}

		handle.value = requestAnimFrame(loop);
	}

	handle.value = requestAnimFrame(loop);

	return handle;
};

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestInterval = function(handle) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(handle.value);
     } else {
         clearInterval(handle);
     }
};

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

window.requestTimeout = function(fn, delay) {
	if (!window.requestAnimationFrame) {
        return window.setTimeout(fn, delay);
    }

	var start = new Date().getTime(),
		handle = {};

	function loop(){
		var current = new Date().getTime(),
			delta = current - start;

		if (delta >= delay) {
            fn.call();
        } else {
            handle.value = requestAnimFrame(loop);
        }
	}

	handle.value = requestAnimFrame(loop);

	return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function(handle) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(handle.value);
     } else {
         clearTimeout(handle);
     }
};
