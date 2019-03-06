# This program prints Hello, world!

while True:
    a = int(input("a = "))
    b = int(input("b = "))
    c = int(input("c = "))

    if a == 1:
        print("a = " + str(a))
    elif c == 1:
        print("c = " + str(c))
    else:
        print("a, b, c = " +
              str(a) +
              ", " +
              str(b) +
              ", " +
              str(c))
    print("-----DONE------")
