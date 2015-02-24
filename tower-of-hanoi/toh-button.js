define(['jquery'], function($) {
	'use strict';

	var bindHover = function(){
		this.$el.on('hover', function(){
		   $(this).css("color", "#2F4F4F");
		 }, function(){
		   $(this).css("color", "#808080");
		 });
	};

	var unbindHover = function(){
		this.$el.unbind('mouseenter mouseleave');
	};

	var bindClick = function(){
		var that = this;
		this.$el.click(function(){
			console.log('clicked '+this.id);
			$(that).trigger('click', [this.id]);
		});
	};

	var unbindClick = function(){
		this.$el.unbind("click");
	};

	var ToHButton = function(id, config){
		this.id = id;
		config = config || {};
		this.css = 'glyphicon ' + config.css;
	};

	ToHButton.prototype.render = function(){
		var ele = document.createElement("span");
		ele.setAttribute("class",this.class);

		this.$el = $(ele);
		this.$el.attr('aria-hidden','true')
			.css('margin',  '0 5px');

		this.enable();

		return this;
	};

	ToHButton.prototype.enable = function(){
		this.$el.css('color','inherit');
		bindHover.call(this);
		bindClick.call(this);
	};

	ToHButton.prototype.enable = function(){
		this.$el.css('color','#D3D3D3');
		unbindHover.call(this);
		unbindClick.call(this);
	};

	return ToHButton;
});