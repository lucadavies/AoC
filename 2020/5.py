def getSeat(id):
    rows = list(range(0, 128))
    cols = list(range(0, 8))
    for c in id[:7]:
        if c == 'F':
            rows = rows[:len(rows)//2]
        elif c == 'B':
           rows = rows[len(rows)//2:]
        if len(rows) == 1:
            break

    for c in id[7:]:
        if c == 'L':
            cols = cols[:len(cols)//2]
        elif c == 'R':
            cols = cols[len(cols)//2:]
        if len(cols) == 1:
            break
    return rows[0], cols[0]

f = open("5.txt")
passes = []
for line in f.readlines():
    passes.append(line.replace("\n", ""))
f.close()

ids = []
for id in passes:
    r, c = getSeat(id)
    ids.append(r * 8 + c)

print(max(ids))

ids.sort()
for id in range(min(ids) + 1, max(ids)):
    if not id in ids and id + 1 in ids and id - 1 in ids:
        print(id)