f = open("1.txt")
nums = f.readlines()
f.close()
for i in range(0, len(nums)):
    nums[i] = int(nums[i][:-1])

for a in nums:
    for b in nums:
        if a + b == 2020:
            print(str(a * b))
            break

for a in nums:
    for b in nums:
        for c in nums:
            if a + b + c == 2020:
                print(str(a * b * c))
                break