from itertools import combinations

def sumPairPresent(n, nums):
    for comb in combinations(nums, 2):
        if sum(comb) == n:
            return True
    return False

def findContiguousSumSeries(n, nums):
    for i in range(0, len(nums)):
        sum = 0
        index = i
        while sum < n:
            sum += nums[index]
            if sum == n:
                return nums[i:index + 1]
            index += 1
    return []

f = open("9.txt")
nums = []
preambleLen = 25
for line in f.readlines():
    nums.append(int(line.replace("\n", "")))
for i in range(preambleLen, len(nums)):
    if not sumPairPresent(nums[i], nums[i-preambleLen:i]):
        print(nums[i])
        sumSeries = findContiguousSumSeries(nums[i], nums)
        print(min(sumSeries) + max(sumSeries))
        break
