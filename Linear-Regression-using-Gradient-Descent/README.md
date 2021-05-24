# Linear Regression using Gradient Descent

## Linear Regression

In statistics, linear regression is a linear approach to modelling the relationship between a dependent variable and one or more independent variables. Let X be the independent variable and Y be the dependent variable. We will define a linear relationship between these two variables as follows:

<img src="https://miro.medium.com/max/600/1*p3LTR6GB6g2MpRZzE5JIxw.png" title=""/>


<img src="https://miro.medium.com/max/712/1*ETn5o9GRaF8ZK6wIHvGrJQ.gif" title=""/>

m is the slope of the line and c is the y intercept. Today we will use this equation to train our model with a given dataset and predict the value of Y for any given value of X. Our challenge today is to determine the value of m and c, such that the line corresponding to those values is the best fitting line or gives the minimum error.

## Loss Function
The loss is the error in our predicted value of m and c. Our goal is to minimize this error to obtain the most accurate value of m and c.
We will use the Mean Squared Error function to calculate the loss. There are three steps in this function:
Find the difference between the actual y and predicted y value(y = mx + c), for a given x.
Square this difference.
Find the mean of the squares for every value in X.

<img src="https://miro.medium.com/max/600/1*_y5QA1yF4w6LDDRxfTt6GA.jpeg" title=""/>

Here yᵢ is the actual value and ȳᵢ is the predicted value. Lets substitute the value of ȳᵢ:

<img src="https://miro.medium.com/max/800/1*3cpC7oHy4IbH3o3Jc-ygVw.jpeg" title=""/>

So we square the error and find the mean. hence the name Mean Squared Error. Now that we have defined the loss function, lets get into the interesting part — minimizing it and finding m and c.


# The Gradient Descent Algorithm
Gradient descent is an iterative optimization algorithm to find the minimum of a function. Here that function is our Loss Function.

Initially let m = 0 and c = 0. Let L be our learning rate. This controls how much the value of m changes with each step. L could be a small value like 0.0001 for good accuracy.
Calculate the partial derivative of the loss function with respect to m, and plug in the current values of x, y, m and c in it to obtain the derivative value D

<img src="https://miro.medium.com/max/600/1*_y5QA1yF4w6LDDRxfTt6GA.jpeg" title=""/>

Dₘ is the value of the partial derivative with respect to m. Similarly lets find the partial derivative with respect to c, Dc :

<img src="https://miro.medium.com/max/600/1*rj09w2TcBxnHPtQ0oq4ehA.jpeg" title=""/>

3. Now we update the current value of m and c using the following equation:

<img src="https://miro.medium.com/max/600/1*JDcHqFK8jLcgQu1cj2XuVQ.jpeg" title=""/>


We repeat this process until our loss function is a very small value or ideally 0 (which means 0 error or 100% accuracy). The value of m and c that we are left with now will be the optimum values.
Now going back to our analogy, m can be considered the current position of the person. D is equivalent to the steepness of the slope and L can be the speed with which he moves. Now the new value of m that we calculate using the above equation will be his next position, and L×D will be the size of the steps he will take. When the slope is more steep (D is more) he takes longer steps and when it is less steep (D is less), he takes smaller steps. Finally he arrives at the bottom of the valley which corresponds to our loss = 0.
Now with the optimum value of m and c our model is ready to make predictions !




<img src="Figure_1.png" title=""/>




