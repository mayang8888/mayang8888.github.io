//右上角导航效果
var t1 = document.querySelectorAll(".text .t1");
var t2 = document.querySelectorAll(".text .t2");
var onoff = true;
for(var i=0;i<t1.length;i++){
	t1[i].index = i
	t1[i].onclick = function(){
		for(var j=0;j<t1.length;j++){
			t1[j].style.top='';
			t2[j].style.top='';
		}
		this.style.top='-40px';
		t2[this.index].style.top='0px';
	}
};
if(onoff){
	setTimeout(function(){
		$('#loading')[0].style.display = 'block';
	},50);
	setTimeout(function(){
		$('#loading')[0].style.display = '';
		$('.nav')[0].style.display = 'block';
		$('#section')[0].style.display = 'block';
	},100);
};
//背景图片轮播
var arr = ['images/2015120154025822.jpg','images/2015120154077711.jpg'];
var num=0;
var timer1 = null;
timer1 = setInterval(function(){
	num++;
	if(num == arr.length){
		num=0;
	}
	//滚动条的到顶部的距离大于window的可视宽度，就清除定时器
	if(window.pageYOffset>window.innerHeight){
		clearInterval(timer1);
	}
	$('#img1').attr("src",arr[num]);
},3000);
//第二页面
//			getComputedStyle(obj)[attr]

window.onscroll=function(){
	if(window.pageYOffset>100){
		changesize_big();
		
		/////屏幕向下滚动，点击问题；
		hidden();
	}else if(window.pageYOffset<100){
		changesize_small();	
		
		/////////////
		hidden();
	}
	if(window.pageYOffset>=300 && window.pageYOffset<=1000){
		$('#page2 .right')[0].style.right = '-0px';
		$('#page2 .right')[0].style.opacity = 1;
		
	}else if(window.pageYOffset<=300 || window.pageYOffset>=1000){
		$('#page2 .right')[0].style.right = '-650px';
		$('#page2 .right')[0].style.opacity = 0.1;
	}
	//console.log( getComputedStyle($('#page2 .right')[0]).right );
	/*console.log( $('#right1').attr('right') );*/
}
function changesize_big(){
	$('.nav').css({
			height:80
		});
		$('.logo-small').css({
			width:50,
			height:50,
		});
		$('#logo div').css({
			marginTop:10
		})
		$('logo-small-text').css({
			width:160,
			height:20
		});
		$('#nav-right').css({
			marginTop:30
		});
		$('.logo-right').css({
			top:30
		})
};
function changesize_small(){
	$('.nav').css({
			height:100
		});
		$('.logo-small').css({
			width:57,
			height:57,
		});
		$('#logo div').css({
			marginTop:20
		})
		$('#nav-right').css({
			marginTop:50
		});
		$('.logo-right').css({
			top:60
		})
};
hidden();
function hidden(){
	var onoff = true;
	var nav_right = $('#nav-right').get(0);	
	$('.logo-right').click(function(){
		
		if(onoff){
			$(this).addClass('rotate');
			nav_right.style.display = 'none';
		}else{
			nav_right.style.display = '';
			$(this).removeClass('rotate');
		}
		onoff = !onoff
	})
}