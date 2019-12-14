//文字滚动效果
var p = document.getElementsByTagName("p")[0];
setInterval(function(){
    var now = parseInt(getStyle(p,"left"));
    var speed = 1;
    if(now == -300){
        p.style.left = 800 + "px";
    }
    else{
        p.style.left = now - speed + "px";
    }
},20)
// 大轮播图
var box = document.getElementById("box");
var oNavList = box.lastElementChild.children;
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var index = 1;
var isMoving = false;//借鉴tag思想防止在上一个点击开始的定时器没关时，再次点击的效果重叠。
function next(){
    if(isMoving){
        return;
    }
    isMoving = true;
    index++;
    navChange();
    animate(slider,{left:-1200*index},function(){
        if(index > 5){
            slider.style.left = "-1200px";
            index = 1;
        }
        isMoving = false;
    });	
}
var timer = setInterval(next,3000);
function prev(){
    if(isMoving){
        return;
    }
    isMoving = true;
    index--;
    navChange();
    animate(slider,{left:-1200*index},function(){
        if(index < 1){
            slider.style.left = -1200*5 + "px";
            index = 5;
        }
        isMoving = false;
    });
}
// 鼠标划入清除定时器
box.onmouseover = function(){
    animate(left,{opacity:50});
    animate(right,{opacity:50});
    clearInterval(timer);
}
// 鼠标移出恢复定时器
box.onmouseout = function(){
    animate(left,{opacity:0});
    animate(right,{opacity:0});
    timer = setInterval(next, 3000);
}
right.onclick = next;
left.onclick = prev;
//小按钮点击
for(var i=0; i<oNavList.length; i++){
    oNavList[i].idx = i;
    oNavList[i].onclick = function(){
        index = this.idx + 1;
        navChange();
        animate(slider,{left:-1200*index});
    }
}
//小按钮背景色切换
function navChange(){
    for(var i=0; i<oNavList.length; i++){			
        oNavList[i].className = "";
    }
    oNavList[0].className = "first";
    if(index === 6){
        oNavList[0].className = "active";
    }
    else if(index === 0){
        oNavList[4].className = "active";
    }
    else{
        oNavList[index-1].className = "active";
    }
}