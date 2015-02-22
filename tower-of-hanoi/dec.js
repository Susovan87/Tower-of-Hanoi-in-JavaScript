define(["jquery"], function($) {
	'use strict';

	var Dec = function(id, config){
		config = config || {};
		this.id = id;
		this.color = config.color || 'lightblue';
		this.width = config.width || 200;
		this.height = config.height || 10;
		this.text = config.text || '';
		this.containerHeight = config.containerHeight;
		this.pegShift = config.pegShift;

		this.left = 0;
		this.top = 0;
	}
	Dec.prototype.render = function () {
		var ele = document.createElement("div");
		ele.setAttribute("class","dec");
        
        this.$el = $(ele);
        this.$el.text(this.text)
        	.height(this.height)
	        .width(this.width)
	        .css('background-color', this.color)
	        .css('position','absolute')
	        .css({top: this.top, left: this.left})
	        .css('position','absolute')
	        .css('z-index',1)
	        .css('text-align','center')
	        .css('font-weight','bold')
	        .css('border-radius','10px');

	    return this;
	}
	Dec.prototype.put = function (peg) {
		this.top = this.containerHeight - ((peg.decs.length+1)*this.height);
		this.left = (this.pegShift*((peg.id*2)+1)) - (this.width/2);
		peg.add(this);
		if(this.$el){
			this.$el.css({top: this.top, left: this.left});
		}
	}
	Dec.prototype.move = function (peg, callback) {
		this.top = this.containerHeight - ((peg.decs.length+1)*this.height);
		this.left = (this.pegShift*((peg.id*2)+1)) - (this.width/2);
		peg.add(this);

		this.$el
			.animate({top: (peg.topMargin-(this.height*1.5))+'px'}, "slow")
			.animate({left: this.left+'px'}, "slow")
			.animate({top: this.top+'px'}, "slow", callback);
	}

	return Dec;
});