var TOTAL = 200;
var birds = [];
var pipes = [];
var birdimage;
var upPipe, downPipe;
var back;
var savedBirds = [];
var counter = 0;
let slider;
let saveButton, loadButton;
var generation;

function preload(){
  birdimage = loadImage('bird.png');
  upPipe = loadImage('upPipe.png');
  downPipe = loadImage('downPipe.png');
  back = loadImage('background.png');
}

function setup() {
  createCanvas(600, 600);
  for(var i = 0; i < TOTAL; i++){
    birds[i] = new Bird();
  }
  //bird = new Bird();
  //pipes.push(new Pipe());

  slider = createSlider(1, 50, 1);
  saveButton = createButton('Save Mode');
  saveButton.position(0, height + 30);
  saveButton.mousePressed(saveMode);

  loadButton = createFileInput(handleFile); // to laod mode JSON
  loadButton.position(saveButton.width + 10 , height + 30);
  generation = 1;
}

function draw() {

for(var n = 0; n < slider.value(); n++){
  if (counter % 75 == 0) {
    pipes.push(new Pipe());
    }
  counter++;

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();


  for(var j = birds.length - 1; j >= 0; j-- ){
    if (pipes[i].hits(birds[j])) {
      savedBirds.push(birds.splice(j, 1)[0]);
    }
  }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

 for(let bird of birds){
    bird.think(pipes);
    bird.update();
 }

 //console.log(birds.length);

 if(birds.length === 0){
   counter = 0;
   nextGeneration();
   pipes = [];
 }
}

 // All the drawing stuff
background(back);

 for(let bird of birds){
   bird.show();
 }

 for(let pipe of pipes){
   pipe.show();
 }

/*function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }*/
}

function saveMode(){
      let bird = random(birds);
      let josn = bird.brain.serialize();
      saveJSON(josn,'mode');
}

function handleFile(file){
    TOTAL = 1;
    birds = [];
    savedBirds = null;
    counter = 0;
    let brainJSON = file.data;
    let brianBrain = NeuralNetwork.deserialize(brainJSON);
    birds[0] = new Bird(brianBrain);
    savedBirds = [];
}
