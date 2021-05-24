import numpy as np
import pandas as pd
import matplotlib.pyplot as plt




plt.rcParams['figure.figsize'] = (12.0, 9.0)

data = pd.read_csv('data.csv')
x = data.iloc[:, 0]
y = data.iloc[:, 1]


m = 0
c = 0
L = 0.0001  #Learning Rate

n = len(x)

for i in range(n):
    y_ = (m * x) + c
    Dm = (-2/n) * sum(x*(y - y_))
    Dc = (-2/n) * sum(y - y_)
    m -= L * Dm
    c -= L * Dc

print(m, c)
y_ = m*x + c
plt.scatter(x, y)
plt.plot([min(x), max(x)], [min(y_), max(y_)], color = 'red')
plt.show()


