# Ragbag
## Ender 3 VREF for TMC2130
### Formulas
What | Formula
--- | ---
Root Mean Squared (RMS) |  I<sub>max</sub> / sqrt(2)
V<sub>ref</sub> | (I<sub>rms</sub> * 2.5V) / 1.77A

### Calculation for Ender 3
V<sub>ref</sub> X, Y, Z   =   0.842V
V<sub>ref</sub> E         =   1.000V

V<sub>ref</sub> X, Y, Z   =   0.842V * 90% = **0.760V**
V<sub>ref</sub> E         =   1.000V * 90% = **0.900V**

---

# Ender 3 Electrical Cabinet
## To Do
As of 28.02.2019
### Wiring
* [ ] Wire Cabinet Cover Earthing (1.5q, M8)
* [ ] Wire Cabinet Main Earthing (1.5q, M8)
* [ ] Wire Cabinet Plate Earthing (1.5q, M6)

### Wiring & Installation (in Cabinet)
* [ ] Install & Wire Clamp Blocks

Amount | Type | What For
--- | --- | ---
2 | Grey, 2.5q | Line
2 | Blue, 2.5q | Neutral
2 | GNYE, 2.5q | Earth
9 | Grey, 2.5q | 24VDC, SW24VDC, 5VDC
9 | Grey, 2.5q | GND1, GND2, GND3
2 | Bridge, 2x | Line, Neutral
6 | Bridge, 3x | All DC Voltages & GNDs
4 | Endplates  | Cl-Block 1 & 2
4 | Clamp Stops | Cl-Block 1 & 2

* [ ] Install & Wire
* [ ] Install & Wire Cabinet Fans (120x120)
* [ ] Install & Wire Harting Connectors
* [ ] Install & Wire 5V 3A PSU
* [ ] Install & Wire OctoPi
* [ ] Install & Wire GPIO Relay Board for SW24VDC
* [ ] Install & Wire kWh Counter
* [ ]


### Materials & Tools which are missing
- Jigsaw with Metalcutting Blade
- Harting Crimping Pliers
- Cableshoe Crimping Pliers

- USB WiFi Dongle
- USB Feedtrough for electrical Cabinets
- 5V PSU (Meanwell DR15)
-

---

# Upgrades Ender 3 Pro

## Basic Upgrades
* [X] Print LCD back cover
* [X] Print part cooling duct
* [X] Print filament guides

## Noise Upgrades
### Fans
* [X] Meanwell LRS 350-24 Cooling Fan (40x40):  **12** V
* [X] Partcooling fan: 5015 fan                 **24** V
* [X] Hot end fan: NF-A4x20                     **12** V
### Axes
* [X] TMC2130 drivers                   4pcs
* [X] MKS Gen L Controller


## Ragbag Upgrades
* [X] BLTouch automatic bed leveling

## Nylon / Polycarbonate printing
Needs 300+ Degrees C. Micro Swiss hot end is **crucial** since it has a titanium heatbreak. The Ender 3 Pro factory hot end doesn't have that. The PTFE bowden tube could melt and give off **toxic** fumes!
### Prerequisities
* [ ] Micro Swiss hot end
* [ ] Type K thermocouple (Not compatible with Melze) + breakout board
* [ ] Disable part cooling
* [ ] Probably an enclosure for the printer
* [ ] Dry filament. Dry the filament with perforated spools and wind loosly.
