
using System;

namespace Test
{
  class Program
  {
    /// <summary>
    ///   The main entry point for the application
    /// </summary>_
    [STAThread]
    public static void Main(string[] args)
    {
      // Kopf gesteuerte Schlaufen (For und While)
      for (int i = 0; i < 10; i++) {
        string s = "For-Schlaufe " + i;
        Console.WriteLine(s);
      }

      int j = 0;
      while (j < 10) {
        string s = "While-Schlaufe " + j;
        Console.WriteLine(s);
        j++;
      }

      // Fuss gesteuerte Schlaufen (do While)
      int k = 0;
      do {
        string s = "Do-While Schlaufe " + k;
        Console.WriteLine(s);
        k++;
      } while (k < 10);

      // Warten
      Console.Read();
    }
  }
}
