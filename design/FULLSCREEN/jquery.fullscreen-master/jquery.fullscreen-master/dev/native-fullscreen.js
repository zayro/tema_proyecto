var FullScreenNative = function() {
	FullScreenNative._super.constructor.apply(this, arguments);
	this.exit = $.proxy(native('exitFullscreen'), document);
};

extend(FullScreenNative, FullScreenAbstract, {
	VENDOR_PREFIXES: ['', 'o', 'ms', 'moz', 'webkit'],
	_init: function() {
		FullScreenNative._super._init.apply(this, arguments);
		$(document)
			.bind(this._prefixedString('fullscreenchange'), $.proxy(this._fullScreenChange, this))
			.bind(this._prefixedString('fullscreenerror'), $.proxy(this._fullScreenError, this));
	},
	_prefixedString: function(str) {
		return $.map(this.VENDOR_PREFIXES, function(s) {
			return s + str;
		}).join(' ');
	},
	open: function(elem, options) {
		FullScreenNative._super.open.apply(this, arguments);
		var requestFS = native(elem, 'requestFullscreen');
		requestFS.call(elem);
	},
	exit: $.noop,
	isFullScreen: function() {
		return native('fullscreenElement') !== null;
	},
	element: function() {
		return native('fullscreenElement');
	}
});
