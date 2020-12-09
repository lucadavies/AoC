f = open("2.txt")
lines = f.readlines()
f.close()
passwords = []
validPassP1 = 0
validPassP2 = 0
for l in lines:
    num1 = int(l.split('-')[0])
    num2 = int(l.split('-')[1].split(' ')[0])
    letter = l.split('-')[1].split(' ')[1].replace(':', '')
    password = l.split('-')[1].split(' ')[2][:-1]
    count = password.count(letter)
    if count >= num1 and count <= num2:
        validPassP1 += 1
    
    if len(password) < num1:
        a = False
    else:
        a = password[num1 - 1] == letter
    if len(password) < num2:
        b = False
    else:    
        b = password[num2 - 1] == letter
    if a ^ b:
        validPassP2 += 1

print(validPassP1)
print(validPassP2)
