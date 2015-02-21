define(["underscore","jquery","./toh-core","./toh-ui"], function(_,$,Core,UI) {
	$(function() {
		var core = new Core(6);
		UI.render([
			{color:'#CC3300', width:290, text:'to live'}
			,{color:'#CC9933', width:260, text:'to satisfy'}
			,{color:'#CC6633', width:230, text:'to overcome'}
			,{color:'#999933', width:200, text:'to create'}
			,{color:'#9966FF', width:170, text:'to learn'}
			,{color:'#00CCFF', width:140, text:'Born'}
		]);

		var moves = core.solve();
		UI.moves(moves);
	});
});