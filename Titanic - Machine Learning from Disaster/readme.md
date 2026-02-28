# 📌 Project Description

## Titanic Survival Prediction using Logistic Regression (TensorFlow.js)

This project implements a **Binary Classification model** to predict passenger survival on the Titanic dataset using **Logistic Regression** built with TensorFlow.js.

---

## 🎯 Objective

The goal is to predict whether a passenger survived (1) or did not survive (0) based on features such as:

* Passenger Class (Pclass)
* Sex
* Age
* Number of Siblings/Spouses (SibSp)
* Number of Parents/Children (Parch)
* Fare
* Port of Embarkation (One-Hot Encoded)

---

## 🧠 Model Used

* **Algorithm:** Logistic Regression
* **Framework:** TensorFlow.js
* **Loss Function:** Binary Crossentropy
* **Optimizer:** Adam
* **Evaluation Metrics:** Accuracy and F1 Score

---

## ⚙️ Workflow

1. Load CSV files (`train.csv`, `test.csv`)
2. Preprocess data:

   * Convert categorical values to numeric
   * Handle missing values
   * Apply One-Hot Encoding for Embarked
3. Split dataset:

   * 80% Training
   * 20% Validation
4. Train the model
5. Evaluate performance:

   * Accuracy
   * Precision
   * Recall
   * F1 Score
6. Generate predictions for test data
7. Export results as `submission.csv`

---

## 📊 Example Results

* Training Accuracy: ~81%
* Training F1 Score: ~78%
* Validation Accuracy: ~76–79% (depending on shuffle)

---

## 📁 Output Format

The final output file:

```
PassengerId,Survived
892,0
893,1
894,0
...
```

This file is ready for submission to Kaggle.

---

## 🚀 Skills Demonstrated

* Data preprocessing
* Feature engineering
* Model building
* Model evaluation
* Train/Validation splitting
* Exporting predictions to CSV
* End-to-end ML pipeline in JavaScript
