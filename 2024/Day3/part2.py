import re

with open("input.txt") as fin:
    line = fin.read().strip()


pattern = r"(?:mul\((\d+),(\d+)\))|(do\(\))|(don't\(\))"

### ?: - used for grouping a part of the regex not to capture
matches = re.findall(pattern,line)
### dont turns off until a do is present

"""for match in matches:
    if match.group(1) and match.group(2):  # If mul(...) match is found
        result.append((match.group(1), match.group(2)))
    elif match.group(0) == "don't()":  # If "don't()" match is found
        result.append(1)
    elif match.group(0) == "do()":  # If "do()" match is found
        result.append(0)
"""

ans = 0

toggle = True #boolean to represent do/dont
for match in matches:
    if match[2] == "" and toggle and match[3] == "":
        ans += int(match[0]) * int(match[1])
    else:
        if match[2] == 'do()':
            toggle = True
        else: 
            toggle = False
print(ans)
