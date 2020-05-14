using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace scl_interfaces_cs
{
    interface IGeometry
    {
        double CalculateArea();
    }


    public class Circle : IGeometry
    {
        public double dRadius;

        public Circle(double dR)
        {
            this.dRadius = dR;
        }

        public double CalculateArea()
        {
            return Math.PI * Math.Pow(this.dRadius, 2);
        }
    }


    class Ellipse : IGeometry
    {
        double dWidth;
        double dHeight;

        public Ellipse(double dW, double dH)
        {
            this.dWidth = dW;
            this.dHeight = dH;
        }

        public double CalculateArea()
        {
            return this.dWidth * this.dHeight * Math.PI;
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            Circle cTest = new Circle(1);
            Console.WriteLine(cTest.CalculateArea().ToString());

            cTest.dRadius = 2;
            Console.WriteLine(cTest.CalculateArea().ToString());

            Console.ReadLine();
        }
    }
}
