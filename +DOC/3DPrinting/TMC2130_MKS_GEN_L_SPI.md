# MKS GEN L v1.0
#### Mit TMC2130 SPI Mode [ENDER 3]
---
#### Tipps
Tipps für TMC M-Befehle: Suche in der MARLIN gcode Reference nache "TMC" um alle
relevanten zu finden.
[TMC Mode-Wechsel M-Befehl](http://marlinfw.org/docs/gcode/M569.html)

M122 ist der wichtigste Trinamic M-Befehl. Der Output der Register darf nicht `0x00000000` oder `0xFFFFFFFF` sein
Siehe auch der [Troubleshooting Bereich der offiziellen MARLIN Trinamic Seite](http://marlinfw.org/docs/hardware/tmc_drivers.html).

---
#### Vorbereitungen
##### Hardware
* MKS GEN L v1.0 Verkabelung gemäss diesem [PDF](https://cdn.thingiverse.com/assets/a6/03/31/95/98/MKS_Gen-L_TMC2130_SPI_Sensor-less_Homing_Wiring_Diagram.pdf)
* Die TMC2130 müssen im SPI Mode sein. Für z.B. die BIQU TMC2130 v1.1 ist [dies](https://www.biqu.equipment/products/biqu-bigtreetech-tmc2100-2208-2130-v1-0-stepstick-mks-stepper-motor-driver-ultra-silent) die Anleitung, welche Brücken gesetzt / entfernt werden müssen um den SPI Mode anzuwählen.
*(Meistens: CFG4 / CGF5 auf GND oder VCC & R5 entfernen)*

##### Firmware
* [Marlin 1.1.x Vanilla](https://github.com/MarlinFirmware/Marlin/archive/1.1.x.zip) verwenden
* `Marlin.ino` öffnen und die Einstellungen des Ender 3 `Configuration.h` & `Configuration_adv.h` Presets hineinmergen

##### Arduino IDE
* U8glib Library installiert von **Oliver**
* TMCStepper Library installiert von **teemuatlut**
* TMC2130Stepper Library installiert von **teemuatlut**

---
#### Änderungen
*Ender 3 spezifische Änderungen werden hier nicht gelistet. Ausser die Stepper Directions (INVERT_...)*
##### Configuration.h
Variable | Aktion
---|---
`CR10_STOCKDISPLAY` | einkommentiert
`X_DRIVER_TYPE` | `TMC2130` (nicht `TMC2130_STANDALONE`)
`Y_DRIVER_TYPE`| `TMC2130` (nicht `TMC2130_STANDALONE`)
`Z_DRIVER_TYPE`	| `TMC2130` (nicht `TMC2130_STANDALONE`)
`E0_DRIVER_TYPE` | `TMC2130` (nicht `TMC2130_STANDALONE`)
`INVERT_X_DIR` | auf `true` gesetzt
`INVERT_Y_DIR` | auf `true` gesetzt
`INVERT_Z_DIR` | auf `false` gesetzt
`X_MIN_ENDSTOP_INVERTING` | auf `true` gesetzt
`Y_MIN_ENDSTOP_INVERTING` | auf `true` gesetzt

##### Configuration_adv.h
Variable | Aktion
---|---
`E0_AUTO_FAN_PIN`  | als `7` definiert
`REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER` | einkommentiert
`TMC_DEBUG` | einkommentiert


---
#### Todo:
Steps/mm prüfen für
* [ ] X-Achse
* [ ] Y-Achse
* [ ] Z-Achse
* [ ] Extruder

StallGuard einstellen (geht anscheinend nur in SpreadCycle Mode) für
* [ ] X-Achse
* [ ] Y-Achse

* [ ] Extruder flicken
