// @name           add auth info
// @description    脚本的目的方便的添加作者信息
// @auth           break
// @link           http://www.shizuwu.cn
(function() {
	$.extend({
		//插入样式
		insertCss: function(cssText) {
			var cssNode = $.createElm('style', $("head").get(0));
			cssNode.type = 'text/css';
			cssNode.innerHTML = cssText;
		},
		//创建元素
		createElm: function(tagname, destin) {
			var theElem = destin.appendChild(document.createElement(tagname));
			return theElem;
		}
	});

	$.fn.GLO = {
		"AUTH": '<div class="button_wrap"><div class="buttons"><a href="http://www.shizuwu.cn/about" target="_blank">关于作者</a><a href="http://www.shizuwu.cn/hire" target="_blank">找我帮忙</a></div><a id="slidebttn">ME</a></div>',
		"authCss": '.button_wrap{position:fixed;z-index:33;width:165px;height:30px;bottom:10px;right:50px;overflow:hidden; font-size:12px;}.buttons{width:30px;height:30px;border-radius:30px;background-color:#000;color:#fff;top:0px;right:0px;position:absolute;line-height:30px;text-align:left}div.buttons a{color:#fff;display:none; margin:0px 10px; text-decoration:none;}.buttons a.holder{display:inline-block;width:30px;height:30px;margin:0px;background-color:#fff;border-radius:30px;color:#000;line-height:30px;text-align:center;cursor:pointer}#slidebttn{width:28px;height:28px;background-color:#000;border-radius:28px;color:#fff;position:absolute;top:1px;right:1px;text-transform:uppercase;line-height:30px;text-align:center;cursor:pointer}'
	};

	$(function() {
		//底部“关于作者”
		var ot;
		$("body").append($.fn.GLO.AUTH);
		$.insertCss($.fn.GLO.authCss);

        $('#slidebttn').hover(
			function () {
				clearTimeout(ot);
				var $this 		= $(this);
				var $slidelem 	= $this.prev();
				$slidelem.stop().animate({'width':'165px'},300);
				$slidelem.find('a').stop(true,true).fadeIn();
				$this.css({"background":'#fff', "color":'#000'});
			},
			function (e) {
				ot = setTimeout(outHandler, 250);
			}
		).click(function() {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
		});
		$(".buttons").hover(function() {
			clearTimeout(ot);
		}, function() {
			ot = setTimeout(outHandler, 250);
		})

        function outHandler() {
        	var $this 		= $('#slidebttn');
			var $slidelem 	= $this.prev();
			$slidelem.stop().animate({'width':'30px'},200);
			$slidelem.find('a').stop(true,true).fadeOut();
			$this.css({"background":'#000', "color":'#fff'});
        }
	});
})();