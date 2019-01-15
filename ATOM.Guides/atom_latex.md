# Atom - LaTeX
Dank packages ist es mˆglich, LaTeX direkt in Atom zu bearbeiten und kompilieren.
Hier eine kurze Anleitung

## Vorweg
Getestet in Atom 1.34.0
Getestet mit TeX-Live Build vom 14.01.2019

## Voraussetzungen
- Eine TeX Distro muss installiert / vorhanden sein. Folgende TeX-Dsitro wird empfohlen (TeX-Live) -> Download https://www.tug.org/texlive/acquire-netinstall.html
  - Installation von *texlive*:
      - Option **"TeXworks als Frontend verwenden"** abw‰hlen
      - Option **"F¸r alle Benutzer installieren"** abw‰hlen

- Folgende Atom Packages sind notwendig:
  - https://atom.io/packages/latex
  - https://atom.io/packages/language-latex

## Installation
1. Voraussetzungen erf¸llen
2. Atom > latex Package Einstellungen > TeX Path eingeben:
  `..\texlive\2018\bin\win32`
  - Die Option **"Build on save"** ist empfehlenswert
3. Fertig! Um die Integration zu testen, den Beispielcode aus **Resourcen**
kopieren und in ein `file.tex` kopieren. Nun kann - entweder durch speichern
wenn die obige Option angew‰hlt wurde, oder durch `Ctrl + Shift + P`
und dann `build` eintippen > `Latex: Build` anw‰hlen - das Testfile
gebuildet werden.

## Resourcen
Mehr ¸ber LaTeX in Atom (knitr, Agda, Haskell, Pweave):
https://atom.io/packages/latex **-> README.md**

Beispielcode:
```
% !TEX TS-program = pdflatex
\documentclass[a4paper]{article}
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage{mathtools}

\title{LaTeX Beispiel}
\author{ssc}
\date{15.01.2019}

\begin{document}

\maketitle
\tableofcontents

\section{Einf√ºhrung}

  Hier eine kurze \textit{Einf√ºhrung}
  Die \textbf{√úberschrift} wird automatisch im Inhaltsverzeichnis
  aufgelistet.
  --Willkommen bei \LaTeX{}!

\subsection{Eine Auflistung}
    \begin{description}
        \item [UI]      Atom One Dark UI
        \item [Syntax]  Atom One Dark Syntax
        \item [Font]    Consolas
    \end{description}

  Gleichung ~\eqref{eq:gauss} ist ein \emph{Gaussches Integral}

    \begin{equation}
        \int_{-\infty}^{\infty}\exp(-x^2)\,dx = \sqrt{\pi} \label{eq:gauss}
    \end{equation}

\end{document}
```
