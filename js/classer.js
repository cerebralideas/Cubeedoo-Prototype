/*
 * Classer function for adding and removing classes.
 *
 * NOT BEING USED AT THE MOMENT
 *
 * NOTE: No need to use the *new* operator. Just call the
 * function with 'classer(DOM-element)' and chain
 * addClass('class') or removeClass('class') to the
 * object.
 */

(function (global) {

	function Classer(els) {

		this.els = els;
	}

	Classer.prototype = {

		constructor: Classer,

		addClass: function (className) {

			for (var i = 0; i < this.els.length; i++) {

				this.els[i].className = this.els[i].className + ' ' + className
			}
		},

		removeClass: function (className) {

			for (var i = 0; i < this.els.length; i++) {

				this.els[i].className = this.els[i].className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
			}
		}
	};

	var classer = function (els) {
		return new Classer(els);
	};

	return global.classer = classer;

}(this));