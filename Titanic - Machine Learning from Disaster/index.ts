import tf, { model } from '@tensorflow/tfjs';
import fs from 'fs';
import csvParser from 'csv-parser';



interface PassengerCSVType {
    PassengerId?: string;
    Survived?: '0' | '1';
    Pclass?: '1' | '2' | '3';
    Name?: string;
    Sex?: 'male' | 'female';
    Age?: string;
    SibSp?: string;
    Parch?: string;
    Ticket?: string;
    Fare?: string;
    Cabin?: string;
    Embarked?: 'C' | 'Q' | 'S';
}

interface PassengerDataType {
    passengerId: number;
    Pclass: number;
    Sex: number;
    Age: number;
    SibSp: number;
    Parch: number;
    Fare: number;
    Embarked_Q: number;
    Embarked_S: number;
    Survived: number;
}

function readCSV(filePath: string): Promise<PassengerCSVType[]> {
    return new Promise((resolve, reject) => {
        const results: PassengerCSVType[] = [];
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', reject);
    });
}

function preprocess(data: PassengerCSVType[]): PassengerDataType[] {
    return data.map(row => row.PassengerId ? ({
        passengerId: parseInt(row.PassengerId, 10),
        Pclass: parseFloat(row.Pclass || '3'),
        Sex: row.Sex === 'female' ? 1 : 0,
        Age: row.Age ? parseFloat(row.Age) : 24,
        SibSp: parseFloat(row.SibSp || '0'),
        Parch: parseFloat(row.Parch || '0'),
        Fare: row.Fare ? parseFloat(row.Fare) : 32,
        Embarked_Q: row.Embarked === 'Q' ? 1 : 0,
        Embarked_S: row.Embarked === 'S' ? 1 : 0,
        Survived: parseFloat(row.Survived || '0'),
    }): undefined).filter(Boolean) as PassengerDataType[];
}

function prepareTensors(data: PassengerDataType[]): { X: tf.Tensor2D; y: tf.Tensor2D } {
    const X = data.map(d => [d.Pclass, d.Sex, d.Age, d.SibSp, d.Parch, d.Fare, d.Embarked_Q, d.Embarked_S]);
    const y = data.map(d => d.Survived !== undefined ? d.Survived : 0);
    return {
        X: tf.tensor2d(X),
        y: tf.tensor2d(y, [y.length, 1])
    };
}

function buildModel(inputShape: number): tf.Sequential {
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [inputShape], units: 1, activation: 'sigmoid'}));
    model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });
    return model;
}

async function trainModel(model: tf.Sequential, X: tf.Tensor2D, y: tf.Tensor2D) {
    await model.fit(X, y, {
        epochs: 100,
        batchSize: 32,
        validationSplit: 0.2,
        shuffle: true
    });
}

function printEvaluationModel(model: tf.Sequential, X_train: tf.Tensor2D, y_train: tf.Tensor2D) {
    const y_pred_prob = model.predict(X_train) as tf.Tensor;
    const y_pred = Array.from(y_pred_prob.dataSync()).map(v => v > 0.5 ? 1 : 0);
    const y_true = Array.from(y_train.dataSync());

    const correct = y_true.filter((val, i) => val === y_pred[i]).length;
    const accuracy = correct / y_true.length;

    console.log('Accuracy on training data:', accuracy * 100, '%');

    const tp = y_true.reduce((acc, val, i) => acc + ((val===1 && y_pred[i]===1)?1:0), 0);
    const fp = y_true.reduce((acc, val, i) => acc + ((val===0 && y_pred[i]===1)?1:0), 0);
    const fn = y_true.reduce((acc, val, i) => acc + ((val===1 && y_pred[i]===0)?1:0), 0);

    const precision = tp / (tp + fp);
    const recall = tp / (tp + fn);
    const f1 = 2 * (precision * recall) / (precision + recall);

    console.log('F1 Score on training data:', f1 * 100, '%');
}


async function main() {
    const rawTrain = await readCSV('train.csv');
    const rawTest = await readCSV('test.csv');

    const trainData = preprocess(rawTrain);
    trainData.sort(() => Math.random() - 0.5); // Shuffle data
    const split = Math.floor(trainData.length * 0.8);
    const trainSet = trainData.slice(0, split);
    const valSet = trainData.slice(split);
    const testData = preprocess(rawTest);

    const { X: X_train, y: y_train } = prepareTensors(trainSet);
    const { X: X_val, y: y_val } = prepareTensors(valSet);
    const { X: X_test, y:_ } = prepareTensors(testData);
    
    const model = buildModel(8)
    await trainModel(model, X_train, y_train);

    printEvaluationModel(model, X_val, y_val);
    const y_test = model.predict(X_test) as tf.Tensor;
    const y_test_pred = Array.from(y_test.dataSync()).map(v => v > 0.5 ? 1 : 0);

     const submission = testData.map(({ passengerId: PassengerId }, i) => ({
        PassengerId,
        Survived: y_test_pred[i]
    }));

    fs.writeFileSync('submission.json', JSON.stringify(submission, null, 2));
    console.log("Predictions saved to submission.json");

    let csvContent = 'PassengerId,Survived\n';

    submission.forEach(row => {
        csvContent += `${row.PassengerId},${row.Survived}\n`;
    });

    // حفظ الملف
    fs.writeFileSync('submission.csv', csvContent);

    console.log("Predictions saved to submission.csv");
}

main().catch((err) => console.error(err));