from math import ceil, inf
from functools import reduce

def chinese_remainder(remainders, divisors):
    M = prod(divisors)
    as_ = list(map(lambda d: int(M / d), divisors))
    eea_results = map(lambda tup: extended_gcd(*tup), zip(as_, divisors))
    is_ = [result[0] % div for result, div in zip(eea_results, divisors)]
    Z = sum(map(prod, zip(is_, remainders, as_)))
    x = Z % M
    return x

def prod(nums):
    return reduce(lambda a, b: a * b, nums, 1)


def extended_gcd(a, b):
    # EEA
    old_r, r = a, b
    old_s, s = 1, 0
    old_t, t = 0, 1

    while r != 0:
        quotient = old_r // r
        old_r, r = r, old_r - quotient * r
        old_s, s = s, old_s - quotient * s
        old_t, t = t, old_t - quotient * t

    # return Bezout coefficient 1, 2, and the gcd
    return old_s, old_t, old_r

f = open("13.txt")
d = int(f.readline())
busesRaw = f.readline() .split(',')
buses = [int(b) for b in busesRaw if b != 'x']
minTime = inf
nextBus = None
for b in buses:
    nextDep = ceil(d / b) * b
    if nextDep - d < minTime:
        nextBus = b
        minTime = nextDep - d

print(minTime * nextBus)

n = []
a = []
for i in range(0, len(busesRaw)):
    if busesRaw[i] != 'x':
        n.append(int(busesRaw[i]))
        a.append(i)

rests, divisors = [], []
for num, ind in zip(n, a):
    rests.append((-ind) % num)
    divisors.append(num)

#part 2 given by https://github.com/MischaDy/PyAdventOfCode2020/blob/main/day%2013/day13_part2.py - sod this much maths.
print(chinese_remainder(rests, divisors))