var resolution = 20;
var rows, cols;
let inputs = [];
let model;
let learing_rate;
let xs,y;

let train_xs;
let train_ys;

function setup() {
  createCanvas(400, 400);
  rows = width / resolution;
  cols = height / resolution;
  for(var i = 0; i < rows; i++){
    for(var j = 0;j < cols; j++){
      let x1 = (i / rows);
      let x2 = (j / cols);
      inputs.push([x1, x2]);
    }
  }

  train_xs = tf.tensor2d([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ]);

  train_ys = tf.tensor2d([
    [0],
    [1],
    [1],
    [0]
  ]);

  xs = tf.tensor2d(inputs);

  learing_rate = 0.1;
  model = tf.sequential(); // create Model

  let hidden = tf.layers.dense({ // the hidden layers and inputShape how will be
    inputShape: [2],
    units: 16,
    activation: 'sigmoid'
  });
  let output = tf.layers.dense({ // create output layer
    units: 1,
    activation: 'sigmoid'
  });
  model.add(hidden);  // add the hidden layer  to the model
  model.add(output);// add the output layer  to the model
  const optimizer = tf.train.adam(learing_rate);
  model.compile({
    optimizer: optimizer,
    loss : 'meanSquaredError'
  });

  setTimeout(train, 10);

}

function trainModel(){
  return model.fit(train_xs, train_ys, {
    shuffle: true,
    epoch: 1
  });
}

function train() {
  trainModel().then(result => {
    //console.log(result.history.loss[0]);
    setTimeout(train, 10);
  });
}


function draw() {
  tf.tidy(() => {
    background(0);
    y = model.predict(xs);
    let y_values = y.dataSync();

    var index = 0;

    for(var r = 0; r < rows; r++){
      for(var c = 0; c < cols; c++){
        fill(y_values[index] * 255);
        rect(c * resolution, r * resolution, resolution, resolution);
        textSize(7);
        fill(255 - (y_values[index] * 255));
        textAlign(CENTER, CENTER);
        text(nf(y_values[index], 1, 2), c * resolution + resolution / 2  , r * resolution + resolution / 2);
        //console.log(inputs[index]);
        index++;
      }
    }
  });
}
