(function($) {
	var $scrollTo = $.scrollTo = function(target, duration, settings) {
			$(window).scrollTo(target, duration, settings);
		};
	$scrollTo.defaults = {
		axis: 'y',
		duration: 1
	};
	$scrollTo.window = function(scope) {
		return $(window).scrollable();
	};
	$.fn.scrollable = function() {
		return this.map(function() {
			var win = this.parentWindow || this.defaultView,
				elem = this.nodeName == '#document' ? win.frameElement || win : this,
				doc = elem.contentDocument || (elem.contentWindow || elem).document,
				isWin = elem.setInterval;
			return elem.nodeName == 'IFRAME' || isWin && $.browser.safari ? doc.body : isWin ? doc.documentElement : this;
		});
	};
	$.fn.scrollTo = function(target, duration, settings) {
		if(typeof duration == 'object') {
			settings = duration;
			duration = 0;
		}
		if(typeof settings == 'function') settings = {
			onAfter: settings
		};
		settings = $.extend({}, $scrollTo.defaults, settings);
		duration = duration || settings.speed || settings.duration;
		settings.queue = settings.queue && settings.axis.length > 1;
		if(settings.queue) duration /= 2;
		settings.offset = both(settings.offset);
		settings.over = both(settings.over);
		return this.scrollable().each(function() {
			var elem = this,
				$elem = $(elem),
				targ = target,
				toff, attr = {},
				win = $elem.is('html,body');
			switch(typeof targ) {
			case 'number':
			case 'string':
				if(/^([+-]=)?\d+(px)?$/.test(targ)) {
					targ = both(targ);
					break;
				}
				targ = $(targ, this);
			case 'object':
				if(targ.is || targ.style) toff = (targ = $(targ)).offset();
			}
			$.each(settings.axis.split(''), function(i, axis) {
				var Pos = axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					Dim = axis == 'x' ? 'Width' : 'Height',
					dim = Dim.toLowerCase();
				if(toff) {
					attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
					if(settings.margin) {
						attr[key] -= parseInt(targ.css('margin' + Pos)) || 0;
						attr[key] -= parseInt(targ.css('border' + Pos + 'Width')) || 0;
					}
					attr[key] += settings.offset[pos] || 0;
					if(settings.over[pos]) attr[key] += targ[dim]() * settings.over[pos];
				} else attr[key] = targ[pos];
				if(/^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max(Dim));
				if(!i && settings.queue) {
					if(old != attr[key]) animate(settings.onAfterFirst);
					delete attr[key];
				}
			});
			animate(settings.onAfter);

			function animate(callback) {
				$elem.animate(attr, duration, settings.easing, callback &&
				function() {
					callback.call(this, target, settings);
				});
			};

			function max(Dim) {
				var attr = 'scroll' + Dim,
					doc = elem.ownerDocument;
				return win ? Math.max(doc.documentElement[attr], doc.body[attr]) : elem[attr];
			};
		}).end();
	};

	function both(val) {
		return typeof val == 'object' ? val : {
			top: val,
			left: val
		};
	};
})(jQuery);