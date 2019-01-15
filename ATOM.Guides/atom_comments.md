# Atom - Comment Tags
### Kommentieren wie ein Profi
---
Dank der Integration der Comment-Tags kann bei Arbeiten mit vielen Unterbrüchen das Leben eines Entwicklers extrem vereinfacht werden.

**Achtung**: Die Comment Tags sind nur in `/* Kommentar */` Kommtentaren verfügbar. `// Kommentar` Kommentare sind nicht zulässig.

Regex um Code auf Tags zu checken:

```
(\s)(TODO|FIXME|CHANGED|XXX|IDEA|HACK|NOTE|REVIEW|NB|BUG|QUESTION|COMBAK|TEMP|DEBUG|OPTIMIZE|WARNING)(\s)
```
---

Sehr hilfreiches Tag zum markieren offener Punkte
```
TODO
```     
Tag für nicht funktionierende Codeabschnitte
```
FIXME
```     
Tag für geänderten Code. Schafft Übersicht und kann Verwirrung verhindern. ...Wieso wurde dass schon wieder geändert?
```
CHANGED
```
Tag für verbotene, schlechte Lösungen
```
XXX
```
Tag für absolut geniale Ideeen
```
IDEA
```
Tag für 'gehacke' Codeabschnitte. Gut in Kombination mit dem WARNING Tag
```
HACK
```
Tag für Notizen, siehe auch NB
```
NOTE
```
Tag für Review Punkte. Sehr empfehlenswert. So kann ein Review sehr effizient durchgeführt werden.
```
REVIEW
```
Tag für "Nota Bene" oder auch Notiz
```
NB
```
Tag für Bugs
```
BUG
```
Tag für Fragen, empfehlenswert in Kombination mit Review Tag
```
QUESTION
```
Das Comeback Tag, wird verwendet wenn plötzlich etwas "wichtigeres" von einem Entwickler verlangt wird und man danach gerne wieder wissen möchte, wo man aufgehört hat mit Programmieren.
```
COMBAK
```
Der Favorit, das Tag für temporäre Lösungen. Achtung, löscht sich von selbst nach 15 Jahren
```
TEMP
```
Das Debug Tag wird verwendet um Debugging Hilfsmittel im Code zu kennzeichnen, z.B. bei einem Debugmerker
```
DEBUG
```
Das Optimize Tag wird verwendet wenn man genau weiss das man den gerade programmierten Codeabschnitt noch effizienter und besser gestalten könnte - irgendwann in der Zukunft.
```
OPTIMIZE
```
Und zum Schluss das Warning Tag. Viel zu sagen gibts nicht, anzuwenden bei Lösungen wo man selbt nicht weiss wieso sie funktionieren. Empfehlenswert bei allen Klapparatismen mit PARAYYY.
```
WARNING
```
