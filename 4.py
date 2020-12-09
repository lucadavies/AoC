import re

f = open("4.txt")
data = []
for line in f.readlines():
    data.append(line.replace("\n", ""))
f.close()

entries = []
ent = []
for d in data:
    if d == '':
        entries.append(" ".join(ent))
        ent = []
    else:
        ent.append(d)

for i in range(0, len(entries)):
    di = {}
    for pair in entries[i].split(" "):
        k, v = pair.split(":")
        di[k] = v
    entries[i] = di
    
valid = True
vCount = 0
colours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
for p in entries:
    if 'byr' in p and 'iyr' in p and 'eyr' in p and 'hgt' in p and 'hcl' in p and 'ecl' in p and 'pid' in p:
        if not(len(p['byr']) == 4 and 1920 <= int(p['byr']) <= 2002):
            continue
        if not(len(p['iyr']) == 4 and 2010 <= int(p['iyr']) <= 2020):
            continue
        if not(len(p['eyr']) == 4 and 2020 <= int(p['eyr']) <= 2030):
            continue
        if not((p['hgt'][-2:] == "cm" and 150 <= int(p['hgt'][:-2]) <= 193) or (p['hgt'][-2:] == "in" and 59 <= int(p['hgt'][:-2]) <= 76)):  
            continue
        if not(re.match('#[0-9a-f]{6}', p['hcl'])):
            continue
        if not(p['ecl'] in colours):
            continue
        if not(re.match('^[0-9]{9}$', p['pid'])):
            continue
        vCount += 1
    
print(vCount)  