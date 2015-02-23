define(["jquery"], function($) {
	'use strict';
	
	var Peg = function(id, config){
		this.id = id;
		config = config || {};
		this.width = config.width || 10;
		this.height = config.height || 200;
		this.color = config.color || 'gray';
		this.sideMargin = config.sideMargin || this.height;
		this.topMargin = config.topMargin || this.height;
		this.disks = [];
	}
	Peg.prototype.add = function(peg){
		this.disks.push(peg);
	}
	Peg.prototype.remove = function(){
		return this.disks.pop();
	}
	Peg.prototype.render = function(){
		var ele = document.createElement("div");
		ele.setAttribute("class","peg");

		this.$el = $(ele);
		this.$el
			.width(this.width)
			.height(this.height)
			.css('display','inline-block')
			.css('background-color', this.color)
			.css('margin', this.topMargin+'px '+this.sideMargin+'px 0 '+this.sideMargin+'px')
		return this;
	}

	return Peg;
});