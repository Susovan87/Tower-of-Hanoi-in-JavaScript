define([], function() {
	var recursive_solver = function (n, from, to , via)
	{
		if (n==0) return;
		recursive_solver.call(this, n-1, from, via , to);
		this.moveList.push([from,to]);
		recursive_solver.call(this, n-1, via, to , from);
	}

	return function (n, from, to , via) {
		if(!n) throw 'number of disk must be provided.'

		from = from || 0;
		to = to || 2;
		via = via || 1;
		this.moveList = [];
		this.solve = function(){
			recursive_solver.call(this,n,from,to,via);
			return this.moveList;
		}
	}
});