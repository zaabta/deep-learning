let nn;
let resloustion = 10;
let rows,cols;
let learning_silder;
// traninig inputs and output
let traninig_data = [
  {
    inputs:[0, 0],
    output:[0]
  },
  {
    inputs:[0, 1],
    output:[1]
  },
  {
    inputs:[1, 0],
    output:[1]
  },
  {
    inputs:[1, 1],
    output:[0]
  }
]

function setup() {
  createCanvas(800, 800);
  nn = new  NeuralNetwork(2,4,1);
  learning_silder = createSlider(0, 1.0,0.1, 0.01);
}

function draw() {
  background(0);

  for(let i = 0; i < 1000; i++){
    let data = random(traninig_data);
    nn.train(data.inputs, data.output);
  }

  nn.setLearningRate(learning_silder.value());

  rows = height / resloustion;
  cols = width / resloustion;

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x1 = i / rows;
      let x2 = j / cols;
      let inputs = [x1, x2];
      let y = nn.predict(inputs);
      noStroke();
      fill(y * 255);
      rect(i*resloustion, j * resloustion, resloustion ,resloustion);
    }
  }


}
