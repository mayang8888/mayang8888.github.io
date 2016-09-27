
//设置绘图环境
var chessBoard = [];
var me = true;

//设置赢发数组
var wins = [];


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
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j] == 0){
		oneStep(i,j,me);6
		if(me){
			chessBoard[i][j] = 1;
		}else{
			//防止在白棋子上再次点击后棋子变成黑色；
			chessBoard[i][j] = 2;
		}
		me = !me;	
	}	
}
