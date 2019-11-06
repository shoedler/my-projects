using System;

namespace NSH_Zahlenraten
{
  class Program
  {
    /// <summary>
    ///   The main entry point for the application
    /// </summary>
    [STAThread]
    public static void Main(string[] args)
    {
      // Init
      int i_TargetNumber = 0;
      int i_Max = 100;
      int i_Guess = 0;
      int i_Tries = 0;

      // RNG
      Random RNG = new Random();

      // Define target number
      i_TargetNumber = RNG.Next(1, i_Max);

      do {
        // Collect guess and convert securely
        try {
          // Normally
          Console.Write("Type your guess: ");
          i_Guess = Convert.ToInt32(Console.ReadLine());
        }
        catch (Exception e) {
          Console.WriteLine(e.Message);
        }

        // Evaluate using selection
        if (i_Guess < i_TargetNumber) {
          Console.WriteLine("Your guess was too small...");
        }
        else if (i_Guess > i_TargetNumber)
        {
          Console.WriteLine("Your guess was too big...");
        }

        i_Tries++;
      } while (i_TargetNumber != i_Guess);

      Console.WriteLine("Your found the number (" + i_TargetNumber + ") using " + i_Tries + " tries!");
      Console.Read();
    }
  }
}
