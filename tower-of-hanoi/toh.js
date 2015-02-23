define(["underscore","jquery","./toh-core","./toh-ui"], function(_,$,Core,UI) {
	'use strict';

	var ToH = function(config){
		config = config || {};
		
		config.disk = config.disk || {}
		this.diskCount = config.disk.count = config.disk.count || 3;
		this.core = new Core(this.diskCount);
		this.ui = new UI(config);
		this.moves = this.core.solve();
		this.currMoveIndex = 0;
		this.running = false;
	};

	ToH.prototype.render = function(ele){
		this.ui.render(ele);
	};

	ToH.prototype.next = function(callback){
		if(this.running) throw 'next() can\'t be called while disk is moving';
		if(this.currMoveIndex==this.moves.length-1)
			throw 'no move left to complete'

		this.running = true;
		var currMoveIndex = this.currMoveIndex;
		$(this).trigger('start', [currMoveIndex]);
		this.ui.moveDisk(this.moves[currMoveIndex][0],this.moves[currMoveIndex][1],function(){
			this.running = false;
			$(this).trigger('stop', [currMoveIndex]);
			if(callback) callback();
		}.bind(this));
		this.currMoveIndex++;
	};

	ToH.prototype.prev = function(callback){
		if(this.running) throw 'prev() can\'t be called while disk is moving';
		if(this.currMoveIndex==0)
			throw 'move not started to rewind'

		this.running = true;
		var currMoveIndex = this.currMoveIndex;
		var lastMove = this.moves[currMoveIndex-1];
		$(this).trigger('start', [currMoveIndex*-1]);
		this.ui.moveDisk(lastMove[1],lastMove[0],function(){
			this.running = false;
			$(this).trigger('stop', [currMoveIndex*-1]);
			if(callback) callback();
		}.bind(this));
		this.currMoveIndex--;
	};

	ToH.prototype.runAll = function(callback){
		if(this.running) throw 'next() can\'t be called while disk is moving';
		if(this.currMoveIndex==this.moves.length-1)
			throw 'no move left to complete'

		this.running = true;
		var currMoveIndex = this.currMoveIndex;
		var list = this.moves.slice(currMoveIndex);
		var moveNext = function(){
			var next = list.shift();
			if(next && this.running){
				this.currMoveIndex++;
				this.ui.moveDisk(next[0],next[1],moveNext.bind(this));
			}else{
				this.running = false;
				$(this).trigger('stop', [currMoveIndex]);
				if(callback) callback();
			}
		}

		$(this).trigger('start', [currMoveIndex]);
		moveNext.call(this);
	};

	ToH.prototype.runAllBackward = function(callback){
		if(this.running) throw 'runAllBackward() can\'t be called while disk is moving';
		if(this.currMoveIndex==0)
			throw 'move not started to rewind'

		this.running = true;
		var currMoveIndex = this.currMoveIndex;
		var list = this.moves.slice(0, currMoveIndex);
		var moveNext = function(){
			var next = list.pop();
			if(next && this.running){
				this.currMoveIndex--;
				this.ui.moveDisk(next[1],next[0],moveNext.bind(this));
			}else{
				this.running = false;
				$(this).trigger('stop', [currMoveIndex]);
				if(callback) callback();
			}
		}

		$(this).trigger('start', [currMoveIndex]);
		moveNext.call(this);		
	};

	ToH.prototype.pause = function(){
		if(!this.running) throw 'no move is running';

		this.running = false;
	};

	ToH.prototype.getSolution = function(){
		return this.moves;
	};

	ToH.prototype.getProgress = function(){
		return this.currMoveIndex;
	};

	ToH.prototype.version = function(){
		return '0.0.1, jQuery version is: ' + $.fn.jquery;
	};


	return ToH;
});