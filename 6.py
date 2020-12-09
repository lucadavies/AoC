def countUnique(s):
    s = "".join(s)
    return len(set([char for char in s]))

def countCommon(s):
    comSet = set(s[0])
    for p in s[1:]:
        comSet = comSet.intersection(set([char for char in p]))
    return len(comSet)


f = open("6.txt")
group = []
groups = [[]]
for line in f.readlines():
    line = line.replace("\n", "")
    if line == "":
        if groups[0] == []:
            groups[0] = group
        else:
            groups.append(group)
        group = []
    else:
        group.append(line)
groups.append(group)
f.close()

counts = list(map(countUnique, groups))
print(sum(counts))

counts = list(map(countCommon, groups))
print(sum(counts))