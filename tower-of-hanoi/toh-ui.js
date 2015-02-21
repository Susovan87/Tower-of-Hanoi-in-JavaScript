define(["jquery"], function($) {
	var SPIKE_HEIGHT = 200;
	var DISK_HEIGHT = 20;
	var CONTAINER_HEIGHT = 300;
	var SPIKE_WIDTH = 10;

	

	var Spike = function(id){
		this.id = id;
		this.disks = [];
	}
	Spike.prototype.add = function(disk){
		this.disks.push(disk);
	}
	Spike.prototype.remove = function(){
		return this.disks.pop();
	}
	Spike.prototype.render = function(){
		var ele = document.createElement("div");
		ele.setAttribute("id","spike-"+this.id);
        ele.setAttribute("class","spike");
		this.$el = $(ele);
		return this;
	}

	

	var Disk = function(config){
		this.color = config.color || 'lightblue';
		this.width = config.width || 200;
		this.text = config.text || '';

		this.left = 0;
		this.right = 0;
	}
	Disk.prototype.render = function () {
		var ele = document.createElement("div");
        ele.setAttribute("class","disk");
        
        this.$el = $(ele);
        this.$el.text(this.text)
	        .width(this.width)
	        .css('background-color', this.color)
	        .css({top: this.top, left: this.left});

	    return this;
	}
	Disk.prototype.applyStyle = function () {
		this.$el[0].innerHTML=this.text;
        $(this).css({top: this.top, left: this.left});
        $(this).css('background-color', this.color).width(this.width);
    }
	Disk.prototype.put = function (spike) {
		this.top = CONTAINER_HEIGHT - ((spike.disks.length+1)*DISK_HEIGHT);
		this.left = (155*((spike.id*2)+1)) - (this.width/2);
		spike.add(this);

		if(this.$el){
			this.$el.css({top: this.top, left: this.left});
		}
	}
	Disk.prototype.move = function (spike, callback) {
		this.top = CONTAINER_HEIGHT - ((spike.disks.length+1)*DISK_HEIGHT);
		this.left = (155*((spike.id*2)+1)) - (this.width/2);
		spike.add(this);

		this.$el
			.animate({top: '75px'}, "slow")
			.animate({left: this.left+'px'}, "slow")
			.animate({top: this.top+'px'}, "slow", callback);
	}



	var spikes = [];
	var move = function(from, to, callback){
 		spikes[from].remove().move(spikes[to], callback);
	};
	return {
		render : function (disksProp) {
			$('body').append('<div class="hanoi-container"></div>');
			spikes = [new Spike(0), new Spike(1), new Spike(2)];
			$('.hanoi-container')
				.append(spikes[0].render().$el)
				.append(spikes[1].render().$el)
				.append(spikes[2].render().$el);
			
			var disks = [];
			for (i = 0; i < disksProp.length; i++) { 
			    var disk = new Disk(disksProp[i]);
				disk.put(spikes[0]);
				$('.hanoi-container').append(disk.render().$el)
				disks.push(disk);
			}
		},
		move : move.bind(this),
		moves : function(list, callback){
			var moveNext = function(){
				var next = list.shift();
				if(next){
					move.call(this, next[0], next[1], moveNext);
				}else{
					if(callback) callback();
				}
			}
			moveNext();
		}
	}
});