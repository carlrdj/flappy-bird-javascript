
var showEpilepticMode = document.getElementById("epilepticMode");
var canvas = document.getElementById("canvas");
var showPoint = document.getElementById("point");
var showRecord = document.getElementById("record");
var mediaXs = window.matchMedia('(min-width: 440px)');
var mediaSm = window.matchMedia('(min-width: 500)');
var mediaMd = window.matchMedia('(min-width: 576px)');
var mediaLg = window.matchMedia('(min-width: 768px)');
var mediaXl = window.matchMedia('(min-width: 992px)');
mediaXs.addListener(mediaQuery);
mediaSm.addListener(mediaQuery);
mediaMd.addListener(mediaQuery);
mediaLg.addListener(mediaQuery);
mediaXl.addListener(mediaQuery);

var epilepticMode = true;
var point = 0;
if (localStorage.getItem("record") && localStorage.getItem("record") > 0) {
  showRecord.innerHTML = "Mi record<br>" + localStorage.getItem("record") + " Ks";
}
changeEpilepticMode();
function changeEpilepticMode(){
  if (epilepticMode) {
    console.log("Modo saludable");
    showEpilepticMode.classList.replace("btn-danger", "btn-secondary");
    epilepticMode = false;
    canvas.setAttribute("style","background-color: #E3F2FD");
  }else{
    console.log("Nooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo!!!!");
    showEpilepticMode.classList.replace("btn-secondary", "btn-danger");
    epilepticMode = true;
  } 
}
var limit_area_y = canvas.height;
var limit_area_x = canvas.width;
var area = canvas.getContext("2d");

var direction = { UP: 38, SPACEBAR: 32};
var arrow;
var keyPress = false;

var cordYInitial = 100;

var birdWidth = 74;
var birdHeight = 74;

var obstacleWidth = 65;
  
var obstacles = [];

var cordXFinal;
var cordYFinal = cordYInitial;

var colorObstacles = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B','#000000']

function mediaQuery() {
  if (mediaXl.matches) {
  	canvas.setAttribute("width","800px");
    cordXFinal = 100;
    limit_area_x = 800;
  }else if(mediaLg.matches){
  	canvas.setAttribute("width","650px");
    cordXFinal = 70;
    limit_area_x = 650;
  }else if(mediaMd.matches){
  	canvas.setAttribute("width","550px");
    cordXFinal = 45;
    limit_area_x = 550;
  }else if(mediaSm.matches){
  	canvas.setAttribute("width","480px");
    cordXFinal = 20;
    limit_area_x = 480;
  }else if(mediaXs.matches){
  	canvas.setAttribute("width","400px");
    cordXFinal = 20;
    limit_area_x = 400;
  } else {
    cordXFinal = 20;
    limit_area_x = 400;
  }
}

mediaQuery();
gravitygBird();
var speedfallInitial = 34;
var fall = speedfallInitial;


function gravitygBird() { 
  if (arrow) {
    if (fall > 30) { 
      duration = fall = fall - 7; 
    } else if (fall > 5) { 
      duration = fall = fall - 5; } else{ duration = 1; 
    }
  }else{
    duration = 1;
  }
  
  interval = setInterval(function () {
    if (keyPress) {
      birdRise();
    }else{      
      birdFalling();
    }
    clearInterval(interval);
    gravitygBird();
  }, duration);
}
transitionObstacles();

function transitionObstacles() { 
  durationTimeObstacles = 1;  
  intervalTimeObstacles = setInterval(function () {
    reObstacles();
    draw();
    if (obstacles[obstacles.length - 1][0] <= limit_area_x - Math.floor(limit_area_x/3)) {
      generateObstacles();
    }
    clearInterval(intervalTimeObstacles);
    transitionObstacles();
  }, durationTimeObstacles);
}

var img = new Image();
img.src = "flappy-bird.png";
img.onload = function(){ area.drawImage(img, cordXFinal, cordYFinal, birdWidth, birdHeight); }

function birdFalling(){
  if (limit_area_y > cordYFinal) {
    cordYFinal = cordYFinal + 2;
  }
}

