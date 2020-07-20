using System;

class Program
{
    static void Main()
    {
        // The official music of Dot Net Perls.
        for (int i = 37; i <= 32767; i += 200)
        {
            Console.Beep(i, 100);
        }
    }
}
