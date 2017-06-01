 var scale = 20;

 function CanvasDisplay(parent, level){

 	this.canvas = document.createElement('canvas');
 	this.canvas.width = Math.min(600, level.width * scale);
 	this.canvas.height = Math.min(450, level.height * scale);
 	parent.appendChild(this.canvas);
 	this.cx = this.canvas.getContext('2d');

 	this.level = level;
 	this.animationTime = 0;
 	this.flipPlayer = false;

 	this.viewport = {
 		left: 0,
 		top: 0,
 		width: this.canvas.width / scale;
 		height: this.canvas.height / scale;
 	};

 	this.drawFrame(0);
 };

 CanvasDisplay.prototype.clear = function(){
 	this.canvas.parentNode.removeChild(this.canvas);
 };

 CanvasDisplay.prototype.drawFrame = function(){

 	this.animationTime += step;
 	this.updateViewport();
 	this.clearDisplay();
 	this.drawBackground();
 	this.drawActors();

 };

 CanvasDisplay.prototype.updateViewport = function(){
 	var view = this.viewport;
 	var margin = view.width / 3;
 	var player = this.level.player;
 	var center = player.pos.plus(player.size.times(0.5));

 	if(center.x < view.left + margin){

 		view.left = Math.max(center.x - margin , 0);

 	}else if(center.x > view.left + view.width - margin){
 		view.left = Math.min(center.x - view.width + margin , this.level.width - view.width );
 	}

 	if(center.y < view.top - margin){
 		view.top = Math.max( center.y - margin, 0);

 	}else if(center.y > view.top + view.height - margin){
 		view.top = Math.min( center.y - view.height + margin, this.level.height - view.height);
 	}

 };

 CanvasDisplay.prototype.clearDisplay = function(){
 	if(this.level.status == 'won')
 		this.cx.fillStyle = "rgb(68, 191, 255)"; 
 	else if (this.level.status == "lost") 
 		this.cx.fillStyle = "rgb(44, 136, 214)"; 
 	else 
 		this.cx.fillStyle = "rgb(52, 166, 251)"; 
 	this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
 }

 var otherSprites = document.createElement('img');
 otherSprites.src = 'img/sprites.png';

 CanvasDisplay.prototype.drawBackground = function(){

 	var view = this.viewport;
 	var xStart = Math.floor(view.left);
 	var xEnd = Math.ceil(view.left + view.width);
 	var yStart = Math.floor(view.top);
 	var yEnd = Math.ceil(view.top + view.height);

 	for(var y = yStart ; y < yEnd; y++){
 		for(var x = xStart ; x < xEnd; x++){

 			var tile = this.level.grid[y][x];
 			if(tile == null) continue;
 			var screenX = (x - view.left) * scale;


 		}
 	}

 	var table = elt('table', 'background');
 	table.style.width = this.level.width * scale + 'px';

 	this.level.grid.forEach(function(row){

  var rowElt = table.appendChild(elt('tr'));
  rowElt.style.height = scale + 'px';

  row.forEach(function(type){
  	rowElt.appendChild(elt('td', type));
  });
 	});

 	return table;
 };
 
 function elt(name, className){

 	var elt = document.createElement(name);
 	if(className)
  elt.className = className;
 	return elt;
 };

 DOMDisplay.prototype.drawActors = function(){

 	var wrap = elt('div');
 	this.level.actors.forEach(function(actor){

  var rect = wrap.appendChild(elt('div', 'actor ' + actor.type));
  rect.style.width = actor.size.x * scale + 'px';
  rect.style.height = actor.size.y * scale + 'px';
  rect.style.left = actor.pos.x * scale + 'px';
  rect.style.top = actor.pos.y * scale + 'px';

 	});

 	return wrap;
 };

 
 