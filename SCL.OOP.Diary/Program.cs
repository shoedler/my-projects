using System;
using System.Collections.Generic;
using Terminal.Gui;

namespace SCL.OOP.Diary
{
    // Global Variables
    public static class Globals
    {
        // Properties
        public static User oActiveUser;
        public static List<User> lUsers;

        //public static Attribute myColor = Application.Driver.MakeAttribute(Color.Blue, Color.Red);
        //var label = new Label(...);
        //label.TextColor = myColor
        


        // Constructor
        static Globals()
        {
            oActiveUser = null;
            lUsers = new List<User>();
        }
    }

    class Program
    {
        // Properties
        public static GUI oInterface;

        static void Main(string[] args)
        {
            // Add Dummy Users
            User oMax = new User("Max", "12345");
            User oBob = new User("Bob", "54321");
            Globals.lUsers.Add(oMax);
            Globals.lUsers.Add(oBob);
            
            // Add Dummy Entries
            oMax.lEntries.Add(new Entry(new DateTime(1995, 5, 2), "Heute war ich Autofahren.\nJuhu", "No Image", new List<string> { "Auto", "Fahren" }));
            oMax.lEntries.Add(new Entry(new DateTime(1995, 5, 3), "Heute war ich Baden.\nJuhuu", "No Image", new List<string> { "Baden", "Freude" }));
            oMax.lEntries.Add(new Entry(new DateTime(1995, 5, 4), "Scheiss Tag.\nJuhuu", "No Image", new List<string> { "Scheisse", "Kacke" }));

            // Create GUI and load Login Screen
            oInterface = new GUI();
            oInterface.LoginScreen();
            // Run 
            Application.Run();
        }
    }

    public class Entry
    {
        // Initialize Properties
        public DateTime dDateOfEntry;
        public string sContent = "";
        public string sImage = "";
        public List<string> lIdentifiers = new List<string>();

        // Constructor
        public Entry(DateTime tmp_dDateOfEntry, string tmp_sContent, string tmp_sImage, List<string> tmp_lIdentifiers)
        {
            dDateOfEntry = tmp_dDateOfEntry;
            sContent = tmp_sContent;
            sImage = tmp_sImage;
            lIdentifiers = tmp_lIdentifiers;
        }
    }


    public class User
    {
        // Initialize Propertiers
        public string sUsername = "";
        public string sPassword = "";
        public List<Entry> lEntries = new List<Entry>();

        // Constructor
        /* No Entries are added to the list upon instantiation */
        public User(string tmp_sUsername, string tmp_sPassword)
        {
            sUsername = tmp_sUsername;
            sPassword = tmp_sPassword;
        }
    }


    class GUI
    {
        // Properties
        Window oWindow;

        // Constructor
        public GUI()
        {
            Application.Init();
            var oTop = Application.Top;

            // Create new Window Instance
            oWindow = new Window(new Rect(0, 1, oTop.Frame.Width, oTop.Frame.Height - 1), "Diarynator 2000");

            oWindow.ColorScheme = Colors.Dialog;

            oTop.Add(oWindow);

            // Creates a menubar, the item "New" has a help menu.
            var menu = new MenuBar(new MenuBarItem[] {});
            oTop.Add(menu);
        }

        // Methods 

        // Method: Load Login Screen 
        public void LoginScreen()
        {
            // Clear Screen
            oWindow.RemoveAll();

            // "Log Off" the Active User
            Globals.oActiveUser = null;

            // Create & Layout Controls
            var uiUsernameLabel = new Label(3, 2, "Login: ");
            var uiUsername = new TextField(14, 2, 40, "");
            var uiPasswordLabel = new Label(3, 4, "Password: ");
            var uiPassword = new TextField(14, 4, 40, "");
            var uiLoginButton = new Button(3, 6, "Ok");
            var uiLoginLabel = new Label(3, 8, "");

            // Add Button Logic (User Login)
            uiLoginButton.Clicked = () =>
            {
                foreach (var User in Globals.lUsers)
                {
                    if (User.sUsername == uiUsername.Text)
                    {
                        if (User.sPassword == uiPassword.Text)
                        {
                            // Successful Login, render OverviewScreen
                            Globals.oActiveUser = User;
                            this.OverviewScreen(User);
                        }
                    }
                }

                // Invalid Login Credentials
                uiLoginLabel.Text = "Wrong Credentials. Try again";
                uiLoginLabel.TextColor = Application.Driver.MakeAttribute(Color.White, Color.Red);
                Application.Refresh();
            };

            // Add controls to Window
            oWindow.Add(uiUsernameLabel, uiUsername, uiPasswordLabel, uiPassword, uiLoginButton, uiLoginLabel);

            // Refresh
            Application.Refresh();
        }

