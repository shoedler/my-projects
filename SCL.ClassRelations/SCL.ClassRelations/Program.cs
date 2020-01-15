using System;
using System.Collections.Generic;

namespace SCL.ClassRelations
{
    class Program
    {
        static void Main(string[] args)
        {
            Apprentice aApp1 = new Apprentice("Max", "Müller");
            Employee   eEmp1 = new Employee("Hans", "Hüner");
            Employee   eEmp2 = new Employee("Jan", "Junker");

            aApp1.retrieveEmploymentState();
            eEmp1.retrieveEmploymentState();
            eEmp2.retrieveEmploymentState();

            Console.WriteLine(" ");

            Transactional tTrn1 = new Transactional("Insurance Case 1", 299, eEmp1);
            Transactional tTrn2 = new Transactional("Insurance Case 2", 399, eEmp1);
            Transactional tTrn3 = new Transactional("Insurance Case 3", 499, eEmp1);
            Transactional tTrn4 = new Transactional("Insurance Case 4", 599, eEmp1);

            eEmp2.addTransactional(tTrn2);
            eEmp2.addTransactional(tTrn3);

            eEmp1.listTransactionals();
            Console.WriteLine(" ");
            eEmp2.listTransactionals();

            Console.Read();
        }
    }

    abstract class Person
    {
        public string sName = "";
        public string sPreName = "";
        string sEmploymentState = "";

        public Person(string tmpName, string tmpPreName, string tmpEmploymentState)
        {
            sName = tmpName;
            sPreName = tmpPreName;
            sEmploymentState = tmpEmploymentState;
        }

        // Method: Retrieve EmploymentState
        public void retrieveEmploymentState()
        {
            Console.WriteLine("The Employment State of " + sName + " " + sPreName + " is: " + sEmploymentState);
        }
    }

    class Apprentice : Person
    {
        public Apprentice(string tmpName, string tmpPreName, string tmpEmploymentState = "Apprentice") : base(tmpName, tmpPreName, tmpEmploymentState)
        {}
    }

    class Employee : Person
    {
        List<Transactional> lTransactionals = new List<Transactional>();

        public Employee(string tmpName, string tmpPreName, string tmpEmploymentState = "Employee") : base (tmpName, tmpPreName, tmpEmploymentState)
        {}

        // Method: Add Transactional
        public void addTransactional(Transactional tTransactional)
        {
            lTransactionals.Add(tTransactional);
        }

        // Method: List Transactionals 
        public void listTransactionals()
        {
            Console.WriteLine("Transactionals of: " + this.sName + " " + this.sPreName);
            Console.WriteLine("---------------------------------------------------------");
            foreach (var t in lTransactionals)
            {
                Console.WriteLine("Description: " + t.sDescription + " | Value: " + t.iValue);
            }
        }
    }

    class Transactional
    {
        public string sDescription = "";
        public int iValue = 0;

        public Transactional(string tmpDescription, int tmpValue, Employee tEmp)
        {
            sDescription = tmpDescription;
            iValue = tmpValue;
            tEmp.addTransactional(this);
        }
    }
}