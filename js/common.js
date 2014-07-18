/**
 * @path global/js/common.js
 * 公用函数
 */

(function() {
	/**
	 * table 的相关操作
	 * 	隔行换色
	 * 	鼠标滑过变色
	 * 	鼠标点击变色
	 */
	$.fn.activeTable = function(opts) {
		opts = $.extend( {"hoverClassName": "hover", "selectedClassName" : "selectedTr", "oddClassName" : "gtr", "interval" : true}, opts );
		
		if (opts.interval) {
			$(this).find("tr:even").addClass(opts.oddClassName);
		}
		
		$(this).find("tr").hover( function(e) {
			$(this).addClass(opts.hoverClassName);
		}, function(e) {
			$(this).removeClass(opts.hoverClassName);
		}).click( function(e) {
			$('.' + opts.selectedClassName).removeClass(opts.selectedClassName);
			$(this).addClass(opts.selectedClassName);
		});
	}
})(jQuery);