function birdRise(){
  if (-birdHeight < cordYFinal) {
    cordYFinal = cordYFinal - 2;
  }
}

document.addEventListener('touchstart', function() {
  keyPress = true;
  arrow = direction.SPACEBAR;
});
document.addEventListener('touchend', function() {
  arrow = "";
  fall = speedfallInitial;
  keyPress = false;  
});


document.addEventListener("keydown", eventKeyDownKeyboard);
document.addEventListener("keyup", eventKeyUpKeyboard);

function eventKeyDownKeyboard(e) {
  switch (e.keyCode) {
    case direction.SPACEBAR:
      keyPress = true;
      arrow = direction.SPACEBAR;
      break;
    case direction.UP:
      keyPress = true;
      arrow = direction.SPACEBAR;
      break;
  }
}

function eventKeyUpKeyboard(e) {
  arrow = "";
  fall = speedfallInitial;
  keyPress = false;
}

generateObstacles();
function generateObstacles(){
  var center = Math.floor(Math.random() * (290 - 80)) + 80;
  var lessMax = birdHeight / 10;
  var lessMin = birdHeight / 30;
  var lessSize = Math.floor(Math.random() * (lessMax - lessMin)) + lessMin;
  var topObstacleX =  limit_area_x ;
  var topObstacleY =  Math.floor(center - (birdHeight - lessSize));
  var bottomObstacleX =  limit_area_x;
  var bottomObstacleY =  Math.floor(center + (birdHeight - lessSize));
  var colorOne = colorObstacles[Math.floor(Math.random() * (colorObstacles.length - 0)) + 0];
  var colorTwo = colorObstacles[Math.floor(Math.random() * (colorObstacles.length - 0)) + 0];
  obstacles.push([topObstacleX, topObstacleY, bottomObstacleX, bottomObstacleY, colorOne]);
}

function reObstacles(){
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i][0] = obstacles[i][0] - 1;
    obstacles[i][2] = obstacles[i][2] - 1;
  }  
}

function collisionCheck(tY, bY){
  if (tY < cordYFinal && bY > cordYFinal + birdHeight) { 
  }else{
    console.log('SE TE MURIO EL PAJARITO :( !!!!');
    alert("Lograste " + point + "Ks\nSigue intentando");
    localStorage.setItem("record", point);
    if (localStorage.getItem("record") > 0) {
      showRecord.innerHTML = "Mi record<br>" + localStorage.getItem("record") + " Ks";
    }
    arrow="";
    cordYFinal = cordYInitial;
    fall = speedfallInitial;
    keyPress = false;
    point = 0;
    showPoint.innerHTML = "0";
    obstacles = [];
    generateObstacles();
  }
}

function verifyPointInCicle(){
  return true;
}

draw();
function draw(){
  if (epilepticMode) {
    canvas.setAttribute("style","background-color: "+ colorObstacles[Math.floor(Math.random() * (colorObstacles.length - 0)) + 0]);
  }
  var color;
  
  canvas.width=canvas.width;
  //Obstacles
  for (var i = 0; i < obstacles.length; i++) {
    if (epilepticMode) {
      color = colorObstacles[Math.floor(Math.random() * (colorObstacles.length - 0)) + 0];
    }else{
      color = obstacles[i][4];
    }

    if (cordXFinal + birdWidth > obstacles[i][0] || cordXFinal - obstacleWidth > obstacles[i][0]) {
      collisionCheck(obstacles[i][1], obstacles[i][3]);
    }
    if (cordXFinal - birdWidth == obstacles[i][0]) {
      showPoint.innerHTML = ++point;
    }
    if (obstacles[i][0] <= -obstacleWidth) {
      obstacles.shift();
    }
    area.fillStyle=color;
    area.fillRect(obstacles[i][0], obstacles[i][1], obstacleWidth, -1010);
    area.fillStyle=color;
    area.fillRect(obstacles[i][2], obstacles[i][3], obstacleWidth, 1010);
  }
  //Bird
  area.drawImage(img, cordXFinal, cordYFinal, birdWidth, birdHeight);
}


