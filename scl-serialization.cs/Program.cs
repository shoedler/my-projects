using System;
using System.Collections.Generic;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using System.Diagnostics;

namespace SCL.Serialization.Example
{
    class Program
    {
        static void Main(string[] args)
        {
            /* Vars */
            List<Product> lProducts = new List<Product>();
            Random rndMy = new Random();
            string tmp_sName;
            double tmp_dPrice;
            Stopwatch swTime = new Stopwatch();


            /* Generate 1000 random <Product> Objects */
            for (int n = 0; n < 100; n++)
            {
                tmp_sName = "Product #" + n.ToString();
                tmp_dPrice = rndMy.Next(1, 100);

                Product pTemp = new Product(tmp_sName, tmp_dPrice);
                lProducts.Add(pTemp);
            }

            /* Start Stopwatch */
            swTime.Start();

            /* Write List to Binary Stream */
            WriteBinaryStream(lProducts);

            /* Get List from Binary Stream */
            lProducts = ReadBinaryStream();

            /* Stop Stopwatch */
            swTime.Stop();

            /* Results: (HP Spectre x360 13", i7-1065G7 w/ 16GB RAM
             * Objs                 |      Time [ms]        |   Filesize [kb]
             * ---------------------|-----------------------|--------------------
             * 100                  |  4                    |   4
             * 1'000                |  8                    |   40
             * 10'000               |  88                   |   400
             * 100'000              |  682                  |   4'096
             * 1'000'000            |  65'205               |   41'885
            */

            Console.WriteLine("Elapsed Time: " + swTime.ElapsedMilliseconds + "ms");
            Console.Read();
        }

        static public void WriteBinaryStream(List<Product> tmp_lProducts)
        {
            /* Write: Create ByteStream */
            BinaryFormatter fBinW = new BinaryFormatter();
            using (FileStream fs = new FileStream("C:\\Projects\\my-projects\\SCL.Serialization.Example\\ProductStream.bin", FileMode.Create))
            {
                /* Write List to Binary Stream */
                fBinW.Serialize(fs, tmp_lProducts);
            }
        }

        static public List<Product> ReadBinaryStream()
        {
            /* Read: Create ByteStream */
            BinaryFormatter fBinR = new BinaryFormatter();
            using (FileStream fs = new FileStream("C:\\Projects\\my-projects\\SCL.Serialization.Example\\ProductStream.bin", FileMode.Open))
            {
                /* Read List from Binary Stream. Casting! */
                return fBinR.Deserialize(fs) as List<Product>;
            }
        }


    }

    [Serializable]
    class Product
    {
        /* Properties */
        string sName;
        double dPrice;

        /* Constructor */
        public Product(string tmp_sName, double tmp_dPrice)
        {
            sName = tmp_sName;
            dPrice = tmp_dPrice;
        }

        /* Method: Get Name Value */
        public string getName()
        {
            return sName;
        }

        /* Method: Get Price Value */
        public double getPrice()
        {
            return dPrice;
        }
    }
}
