# This program prints Hello, world!
import random


chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
line = 80
amount = 40
j = 0
i = 0
string = ""

while True:

    # x = raw_input("Start")
    j = 0

    while j < amount:

        while i < line:
            rnd = random.randint(0, chars.__len__() - 1)
            string = string + chars[rnd]
            i = i + 1;
            pass

        print(string)

        string = ""
        i = 0
        j = j + 1
        pass

    pass
