//设置绘图环境
var chessBoard = [];
//人工控制的黑棋子
var me = true;
//表示棋还没分出胜负，还在继续下棋！
var over = false;
//设置赢法数组三维数组（及三种赢法横向、斜向、竖向）
var wins = [];
//人工赢法的统计数组
var myWin = [];
//电脑赢法的统计数组
var computerWin = [];
for(var i=0;i<15;i++){
	wins[i] = [];
	for(var j=0;j<15;j++){
		wins[i][j] = [];
	}
}
//赢法种类索引
var count =0;
//横线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//斜线赢法
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线赢法
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
//console.log(count);

for(var i=0;i<count;i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}






var chess = document.getElementById('chess');
var context = chess.getContext('2d');
for(var i=0;i<15;i++){
	 chessBoard[i] = [];
	 for(var j=0;j<15;j++){
	 	chessBoard[i][j] = 0;
	 }
}
context.strokeStyle = '#BFBFBF';

var logo = new Image();
logo.src = "images/xin1.gif";
logo.onload = function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();
}
//绘制棋盘
var drawChessBoard = function(){
	for(var i=0;i<15;i++){
		//绘制横线
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		//描边
		context.stroke();
		//绘制纵线
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
	}
};
////绘制对角线
//context.moveTo(0,0);
//context.lineTo(450,450);
//context.stroke();
////

var oneStep = function(i,j,me){
	//开始绘画的路径
	context.beginPath();
	//绘制圆形
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	//创建渐变对象
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	//设置颜色
	if(me){//如果是黑色棋子
		gradient.addColorStop(0,"#0A0A0A");//0代表百分比
		gradient.addColorStop(1,"#636766");
	}else{//如果是白色棋子
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	
	//渐变色
	context.fillStyle = gradient;
	//填充颜色
	context.fill();
};

chess.onclick = function(e){
	//如果下棋结束，就终止！
	if(over){
		return;
	}
	//如果不是自己下棋，就终止！
	if(!me){
		return;
	}
	//获取棋盘上鼠标位置
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j] == 0){
		oneStep(i,j,me);
		chessBoard[i][j] = 1;
		for(var k=0;k<count;k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] == 5){
					console.log(2)
					window.alert("恭喜！您赢了！");
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
			computerAI();
		}
	}	
}


var computerAI = function(){
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0, v = 0;
	for(var i=0;i<15;i++){
		myScore[i] = [];
		computerScore[i] = [];
		for(var j=0;j<15;j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	//遍历棋盘
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j] == 0){
				for(var k=0;k<count;k++){
					if(wins[i][j][k]){
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}
						
						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerScore[i][j] += 2100;
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v] = 2;
	for(var k=0;k<count;k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				window.alert("您！输了！刷新再来一局吧！");
				over = true;
			}
		}
	}
	if(!over){
		me = !me;
	}
}
