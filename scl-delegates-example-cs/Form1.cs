using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace scl_delegates_example_cs
{
    public partial class FormCalc : Form
    {
        public FormCalc()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e) { }

        // Define Delegate
        public delegate double CalculationDelegator(double dVal1, double dVal2);

        // Define Methods to delegate
        public double Add(double dVal1, double dVal2) { return dVal1 + dVal2;  }

        // Define Method to delegate
        public double Mult(double dVal1, double dVal2) { return dVal1 * dVal2; }

        private void button1_Click(object sender, EventArgs e)
        {
            double dValue1 = 0;
            double dValue2 = 0;

            // Instantiate delegate, initially assign it to the 'Add' Method
            CalculationDelegator CalcDel = new CalculationDelegator(Add);

            // Reassign delegate if Mult-Radiobutton is checked
            if (rbMult.Checked) CalcDel = Mult;

            try
            {
                dValue1 = Convert.ToDouble(tbValue_1.Text);
                dValue2 = Convert.ToDouble(tbValue_2.Text);
                lblResult.Text = "= " + CalcDel(dValue1, dValue2).ToString();
            }
            catch (Exception E)
            {
                lblResult.Text = "= undefined";
                MessageBox.Show(E.Message);
            }
        }
    }
}
