# Atom - Styles
### Ergänzungen fürs ```styles.less```
Dazu ```Ctrl+Shift+P``` > "styles" eintippen > "Application: Open your stylesheet" anklicken / **ENTER**.
Der gewünschte, folgende Code aus dem Markdownpreview (```Ctrl+Shift+M```) kopieren und dort einfügen.

---
## Modern, Dunkel
* UI Theme:     **One Dark**
* Syntax Theme: **One Dark**
* Ergänzungen ```styles.less``` :
Dazu muss nichts ergänzt werden im styles.less, dies ist der Standard.
---

## Modern, Hell
* UI Theme:     **One Light**
* Syntax Theme: **One Light**
* Ergänzungen ```styles.less``` :
```
/* Style StuderLAD elements - Bright, Modern.
Goto http://hslpicker.com/#156b0f for a good hsl color picker */
atom-text-editor.editor {
  // Keywords 1 (#define, #ifdef...)
  .syntax--keyword.syntax--lad {color: hsl(304, 60%, 47%);}
  // Keywords 2 (RD, OR, NOT...)
  .syntax--punctuation.syntax--definition.syntax--identity.syntax--lad {color: hsl(223, 79%, 40%);}
  // Keywords 3 (SET, PMC_ADR_BYTE...)
  .syntax--variable.syntax--lad {color: hsl(2, 73%, 48%);}
  // Strings & Numeric
  .syntax--string.syntax--lad {color: hsl(26, 33%, 25%);}
  // Comments
  .syntax--comment.syntax--block.syntax--lad {color: hsl(92, 39%, 47%);}
}
````
---

## MED CX Look
* UI Theme:     **One Light**
* Syntax Theme: **Base16 Tomorrow Light** / **One Light**
* Ergänzungen ```styles.less``` :
```
/* style StuderLAD elements - Bright, OLD SCHOOL.
Goto http://hslpicker.com/#156b0f for a good hsl color picker */
atom-text-editor.editor {
  // Keywords 1 (#define, #ifdef...)
  .syntax--keyword.syntax--lad {color: hsl(272, 100%, 38%);}
  // Keywords 2 (RD, OR, NOT...)
  .syntax--punctuation.syntax--definition.syntax--identity.syntax--lad {color: hsl(232, 86%, 50%);}
  // Keywords 3 (SET, PMC_ADR_BYTE...)
  .syntax--variable.syntax--lad {color: hsl(0, 100%, 47%);}
  // Strings & Numeric
  .syntax--string.syntax--lad {color: hsl(125, 93%, 36%);}
  // Comments
  .syntax--comment.syntax--block.syntax--lad {color: hsl(113, 100%, 38%);}
}
```