        // Method: Load Overview Screen
        public void OverviewScreen(User tmp_oUser)
        {
            // Clear Screen
            oWindow.RemoveAll();

            // Create & Layout Controls
            var uiAddEntryButton = new Button(3, 1, "+ Add New Entry");
            var uiLogOffButton = new Button(3, 2, "Log Off");
            var uiEntriesLabel = new Label(3, 4, "All Entries of <" + tmp_oUser.sUsername + ">:");
            var uiDashLabel = new Label(3, 5, "---------------------------------------------------------------");
            uiAddEntryButton.Clicked = () => { this.NewEntryScreen(); };
            uiLogOffButton.Clicked = () => { this.LoginScreen(); };

            // Add controls to Window
            oWindow.Add(uiAddEntryButton);
            oWindow.Add(uiLogOffButton);
            oWindow.Add(uiEntriesLabel);
            oWindow.Add(uiDashLabel);
            for (var i = 0; i < tmp_oUser.lEntries.Count; i++)
            {
                // Add Button for each Entry
                var u = new Button(3, 6 + i, tmp_oUser.lEntries[i].dDateOfEntry.ToString() + " " + string.Join(" ", tmp_oUser.lEntries[i].lIdentifiers));
                var n = i;

                // Show Entry in ViewEntryScreen when clicked
                u.Clicked = () => { this.ViewEntryMessagebox(tmp_oUser.lEntries[n]); };

                oWindow.Add(u);
            }

            // Refresh Screen
            Application.Refresh();
        }

        // Method: Load ViewEntry Messagebox
        public void ViewEntryMessagebox(Entry tmp_oEntry)
        {
            var m = MessageBox.Query(50, 20, tmp_oEntry.dDateOfEntry.ToString(),
                                     tmp_oEntry.sContent + "\n \n" + string.Join(", ", tmp_oEntry.lIdentifiers),
                                     "Close");
        }

        // Method: Load NewEntry Screen
        public void NewEntryScreen()
        {
            // Clear Screen
            oWindow.RemoveAll();

            // Create & Layout Controls
            var uiDateLabel = new Label(3, 1, "Date of Entry:");
            var uiDateTextField = new TextField(20, 1, 40, DateTime.Now.ToString());

            var uiContentLabel = new Label(3, 3, "Content:");
            var uiContentTextField0 = new TextField(20, 3, 70, "");
            var uiContentTextField1 = new TextField(20, 4, 70, "");
            var uiContentTextField2 = new TextField(20, 5, 70, "");
            var uiContentTextField3 = new TextField(20, 6, 70, "");
            var uiContentTextField4 = new TextField(20, 7, 70, "");
            var uiContentTextField5 = new TextField(20, 8, 70, "");

            var uiIdentifiersLabel = new Label(3, 10, "Identifiers:");
            var uiIdentifiersTextField0 = new TextField(20, 10, 20, "");
            var uiIdentifiersTextField1 = new TextField(20, 12, 20, "");
            var uiIdentifiersTextField2 = new TextField(20, 14, 20, "");

            var uiImageLabel = new Label(3, 16, "Image:");
            var uiImageTextField = new TextField(14, 16, 60, "No Image");

            var uiSaveEntryButton = new Button(3, 18, "Save Entry");
            var uiInvalidInputLabel = new Label(3, 20, "Invalid Input. The first Identifier and the first Content Row cannot be empty!");

            // Add Button Logic
            uiSaveEntryButton.Clicked = () =>
            {
                // Validate Input for new Entry
                if (uiIdentifiersTextField0.Text == "" || uiContentTextField0.Text == "")
                {
                    // Add Error Label if User Input is invalid
                    oWindow.Add(uiInvalidInputLabel);
                    uiInvalidInputLabel.TextColor = Application.Driver.MakeAttribute(Color.White, Color.Red);
                    Application.Refresh();
                }
                else
                {
                    Entry oNew = new Entry(Convert.ToDateTime(uiDateTextField.Text),
                           uiContentTextField0.Text.ToString() + "\n" + uiContentTextField1.Text.ToString() + "\n" +
                           uiContentTextField2.Text.ToString() + "\n" + uiContentTextField3.Text.ToString() + "\n" +
                           uiContentTextField4.Text.ToString() + "\n" + uiContentTextField5.Text.ToString(),
                           uiImageTextField.Text.ToString(),
                           new List<string> { uiIdentifiersTextField0.Text.ToString(),
                                                          uiIdentifiersTextField1.Text.ToString(),
                                                          uiIdentifiersTextField2.Text.ToString() });
                    // Add new Entry to ActiveUser                 
                    Globals.oActiveUser.lEntries.Add(oNew);

                    // Load OverviewScreen
                    this.OverviewScreen(Globals.oActiveUser);
                }
            };
            
            // Add Controls to Window
            oWindow.Add(uiDateLabel);
            oWindow.Add(uiDateTextField);
            oWindow.Add(uiContentLabel);
            oWindow.Add(uiContentTextField0);
            oWindow.Add(uiContentTextField1);
            oWindow.Add(uiContentTextField2);
            oWindow.Add(uiContentTextField3);
            oWindow.Add(uiContentTextField4);
            oWindow.Add(uiContentTextField5);
            oWindow.Add(uiIdentifiersLabel);
            oWindow.Add(uiIdentifiersTextField0);
            oWindow.Add(uiIdentifiersTextField1);
            oWindow.Add(uiIdentifiersTextField2);
            oWindow.Add(uiImageLabel);
            oWindow.Add(uiImageTextField);
            oWindow.Add(uiSaveEntryButton);

            // Refresh Screen
            Application.Refresh();
        }
    }
}
