//Main
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let xBird;
let widthPipe;
const mediaXs = window.matchMedia('(min-width: 440px)');
const mediaSm = window.matchMedia('(min-width: 500)');
const mediaMd = window.matchMedia('(min-width: 576px)');
const mediaLg = window.matchMedia('(min-width: 768px)');
const mediaXl = window.matchMedia('(min-width: 992px)');
mediaXs.addListener(mediaQuery);
mediaSm.addListener(mediaQuery);
mediaMd.addListener(mediaQuery);
mediaLg.addListener(mediaQuery);
mediaXl.addListener(mediaQuery);
mediaQuery();
function mediaQuery() {
  if (mediaXl.matches) {
    canvas.setAttribute("width","800px");
    xBird = 250;
    widthPipe = 110;
  }else if(mediaLg.matches){
    canvas.setAttribute("width","650px");
    xBird = 200;
    widthPipe = 100;
  }else if(mediaMd.matches){
    canvas.setAttribute("width","550px");
    xBird = 150;
    widthPipe = 80;
  }else if(mediaSm.matches){
    canvas.setAttribute("width","480px");
    xBird = 120;
    widthPipe = 70;
  }else if(mediaXs.matches){
    canvas.setAttribute("width","400px");
    xBird = 100;
    widthPipe = 60;
  } else {
    canvas.setAttribute("width","400px");
    xBird = 100;
    widthPipe = 60;
  }
}

start();
function start(){
  const bird = new Bird(xBird, 100, ctx);
  const Pipes = [];
  let pipeSet = generateRandomPipe(ctx, canvas.width, canvas.height);
  Pipes.push(pipeSet.top, pipeSet.bottom);
  setInterval(() => {
    let pipeSet = generateRandomPipe(ctx, canvas.width, canvas.height);
    Pipes.push(pipeSet.top, pipeSet.bottom);
  }, 2600);

  gameLoop();
  function gameLoop(){
    canvas.width = canvas.width; 
    bird.update(Pipes);
    if (!bird.dead){
      Pipes.forEach(function(pipe1){
        pipe1.update();
      });
    }
    Pipes.forEach(function(pipe1){
      pipe1.render();
    });
    bird.render();
    if (bird.dead){
      if (bird.y > 425) {        
        if (window.confirm("¿Deseas volver a intentar?\n")) {
          drawGameOver();
          return false;
        }
      }
    }
    window.requestAnimationFrame(gameLoop);
  }
}

function generateRandomPipe(ctx, canvasWidth, canvasHeight){
  let lengthTop = Math.round(Math.random() * 200 + 50);
  let lengthBottom = canvasHeight - 200 - lengthTop;
  let returnVal = {};
  let colorIndex = Math.floor(Math.random() * (colorObstacles.length - 0)) + 0;
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, widthPipe, colorIndex, ctx);
  returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, widthPipe, colorIndex, ctx);
  return returnVal;
}


function changeEpilepticMode(){
  var showEpilepticMode = document.getElementById("epilepticMode");
  if (epilepticMode) {
    console.log("Modo saludable");
    showEpilepticMode.classList.replace("btn-danger", "btn-secondary");
    epilepticMode = false;
    canvas.setAttribute("style","background-color: #E3F2FD");
  }else{
    console.log("Nooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo O.o!!!!");
    showEpilepticMode.classList.replace("btn-secondary", "btn-danger");
    epilepticMode = true;
  } 
}

function drawGameOver(){
  console.log('Pediste :( !!!!');
  start();
  point = 0;
}

