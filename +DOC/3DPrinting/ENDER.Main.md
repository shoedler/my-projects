# Ragbag
## Ender 3 VREF for TMC2130
Root Mean Squared (RMS)   = `Imax / sqrt(2)`

Vref                      = `(Irms * 2.5V) / 1.77A`

Equals to:

X, Y, Z                   = 0.842V
E0:                       = 1.000V

Times 90%:

**X, Y, Z                 = 0.760V**
**E0:                     = 0.900V**

## To Do
* [ ] GPIO Relay Board -> RPi

# Upgrades Ender 3 Pro

## Basic Upgrades
* [ ] Print LCD back cover
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


## Intermediate Upgrades
* [X] BLTouch automatic bed leveling

## Nylon / Polycarbonate printing
Needs 300+ Degrees C. Micro Swiss hot end is **crucial** since it has a titanium heatbreak. The Ender 3 Pro factory hot end doesn't have that. The PTFE bowden tube could melt and give off **toxic** fumes!
### Prerequisities
* [ ] Micro Swiss hot end
* [ ] Type K thermocouple (Not compatible with Melze) + breakout board
* [ ] Disable part cooling
* [ ] Probably an enclosure for the printer
* [ ] Dry filament. Dry the filament with perforated spools and wind loosly.
