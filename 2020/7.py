rules = {}

def canContain(container, contents):
    for bag in rules[container]:
        if bag[1] == contents:
            return True
        elif bag[1] == '':
            return False
        elif container == contents:
            continue
        elif canContain(bag[1], contents):
            return True
    return False

def containedBags(bag):
    count = 0
    for contents in rules[bag]:
        if contents[1] == '':
            continue
        count += int(contents[0])
        count += int(contents[0]) * containedBags(contents[1])
    return count

f = open("7.txt")
for line in f.readlines():
    container, contents = line.replace("bags", "bag").split("contain")
    container = container[:-1]
    contents = contents.replace("\n", "").replace(".", "").split(",")
    contents = list(map(lambda e: e[1:], contents)) # truncate space off of front
    if 'no other bag' in contents:
        #special case
        rules[container] = [(0, '')]
        continue
    contents = list(map(lambda e: (e.split(" ")[0], " ".join(e.split(" ")[1:])), contents)) # separate leading number from remainder (joined on space)
    if not container in rules:
        rules[container] = contents
f.close()
count = 0
for rule in rules:
    if canContain(rule, 'shiny gold bag'):
        count += 1
print(count)
print(containedBags('shiny gold bag'))