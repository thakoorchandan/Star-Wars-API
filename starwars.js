var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');

myCanvas.width = innerWidth;
myCanvas.height = innerHeight;

window.onresize = function(){
  myCanvas.width = innerWidth;
	myCanvas.height = innerHeight;
};

var Star = function(){
  this.myX = Math.random() * innerWidth;
  this.myY = Math.random() * innerHeight;
  this.myColor = 0;
};

var xMod = 0;
var yMod = 0;
var warpSpeed = 0;

document.onkeydown = function(event) {
  if (!event)
    event = window.event;
  var code = event.keyCode;
  if (event.charCode && code == 0)
    code = event.charCode;
  switch(code) {
    case 32:
      warpSpeed = 1;
      break;
    case 37:
      xMod < 6 ? xMod += 0.3 : xMod = 6;
      break;
    case 38:
      yMod < 6 ? yMod += 0.3 : yMod = 6;
      break;
    case 39:
      xMod > -6 ? xMod -= 0.3 : xMod = -6;
      break;
    case 40:
      yMod > -6 ? yMod -= 0.3: yMod = -6;
      break;
  }

};
document.onkeyup = function(event) {
  if (!event)
    event = window.event;
  var code = event.keyCode;
  if (event.charCode && code == 0)
    code = event.charCode;
  switch(code) {
    case 32:
      warpSpeed = 0;
      break;
    case 37:
      xMod = 0.5;
      break;
    case 38:
      yMod = 0.5;
      break;
    case 39:
      xMod = 0.5;
      break;
    case 40:
      yMod = 0.5;
      break;
  }
  event.preventDefault();
};
document.onmousedown = function(event) {
  warpSpeed = 1;
};
document.onmouseup = function(event) {
  warpSpeed = 0;
};

Star.prototype.updatePos = function(){
  var speedMult = 0.009;
  if (warpSpeed) { speedMult = 0.010; }
	this.myX += xMod + (this.myX - (innerWidth/2.1)) * (speedMult);
	this.myY += yMod + (this.myY - (innerHeight/2.1)) * (speedMult);
  this.updateColor();
  
  if (this.myX > innerWidth || this.myX < 0) {
    this.myX = Math.random() * innerWidth;
    this.myColor = 0;
  }
  if (this.myY > innerHeight || this.myY < 0) {
    this.myY = Math.random() * innerHeight;
    this.myColor = 0;
  }
  
};

Star.prototype.updateColor = function(){
  if (this.myColor < 255) {
    this.myColor += 10;
  }
  else {
    this.myColor = 255;
  }
};

var starField = [];
var starCounter = 0;

while (starCounter < 120) {
  var newStar = new Star;
  starField.push(newStar);
  starCounter++;
}

function init() {
  myCanvas.focus();
  window.requestAnimationFrame(draw);
}

function draw(event) {
  if (warpSpeed == 0) {
    ctx.fillStyle = "rgba(0,0,0,0.8)";
		ctx.fillRect(0,0,innerWidth,innerHeight);
  }
  for (var i = 0; i < starField.length; i++) {
    ctx.fillStyle = "rgb(" + starField[i].myColor + "," + starField[i].myColor + "," + starField[i].myColor + ")";
    ctx.fillRect(starField[i].myX,starField[i].myY,starField[i].myColor / 128,starField[i].myColor / 128);
    starField[i].updatePos();
  }
  window.requestAnimationFrame(draw);
}

init();