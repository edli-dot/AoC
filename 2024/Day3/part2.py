import re

with open("input.txt") as fin:
    line = fin.read().strip()

result = []

pattern = r"mul\((\d+),(\d+)\)|don't\(\)|do\(\)"
matches = re.finditer(pattern,line)
### dont turns off until a do is present

for match in matches:
    if match.group(1) and match.group(2):  # If mul(...) match is found
        result.append((match.group(1), match.group(2)))
    elif match.group(0) == "don't()":  # If "don't()" match is found
        result.append(1)
    elif match.group(0) == "do()":  # If "do()" match is found
        result.append(0)

print(result)

ans = 0

toggle = True #boolean to represent do/dont
for match in result:
    if match == 0:
        toggle = True
        continue
    elif match == 1:
        toggle = False
        continue
    if toggle == True:
        ans += int(match[0]) * int(match[1])
print(ans)
