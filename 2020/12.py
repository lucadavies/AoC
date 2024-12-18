def rotR(p, times):
    for _ in range(0, times):
        p[0], p[1] = p[1], -p[0]

def rotL(p, times):
    for _ in range(0, times):
        p[0], p[1] = -p[1], p[0]

f = open("12.txt")
insts = []
for line in f.readlines():
    line = line.replace("\n", "")
    line = [line[0], int(line[1:])]
    insts.append(line)

pos = [0, 0, 90]
for inst in insts:
    dir = inst[0]
    if dir == 'N':
        pos[1] += inst[1]
    elif dir == 'S':
        pos[1] -= inst[1]
    elif dir == 'E':
        pos[0] += inst[1]
    elif dir == 'W':
        pos[0] -= inst[1]
    elif dir == 'L':
        pos[2] -= inst[1]
        pos[2] %= 360
    elif dir == 'R':
        pos[2] += inst[1]
        pos[2] %= 360
    elif dir == 'F':
        dirChk = pos[2] // 90
        if dirChk == 0:
            pos[1] += inst[1]
        elif dirChk == 1:
            pos[0] += inst[1]
        elif dirChk == 2:
            pos[1] -= inst[1]
        elif dirChk == 3:
            pos[0] -= inst[1]

print(abs(pos[0]) + abs(pos[1]))

wPos = [10, 1]
sPos = [0, 0]
for inst in insts:
    dir = inst[0]
    if dir == 'N':
        wPos[1] += inst[1]
    elif dir == 'S':
        wPos[1] -= inst[1]
    elif dir == 'E':
        wPos[0] += inst[1]
    elif dir == 'W':
        wPos[0] -= inst[1]
    elif dir == 'L':
        dirChg = inst[1] // 90
        rotL(wPos, dirChg)
    elif dir == 'R':
        dirChg = inst[1] // 90
        rotR(wPos, dirChg)
    elif dir == 'F':
        for _ in range(0, inst[1]):
            sPos[0] += wPos[0]
            sPos[1] += wPos[1] 

print(abs(sPos[0]) + abs(sPos[1]))