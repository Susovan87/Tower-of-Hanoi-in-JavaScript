define(['jquery','./peg','./disk'], function($,Peg,Disk) {
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
		
		var diskConfig = config.disk || {}
		this.diskCount = diskConfig.count || 3;
		this.processDiskColor(diskConfig.color);
		this.processDiskText(diskConfig.text);
		this.diskMaxWidth = diskConfig.maxWidth || 200;
		this.diskMinWidth = diskConfig.minWidth || 100;
		this.diskHeight = diskConfig.height || 20;

		var pegConfig = config.peg || {}
		this.pegWidth = pegConfig.width || 10;
		this.pegHeight = pegConfig.height || Math.min((this.diskCount*this.diskHeight)*1.5, (this.diskCount+3)*this.diskHeight);

		this.containerWidth = (this.diskMaxWidth + this.pegWidth)*3;
		this.containerHeight = this.pegHeight*1.5 + this.diskHeight*1.5;

		pegConfig = {
			height:this.pegHeight,
			width:this.pegWidth,
			sideMargin:(this.diskMaxWidth/2),
			topMargin:this.containerHeight-this.pegHeight
		};
		this.pegs = [new Peg(0, pegConfig), new Peg(1, pegConfig), new Peg(2, pegConfig)];

	}
	ToHUI.prototype.processDiskText = function(text){
		var textArray = ['','']
		if(isArray(text)){
			this.diskText = generateArray(text,this.diskCount);
		}else if(text){
			this.diskText = generateArray([text],this.diskCount);
		}else{
			this.diskText = generateArray(textArray,this.diskCount);
		}
	}
	ToHUI.prototype.processDiskColor = function(diskColor){
		var colorArr = ['#CC3300','#CC9933','#CC6633','#999933','#9966FF','#00CCFF'];
		if(isArray(diskColor)){
			this.diskColor = generateArray(diskColor,this.diskCount);
		}else{
			this.diskColor = generateArray(colorArr,this.diskCount);
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
			
		var disks = [];
		for (i = 0; i < this.diskCount; i++) { 
		    var disk = new Disk(i, {
		    	color: this.diskColor[i],
		    	width: this.diskMaxWidth-((this.diskMaxWidth-this.diskMinWidth)/this.diskCount*(i+1)),
		    	height: this.diskHeight,
		    	text: this.diskText[i],
		    	containerHeight: this.containerHeight,
		    	pegShift: (this.diskMaxWidth+this.pegWidth)/2
		    });
			disk.put(this.pegs[0]);
			this.$container.append(disk.render().$el)
			disks.push(disk);
		}
	}
	ToHUI.prototype.moveDisk = function(from, to, callback){
		this.pegs[from].remove().move(this.pegs[to], callback);
	};	
	ToHUI.prototype.runMoves = function(list, callback){
		var moveNext = function(){
			var next = list.shift();
			if(next){
				this.moveDisk(next[0],next[1],moveNext.bind(this));
			}else{
				if(callback) callback();
			}
		}
		moveNext.call(this);
	};

	return ToHUI;
});