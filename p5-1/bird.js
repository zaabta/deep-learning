class Bird {
  constructor(brain){
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;
    this.width = 50;
    this.height = 40;

    if(brain){
      this.brain = brain.copy();
    }else{
      this.brain = new NeuralNetwork(5, 8, 2);
    }
    // for Genetic algorthim
    this.score = 0;
    this.fitness = 0;
  }

  show (){
    image(birdimage, this.x, this.y, this.width, this.height);
    /*fill(255);
    ellipse(this.x, this.y, 32, 32);*/
  }



  up() {
    this.velocity += this.lift;
  }

  think(pipes){
    // First find the closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = (pipes[i].x + pipes[i].w) - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }


    let inputs = [];
    inputs[0] = map(closest.x, this.x, width, 0, 1);
      // top of closest pipe opening
    inputs[1] = map(closest.top, 0, height, 0, 1);
      // bottom of closest pipe opening
    inputs[2] = map(closest.bottom, 0, height, 0, 1);
      // bird's y position
    inputs[3] = map(this.y, 0, height, 0, 1);
      // bird's y velocity
    inputs[4] = map(this.velocity, -5, 5, 0, 1);

    //let inputs = [1.0, 0.5, 0.2, 0.3];
    let output = this.brain.predict(inputs);
    //console.log(output);
    if(output[0] > output[1]){
      this.up();
      //console.log(output);
    }
  }

  update() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;
    if (this.y + 50 > height) {
      this.y = height - 50 ;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
      this.score++;
  }

  mutate(rate){
    this.brain.mutate(rate);
  }

  dispose(){
    this.brain.dispose();
  }
}
