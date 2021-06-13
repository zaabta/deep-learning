

function nextGeneration(){

  calculateFitness();

  for(var i = 0; i < TOTAL; i++){
    birds[i] = pickOne();
    }
  savedBirds = [];
  generation +=1;
}

function pickOne(){
  var index = 0;
  var r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

function calculateFitness(){
  // calculate sum all the score of birds
  console.log('nextGeneration');
  let sum = 0;
  for(let bird of savedBirds){
    sum += bird.score;
  }
  // calculate the fitness of each birs
  for(let bird of savedBirds){
    bird.fitness = bird.score / sum;
  }
}
