import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def leastSquares():
    global m
    global c
    xmean = sum(x) / len(data)
    ymean = sum(y) / len(data)
    num = 0
    dem = 0
    for i in range(len(data)):
        num += (x[i] - xmean) * (y[i] - ymean)
        dem += (x[i] - xmean )** 2
    m = num / dem
    c = ymean - (m * xmean)
    print(m, c)




plt.rcParams['figure.figsize'] = (12.0, 9.0)

data = pd.read_csv('data.csv')
x = data.iloc[:, 0]
y = data.iloc[:, 1]
m = 0
c = 0
L = 0.0001  #Learning Rate

leastSquares()

y_ = m * x + c
plt.scatter(x, y)
plt.plot([min(x), max(x)], [min(y_), max(y_)], color='red')
plt.show()
