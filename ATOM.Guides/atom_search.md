# Atom - Mastering optimized searching
### Die Möglichkeiten mit Regulären Ausdrücken (REGEX)
---

Alle Merge-Tags entfernen (Öffnende & Schliessende) ```<<<<<<< HEAD```;
Folgender REGEX in das Suchen und Ersetzen Panel (Standardmässig ```Ctrl+F```)
einsetzen > Nichts einfügen bei "Replace" > "Replace All"
```
(<<<<<<< HEAD)|(>>>>>>>\s)(.*$)
```

* **Capturegroup** 1 = ```<<<<<<< HEAD```
* **Capturegroup** 2 = ```>>>>>>>``` **und** ein Whitespacecharakter
* **Capturegroup** 3 = Alle Charakter bis EOL (End of line).

---

Suche nach ```ALADGK``` oder ```ALADWE```
```
ALADWE|ALADGK
```

* **Capturegroup** 1 = ```ALADWE``` oder ```ALADGK``` *(Beispiel)*

---
Suche nach ```MCMD(60)```, ```MCMD_IMP(60)``` oder ```MCMD_DOING(60)```
```
(MCMD)(\(|_IMP\(|_DOING\()(60\))
```
* **Capturegroup** 1 = ```MCMD```
* **Capturegroup** 2 = ```(``` oder ```_IMP(``` oder ```_DOING(```
* **Capturegroup** 3 = ```60)``` *(Beispiel)*

**Achtung**: Man darf nicht vergessen, dass dies nicht Codestellen
findet wo die MCMD Nummern auf lokale Variablen definiert werden. Z.B. M-Befehl 151 in ```fc62215.lad``` welcher im Modulheader als ```#define KM_ON      115``` definiert wird und als ```MCMD(KM_ON)``` aufgerufen wird.

---
Suche jede Zeile wo ```EWST_ERKANNT``` gelesen (```RD```), ```OR```-verlinkt , ```AND```-verlinkt, oder deren negierten (```.NOT```) Varianten sowie die (```.STK```) Varianten davon.

```
(RD|OR|AND)(\s|\.NOT)(\s|\.STK)(\s*?)(EWST_ERKANNT)
```

* **Capturegroup** 1 = ```RD``` oder ```OR``` oder ```AND```
* **Capturegroup** 2 = ein Whitespacecharakter **oder** ```.NOT```
* **Capturegroup** 3 = ein Whitespacecharakter **oder** ```.STK```
* **Capturegroup** 4 = Ein, oder mehrere Whitespacecharakter
* **Capturegroup** 5 = ```EWST_ERKANNT``` *(Beispiel)*
---
Suche jede Zeile wo ```ARBA1R``` geschrieben wird (und nicht geschrieben),
gesetzt oder rückgesetzt

```
(RESET|SET|WRT|WRT\.NOT)(\s*?)(ART_BAND1_AP)
```

* **Capturegroup** 1 = ```RESET```, ```SET```, ```WRT``` oder ```WRT.NOT```
* **Capturegroup** 2 = Ein, oder mehrere Whitespacecharakter
* **Capturegroup** 3 = ```ART_BAND1_AP``` *(Beispiel)*
---
Suche nach jeder Zahl   

```
(\d+)
```

* **Capturegroup** 1 = Irgendeine Zahl
---
Suche nach jeder R-Speicher Definition in einem bestimmten Zahlenbereich.

```
(R)(6[0-3][0-9][0-9])(\.\d|\s)
```

* **Capturegroup** 1 = Buchstabe ```R```
* **Capturegroup** 2 = 6, danach 0-3, danach 0-9, danach 0-9 (= 6000 - 6399) *(Beispiel)*
* **Capturegroup** 3 = Symbol ```.``` **und** irgendeine Zahl **oder** ein Whitespacecharakter
---
Suche jeden Befehl wo ```CUSTOM_OUT``` in ```ACUSTOM_OUTPUT1``` kopiert wird.

```
(COPY\_)(BYTE|XBYTE|WORD|DWORD)(\()(byte:.|.)(USTOM_OUT.*?)(byte:.|.)(CUSTOM_OUTPUT1.)
```
* **Capturegroup** 1 = ```COPY_```
* **Capturegroup** 2 = ```BYTE```, ```XBYTE```, ```WORD``` oder ```DWORD```
* **Capturegroup** 3 = ```(```
* **Capturegroup** 4 = ```byte:``` + irgendein Charakter **oder** **nur** irgendein Charakter
* **Capturegroup** 5 = ```USTOM_OUT``` *(Beispiel)* + irgendein Charakter bis zur nächsten Capturegroup
* **Capturegroup** 6 = ```byte:``` + irgendein Charakter oder nur irgendein Charakter
* **Capturegroup** 7 = ```CUSTOM_OUT1``` *(Beispiel)* + irgendein Charakter

**Achtung**: Wenn man überprüfen möchte, ob die Variablen anders herum geschrieben
werden, muss man manuell die Variablen ```USTOM_OUT``` und ```CUSTOM_OUTPUT1``` umkehren.
