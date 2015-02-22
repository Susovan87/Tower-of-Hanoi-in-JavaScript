define(['jquery','./peg','./dec'], function($,Peg,Dec) {
	'use strict';

	var isArray = function(obj){
		if( Object.prototype.toString.call(obj)==='[object Array]') {
		    return true;
		}
		return false;
	};
	var generateArray = function(currArray, finalLength){
		while (currArray.length < finalLength) {
		    currArray = currArray.concat(currArray);
		}
		return currArray.slice(0,finalLength);
	}

	var ToHUI = function(config){
		config = config || {};
		
		var decConfig = config.dec || {}
		this.decCount = decConfig.count || 3;
		this.processDecColor(decConfig.color);
		this.processDecText(decConfig.text);
		this.decMaxWidth = decConfig.maxWidth || 200;
		this.decMinWidth = decConfig.minWidth || 100;
		this.decHeight = decConfig.height || 20;

		var pegConfig = config.peg || {}
		this.pegWidth = pegConfig.width || 10;
		this.pegHeight = pegConfig.height || (this.decCount*this.decHeight)*1.5;

		this.containerWidth = (this.decMaxWidth + this.pegWidth)*3;
		this.containerHeight = this.pegHeight*1.5 + this.decHeight*1.5;

		pegConfig = {
			height:this.pegHeight,
			width:this.pegWidth,
			sideMargin:(this.decMaxWidth/2),
			topMargin:this.containerHeight-this.pegHeight
		};
		this.pegs = [new Peg(0, pegConfig), new Peg(1, pegConfig), new Peg(2, pegConfig)];

	}
	ToHUI.prototype.processDecText = function(text){
		var textArray = ['','']
		if(isArray(text)){
			this.decText = generateArray(text,this.decCount);
		}else if(text){
			this.decText = generateArray([text],this.decCount);
		}else{
			this.decText = generateArray(textArray,this.decCount);
		}
	}
	ToHUI.prototype.processDecColor = function(decColor){
		var colorArr = ['#CC3300','#CC9933','#CC6633','#999933','#9966FF','#00CCFF'];
		if(isArray(decColor)){
			this.decColor = generateArray(decColor,this.decCount);
		}else{
			this.decColor = generateArray(colorArr,this.decCount);
		}
	}
	ToHUI.prototype.render = function(elm){
		if(elm){
			this.$container = $(elm);
		}else if(!this.$container){
			var ele = document.createElement("div");
        	ele.setAttribute("class","toh-container");
			this.$container = $(ele);
			$('body').append(this.$container);
		}

		this.$container.width(this.containerWidth)
			.height(this.containerHeight)
			.css('background-color','rgba(216, 216, 216, 0.52)')
			.css('position','relative');


		this.$container
			.append(this.pegs[0].render().$el)
			.append(this.pegs[1].render().$el)
			.append(this.pegs[2].render().$el);
			
		var decs = [];
		for (i = 0; i < this.decCount; i++) { 
		    var dec = new Dec(i, {
		    	color: this.decColor[i],
		    	width: this.decMaxWidth-((this.decMaxWidth-this.decMinWidth)/this.decCount*(i+1)),
		    	height: this.decHeight,
		    	text: this.decText[i],
		    	containerHeight: this.containerHeight,
		    	pegShift: (this.decMaxWidth+this.pegWidth)/2
		    });
			dec.put(this.pegs[0]);
			this.$container.append(dec.render().$el)
			decs.push(dec);
		}
	}
	ToHUI.prototype.moveDec = function(from, to, callback){
		this.pegs[from].remove().move(this.pegs[to], callback);
	};	
	ToHUI.prototype.runMoves = function(list, callback){
		var moveNext = function(){
			var next = list.shift();
			if(next){
				this.moveDec(next[0],next[1],moveNext.bind(this));
			}else{
				if(callback) callback();
			}
		}
		moveNext.call(this);
	};

	return ToHUI;
});