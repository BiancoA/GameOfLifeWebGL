'use strict';
var PlayGround ={
	initGrid : function(N) {
		if(N>1){
			this.N=N;	
			for (var i = 0; i < N; i++) {
				this.grid[i] = [];
				for (var j = 0; j < N; j++) {
					this.grid[i][j] = 0;
				}

			}
			this.isgridset=true;
			return true;
		}else {
			this.isgridset=false;
			return false;
		}

	},
	
	
	setSeed :  function() {
		var h = Math.floor(this.N / 2);
		var l=29;
		if(h>3){
			this.grid[h][h - 1] = 2;
			this.grid[h][h] = 2;
			this.grid[h][h + 1] = 2;
			this.grid[h - 1][h] = 2;
			this.grid[h + 1][h - 1] = 2;
			
			this.grid[h + 10][h - 10] = 2;
			this.grid[h + 11][h - 10] = 2;
			this.grid[h + 11][h - 9] = 2;
			//this.grid[h + 11][h - 11] = true;
			this.grid[h + 12][h - 10] = 2;
			
			this.grid[l+2][l + 11] = 2;
			this.grid[l+2][l + 10] = 2;
			this.grid[l+2][l + 9] = 2;
			this.grid[l+3][l + 9] = 2;
			this.grid[l+3][l + 12] = 2;
			this.grid[l+4][l + 9] = 2;
			this.grid[l+5][l + 9] = 2;
			this.grid[l+6][l + 10] = 2;
			this.grid[l+6][l + 12] = 2;
			
			
			
			this.isseedset=true;
			return true;
		}else {
			this.isseedset=false;
			return false;
		}
	},
	
	step: function() {
		var iminus,iplus,jminus,jplus;
		var gridold = [];
		for (var i = 0; i < this.grid.length; i++)
		    gridold[i] = this.grid[i].slice();
		
		var neighbours = 0;
		if(this.isgridset && this.isseedset){
			for (var i = 0; i < this.N ; i++) {
				for (var j = 0; j < this.N ; j++) {
					neighbours = 0;
					//this.grid[i][j]=false;
					//check the neighbours

					
					//periodic boundary condition
					if(i===0){
						iminus=this.N-1;
						
						iplus=i +1;	
					}else if(i===this.N-1){
						iminus=i - 1;
						
						iplus=0;	
					}else{
						iminus=i - 1;
						
						iplus=i +1;	
					}
					
					if(j===0){
						jminus=this.N-1;
						
						jplus=j +1;
					}else if(j===this.N-1){
						jminus=j - 1;
						
						jplus=0;
					}else{
						jminus=j - 1;
						
						jplus=j +1;
					}
															
					if (gridold[iminus][jminus]===2) neighbours++;
					if (gridold[i][jminus]===2) neighbours++;
					if (gridold[iplus][jminus]===2) neighbours++;

					if (gridold[iminus][j]===2) neighbours++;
					if (gridold[iplus][j]===2) neighbours++;

					if (gridold[iminus][jplus]===2) neighbours++;
					if (gridold[i][jplus]===2) neighbours++;
					if (gridold[iplus][jplus]===2) neighbours++;

					//cell survives if it has 2 or 3 neighbours 
					//cell is born if it has 3 neighbours
					//Otherwise, a cell dies or remains dead
					//if(neighbours>1) console.log(neighbours)
					
					if(neighbours===3){
						this.grid[i][j]=2;
						//console.log(i,j)
					}else if((neighbours === 2) && (gridold[i][j]===2) ){ 
						this.grid[i][j]=2;
					}else{
						if(gridold[i][j]===2){
							this.grid[i][j]=1;
						}else{
							this.grid[i][j]=0;
						}
					}
				}
			}
		}
	}
};

var PlayGround_property = {
	N:{
		value: 40,
		writable:true
	},
	grid:{
		value: [],
		writable:true
	},

	isgridset:{
		value: false,
		writable:true
	},
	isseedset:{
		value: false,
		writable:true
	}

}
