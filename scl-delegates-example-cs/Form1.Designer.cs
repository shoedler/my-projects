namespace scl_delegates_example_cs
{
    partial class FormCalc
    {
        /// <summary>
        /// Erforderliche Designervariable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Verwendete Ressourcen bereinigen.
        /// </summary>
        /// <param name="disposing">True, wenn verwaltete Ressourcen gelöscht werden sollen; andernfalls False.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Vom Windows Form-Designer generierter Code

        /// <summary>
        /// Erforderliche Methode für die Designerunterstützung.
        /// Der Inhalt der Methode darf nicht mit dem Code-Editor geändert werden.
        /// </summary>
        private void InitializeComponent()
        {
            this.bCalc = new System.Windows.Forms.Button();
            this.tbValue_1 = new System.Windows.Forms.TextBox();
            this.tbValue_2 = new System.Windows.Forms.TextBox();
            this.lblResult = new System.Windows.Forms.Label();
            this.rbAdd = new System.Windows.Forms.RadioButton();
            this.rbMult = new System.Windows.Forms.RadioButton();
            this.SuspendLayout();
            // 
            // bCalc
            // 
            this.bCalc.Location = new System.Drawing.Point(12, 68);
            this.bCalc.Name = "bCalc";
            this.bCalc.Size = new System.Drawing.Size(118, 27);
            this.bCalc.TabIndex = 0;
            this.bCalc.Text = "Calculate";
            this.bCalc.UseVisualStyleBackColor = true;
            this.bCalc.Click += new System.EventHandler(this.button1_Click);
            // 
            // tbValue_1
            // 
            this.tbValue_1.Location = new System.Drawing.Point(12, 12);
            this.tbValue_1.Name = "tbValue_1";
            this.tbValue_1.Size = new System.Drawing.Size(118, 22);
            this.tbValue_1.TabIndex = 1;
            // 
            // tbValue_2
            // 
            this.tbValue_2.Location = new System.Drawing.Point(12, 40);
            this.tbValue_2.Name = "tbValue_2";
            this.tbValue_2.Size = new System.Drawing.Size(118, 22);
            this.tbValue_2.TabIndex = 2;
            // 
            // lblResult
            // 
            this.lblResult.AutoSize = true;
            this.lblResult.Location = new System.Drawing.Point(12, 110);
            this.lblResult.Name = "lblResult";
            this.lblResult.Size = new System.Drawing.Size(16, 17);
            this.lblResult.TabIndex = 3;
            this.lblResult.Text = "=";
            // 
            // rbAdd
            // 
            this.rbAdd.AutoSize = true;
            this.rbAdd.Checked = true;
            this.rbAdd.Location = new System.Drawing.Point(136, 13);
            this.rbAdd.Name = "rbAdd";
            this.rbAdd.Size = new System.Drawing.Size(54, 21);
            this.rbAdd.TabIndex = 4;
            this.rbAdd.TabStop = true;
            this.rbAdd.Text = "Add";
            this.rbAdd.UseVisualStyleBackColor = true;
            // 
            // rbMult
            // 
            this.rbMult.AutoSize = true;
            this.rbMult.Location = new System.Drawing.Point(136, 40);
            this.rbMult.Name = "rbMult";
            this.rbMult.Size = new System.Drawing.Size(55, 21);
            this.rbMult.TabIndex = 5;
            this.rbMult.Text = "Mult";
            this.rbMult.UseVisualStyleBackColor = true;
            // 
            // FormCalc
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(200, 136);
            this.Controls.Add(this.rbMult);
            this.Controls.Add(this.rbAdd);
            this.Controls.Add(this.lblResult);
            this.Controls.Add(this.tbValue_2);
            this.Controls.Add(this.tbValue_1);
            this.Controls.Add(this.bCalc);
            this.Name = "FormCalc";
            this.Text = "Delegates Example";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button bCalc;
        private System.Windows.Forms.TextBox tbValue_1;
        private System.Windows.Forms.TextBox tbValue_2;
        private System.Windows.Forms.Label lblResult;
        private System.Windows.Forms.RadioButton rbAdd;
        private System.Windows.Forms.RadioButton rbMult;
    }
}

