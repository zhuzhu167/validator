(function(global, factory, plug) {
	// 告诉javascript引擎这是一个函数表达式，不是函数声明
	return factory.call(global, global.jQuery, plug); // call 重定义this的作用域
})(typeof window !== undefined ? window : this, function($, plug) {
	// $.fn.method()=function(){}的调用把方法扩展到了对象的prototype上
	var __DFFS__ = {
		raise: "change"
	};
	
	var __RULES__ = {
		"require": function() {
			return !!this.val();
		}
	};

	$.fn[plug] = function(ops) {
		this.each(function() {
			var $this = $(this);
			console.log($this)
			// 合并 $this 和 ops，修改并返回 $this。
			$.extend($this, ops);
			$this.raise = $this.data("bv-raise") || $this.raise || __DEFF__.raise;
			var $field = $this.find("[data-bv=true]");
			$field.on($this.raise, function() {
				var $field = $(this);
				var $group = $field.parents(".form-group").removeClass("has-success has-error");
				$field.siblings("span").text("");
				var result = true,
					error = null;
				$.each(__RULES__, function(rule, valid) {
					if ($field.data("bv-" + rule)) {
						result = valid.call($field);
						if (!result) {
							error = $field.data("bv-" + rule + "-error");
							$field.siblings("span").text(error);
							return false;
						}
					}
				});
				$group.addClass(result ? "has-success" : "has-error");
			});
			$this.on("submit",function(){
				$field.trigger($this.raise);
				return false
			})
		});
	}
}, "bootstrapValidator");
