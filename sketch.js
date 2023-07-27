var ballon,ballonImage1,ballonImage2;
var database, height;


function preload(){
   bg =loadImage("Images/cityImage.png");
   ballonImage1=loadAnimation("Images/HotAirBallon01.png");
   ballonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }


function setup() {
 //chamar db aqui
  database = firebase.database(); 
   
  createCanvas(1500,700);

  ballon=createSprite(250,650,250,650);
  ballon.addAnimation("hotAirballon",ballonImage1);
  ballon.scale=0.5;

  //bd
  var ballonHeight = database.ref('ballon/height'); 
   ballonHeight.on("value", readHeight,showError);
   textSize(20); 
}

// função para exibir a interface do usuário
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
   //imagem e direção do movimento
   updateHeight(-10,0)
  }
   
  else if(keyDown(RIGHT_ARROW)){
   updateHeight(10,0)
    ballon.addAnimation("hotAirBallon",ballonImage2);
  }
   
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    ballon.scale=ballon.scale -0.005;
    ballon.addAnimation("hotAirBallon",ballonImage2);
  }
   
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10)
    ballon.addAnimation("hotAirBallon",ballonImage2);
    ballon.scale=ballon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);

}


//função updateHeight
function updateHeight(x,y){
database.ref("ballon/height").update({
  'x': height.x + x, 
  'y': height.y + y
   

});

}

function readHeight(data){
 // adicionar propriedades dessa função
 height = data.val();
 ballon.x = height.x;
 ballon.y = height.y;
}

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
