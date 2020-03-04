using System;
using System.Linq;
using ExtensionMethods;
using System.Text;

namespace Pyramide
{
  class Program
  {
    /// <summary>
    ///   The main entry point for the application
    /// </summary>
    [STAThread]
    public static void Main(string[] args)
    {
      int length = 20;
      string str_Whitespace = " ";
      string str_Left       = "/";
      string str_Top     = "^";
      string str_Right      = "\\";
      string str_Bottom     = "_";

      // Deckel
      Console.WriteLine(str_Whitespace.Multiply(length) + str_Top);

      // Linke und rechte Seite
      for (int j = 1; j <= length; j++) {
        Console.WriteLine(str_Whitespace.Multiply(length - j) +
                          str_Left.Multiply(1) + str_Whitespace.Multiply(j - 1) +
                          str_Whitespace +
                          str_Whitespace.Multiply(j - 1) + str_Right.Multiply(1) +
                          str_Whitespace.Multiply(length - j));
      }

      // Boden
      Console.WriteLine(str_Bottom.Multiply((length * 2) + 1));


      Console.Read();
    }
  }
}

namespace ExtensionMethods
{
  public static class MyExtensions
  {
    public static string Multiply(this string source, int multiplier)
    {
       StringBuilder sb = new StringBuilder(multiplier * source.Length);
       for (int i = 0; i < multiplier; i++)
       {
           sb.Append(source);
       }

       return sb.ToString();
    }
  }
}
