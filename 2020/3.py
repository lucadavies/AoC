from functools import reduce

f = open("3.txt")
slope = []
for line in f.readlines():
    slope.append(line.replace("\n", ""))
f.close()

moves = [
            [1, 1],
            [3, 1],
            [5, 1],
            [7, 1],
            [1, 2]
        ]
res = []

for movX, movY in moves:
    loc = 0
    trees = 0
    l = 0
    while l < len(slope):
        if slope[l][loc] == '#':
            trees += 1
        loc += movX
        
        if loc > len(slope[l]) - 1:
            loc = loc - len(slope[l])
        l += movY     

    res.append(trees)

print(reduce((lambda x, y: x * y), res))