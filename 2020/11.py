from typing import get_origin


def getCopy(s):
    new = []
    for row in s:
        new.append(list.copy(row))
    return new

def countOccupied(s):
    return sum(list(map(lambda c: c.count('#'), s)))

def countAdjacentPeople(seats, row, col):
    adjPeople = 0
    adj = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    for i, j in adj:
        if i + row < 0 or j + col < 0 or i + row > len(seats) - 1 or j + col > len(seats[0]) - 1:
            continue
        if seats[row + i][col + j] == '#':
            adjPeople += 1
    return adjPeople

def countVisiblePeople(seats, row, col):
    adjPeople = 0
    adj = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    for i, j in adj:
        if i + row < 0 or j + col < 0 or i + row > len(seats) - 1 or j + col > len(seats[0]) - 1:
            continue
        if seats[row + i][col + j] == '#':
            adjPeople += 1
        elif seats[row + i][col + j] == '.':
            i2 = i 
            j2 = j
            while not (i2 + row < 0 or j2 + col < 0 or i2 + row > len(seats) - 1 or j2 + col > len(seats[0]) - 1):
                if seats[row + i2][col + j2] == '#':
                    adjPeople += 1
                    break
                elif seats[row + i2][col + j2] == 'L':
                    break
                i2 += i
                j2 += j
    return adjPeople

def getBlankSeats(rows, cols):
    ns = []
    for _ in range(0, rows):
        ns.append(['.'] * cols)
    return ns

f = open("11.txt")
origSeats = []
for line in f.readlines():
    line = list(line.replace("\n", ""))
    origSeats.append(line)
f.close()
seats = getCopy(origSeats)
newSeats = getBlankSeats(len(seats), len(seats[0]))
change = True
while change:
    change = False
    for row in range(0, len(seats)):
        for col in range(0, len(seats[0])):
            if not seats[row][col] == '.':
                adj = countAdjacentPeople(seats, row, col)
                if seats[row][col] == 'L' and adj == 0:
                    newSeats[row][col] = '#'
                    change = True
                elif seats[row][col] == '#' and adj >= 4:
                    change = True
                    newSeats[row][col] = 'L'
                else:
                    newSeats[row][col] = seats[row][col]
            else:
                newSeats[row][col] = seats[row][col]
            
    seats = newSeats
    newSeats = getBlankSeats(len(seats), len(seats[0]))
print(countOccupied(seats))

seats = origSeats
newSeats = getBlankSeats(len(seats), len(seats[0]))
change = True
while change:
    change = False
    for row in range(0, len(seats)):
        for col in range(0, len(seats[0])):
            if not seats[row][col] == '.':
                adj = countVisiblePeople(seats, row, col)
                if seats[row][col] == 'L' and adj == 0:
                    newSeats[row][col] = '#'
                    change = True
                elif seats[row][col] == '#' and adj >= 5:
                    change = True
                    newSeats[row][col] = 'L'
                else:
                    newSeats[row][col] = seats[row][col]
            else:
                newSeats[row][col] = seats[row][col]
    seats = newSeats
    newSeats = getBlankSeats(len(seats), len(seats[0]))
print(countOccupied(seats))