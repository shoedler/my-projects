using System;
using System.Globalization;

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
      var p = new Guesser();
      p.generateData(1000, 1000000, 10, 10000000);
      Console.Read();
    }
  }

  class Guesser
  {
    public void generateData(int i_Min, int i_Max, int i_Inc, int i_Reps)
    {
      double d_Tries = 0;
      int i_Games = 0;
      int i_Total_Tries = 0;

      // Loop from [i_Min] to [i_Max], incrementing by [i_Inc]
      for (int i = i_Min; i <= i_Max; i *= i_Inc)
      {
        d_Tries = 0;

        // Do each guess [i_Reps] amount of times
        for (int j = 0; j < i_Reps; j++)
        {
          d_Tries += this.doGuess(i, false);
          i_Games += 1;
        }

        i_Total_Tries += Convert.ToInt32(d_Tries);

        // Print the max guess value and the avg. amount of tries needed for this game
        Console.WriteLine("Max: " + i + "      avg. tries needed: " + d_Tries / i_Reps);
      }

      // Gets a NumberFormatInfo associated with the en-US culture.
      NumberFormatInfo nfi = new CultureInfo("en-US", false).NumberFormat;
      nfi.CurrencyGroupSeparator = "'";
      nfi.CurrencySymbol = "";

      var v_Total_Tries = i_Total_Tries.ToString("C3", nfi);
      var V_Games = i_Games.ToString("C3", nfi);

      Console.WriteLine("Done. Did " + V_Games + " games using " + v_Total_Tries + " tries.");
    }


    public int doGuess(int i_Max = 100, bool x_Debug = true)
    {
      // Init
      int i_TargetNumber = 0;
      int i_Guess = i_Max / 2;
      int i_Temp = i_Max / 2;
      int i_Tries = 0;

      // RNG
      Random RNG = new Random();

      // Define target number
      i_TargetNumber = RNG.Next(1, i_Max);

      do {
        if (x_Debug) {Console.Write("PC's Guess: " + i_Guess + " -> ");}

        i_Temp = i_Temp / 2;

        // If [i_Temp] is 0, just add 1
        if (i_Temp < 1) {
          i_Temp = 1;
        }

        // Evaluate using selection
        if (i_Guess < i_TargetNumber)
        {
          if (x_Debug) {Console.WriteLine("Your guess was too small...");}
          i_Guess += i_Temp;
        }
        else if (i_Guess > i_TargetNumber)
        {
          if (x_Debug) {Console.WriteLine("Your guess was too big...");}
          i_Guess -= i_Temp;
        }

        // Console.Beep();

        i_Tries++;
      }
      while (i_TargetNumber != i_Guess);

      if (x_Debug) {Console.WriteLine("You found the number (" + i_TargetNumber + ") using " + i_Tries + " tries!");}

      return i_Tries;
    }
  }
}
