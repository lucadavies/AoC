adapters = []

f = open("10.txt")
for line in f.readlines():
    adapters.append(int(line.replace("\n", "")))
f.close()
adapters.sort()
adapters.insert(0, 0) #insert charging port
adapters.append(max(adapters) + 3) #insert device
last = adapters[0]
ones = 0
threes = 0
for a in adapters:
    diff = a - last
    if diff == 1:
        ones += 1
    elif diff == 3:
        threes += 1
    last = a
print(ones * threes)

#Part two, helped by https://github.com/tudorpavel/advent-of-code-2020/tree/master/day10
slices = []
s = []
for i in range(0, len(adapters) - 1):
    if adapters[i + 1] - adapters[i] == 1:
        s.append(adapters[i])
    elif adapters[i + 1] - adapters[i] == 3:
        s.append(adapters[i])
        slices.append(s)
        s = []

prod = 1
for s in slices:
    if len(s) == 1:
        prod *= 1
    elif len(s) == 2:
        prod *= 1
    elif len(s) == 3:
        prod *= 2
    elif len(s) == 4:
        prod *= 4
    elif len(s) == 5:
        prod *= 7
    else:
        print("Ahhhh")
print(prod)   