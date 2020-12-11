def execute(p):
    next = 0
    acc = 0
    inst = p[0]
    while not inst[2]:
        #print(inst[0], inst[1])
        p[next][2] = True
        if inst[0] == 'acc':
            acc += inst[1]
            next += 1
        elif inst[0] == 'jmp':
            next += inst[1]
        elif inst[0] == 'nop':
            next += 1
        if next >= len(p):
            break
        inst = p[next]
    return acc, next

def resetProgram(p):
    for inst in p:
        inst[2] = False

def findCorruptInst(p):
    target = len(p)
    for i in range(0, target):
        if p[i][0] == 'nop':
            p[i][0] = 'jmp'
            acc, lastInst = execute(p)
            if lastInst == target:
                return acc
            else:
                p[i][0] = 'nop'
                resetProgram(p)
        if p[i][0] == 'jmp':
            p[i][0] = 'nop'
            acc, lastInst = execute(p)
            if lastInst == target:
                return acc
            else:
                p[i][0] = 'jmp'
                resetProgram(p)

f = open("8.txt")
prog = []
backUpProg = []
for line in f.readlines():
    line = line.replace("\n", "")
    pLine = line.split(" ")
    pLine[1] = int(pLine[1])
    pLine.append(False)
    prog.append(pLine)
    backUpProg.append(pLine.copy())
f.close()
print(execute(prog))
print(findCorruptInst(prog))