using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace scl_template_pattern_cs
{
    class Program
    {
        static void Main(string[] args)
        {
            Bäärner Sepp  = new Puur();
            Bäärner Küsu  = new Beck();
            Bäärner Fitim = new Gipser();

            Sepp.Tagesablouf();
            Küsu.Tagesablouf();
            Fitim.Tagesablouf();

            Console.ReadLine();
        }
    }

    /* Herzstück des Template Pattern: Eine Abstrakte Klasse mit
     * den benötigten Methoden Hooks (Wie beim Interface: der vorgegebene Name der Methode)
     */
    abstract class Bäärner
    {
        public abstract string Ufwachä();
        public abstract string Zmörgele();
        public abstract string Bügle();
        public abstract string Znachte();
        public abstract string Pennä();

        /* Template Methode */
        public void Tagesablouf()
        {
            string sArbeitstag = "";

            sArbeitstag += Ufwachä();
            sArbeitstag += Zmörgele();
            sArbeitstag += Bügle();
            sArbeitstag += Znachte();
            sArbeitstag += Pennä();

            Console.WriteLine(sArbeitstag);
        }
    }

    class Puur : Bäärner
    {
        public override string Ufwachä() 
        {
            return "Dr durchschnittlech Puur \n...Steit am 5i am Morgä uf. \n";
        }

        public override string Zmörgele()
        {
            return "...När zmörgeleter hurti. Öbbe ä Chauti Plattä und es Glas Miuch. \n";
        }

        public override string Bügle()
        {
            return "...U när bügleter winä Pickte bises ume fiischter wird. \n";
        }

        public override string Znachte()
        {
            return "...När gitz Znacht. Öbbe ä grobi Ladig Gschwellti und es Glas Miuch. \n";
        }

        public override string Pennä()
        {
            return "...U de isch scho ume Fyrabe. U zwar scho am 9i am Abä, wüuer huere uf dr Schnurre isch. \n";
        }
    }

    class Beck : Bäärner
    {
        public override string Ufwachä()
        {
            return "Dr durchschnittlech Beck \n...Steit am 3i am Morgä uf. \n";
        }

        public override string Zmörgele()
        {
            return "...När zmörgeleter hurti. Öbbe es Gipfeli und ä Fingerhuet Orangschesaft \n";
        }

        public override string Bügle()
        {
            return "...U när bügleter bis am 3 am Nami. \n";
        }

        public override string Znachte()
        {
            return "...När gitz Znacht. Öbbe ä Pfanne Röschti und es Glas Rote. \n";
        }

        public override string Pennä()
        {
            return "...U de isch scho ume Fyrabe. U zwar scho am 6i am Abä, wüuer ume huere früeh uf mues. \n";
        }
    }

    class Gipser : Bäärner
    {
        public override string Ufwachä()
        {
            return "Dr durchschnittlech Gipser \n...Steit öbbe am 7i am Morgä uf. \n";
        }

        public override string Zmörgele()
        {
            return "...När zmörgeleter hurti. Öbbe es Redbull und ä Ziggi. \n";
        }

        public override string Bügle()
        {
            return "...U när bügleter lescheeer bis am 5i.\n";
        }

        public override string Znachte()
        {
            return "...När gitz Znacht. Öbbe drei Bierli oder paar meh. \n";
        }

        public override string Pennä()
        {
            return "...U de isch scho ume Fyrabe. U zwar so am 11i am Abä. \n";
        }
    }
}

