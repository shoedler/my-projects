                            ; Ender 3 Pro Custom Start G-code
OCTO901                     ;
M190 S65                    ; Wait for bed Temp
M109  S205                  ; Wait for Nozzle Temp
G28                         ; Home all axes
G29 E                       ; Auto bed leveling
G92 E0                      ; Reset Extruder
G1 Z2.0 F3000               ; Move Z Axis up a little to prevent scratching of Heat Bed
G1 Y30 F5000                ;
G1 X0.1 Z0.3 F5000.0        ; Move to start position
G1 X0.1 Y200.0 F1500.0 E15  ; Draw the first line
G1 X0.4 Y200.0  F5000.0     ; Move to side a little
G1 X0.4 Y100  F1500.0       ; Draw the second line
G92 E0                      ; Reset Extruder
                            ; End of custom start GCode
