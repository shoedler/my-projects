# Prerequisities
None


# Info
- Every bird has it's own NN
- NN architecture:
  - Inputs:
    - y location of bird
    - x location of closest pipe
    - y location of pipe's top
    - y location of pipe's bottom
    - y velocity of bird normalized
  - Hidden Layers:
    - 8
  - Outputs:
    - 2

# Open Points
* [x] load JSON of bird brain via browser
* [ ] fix load brain functions to apply to NN
* [x] move save brain to next gen, activate with flag
* [ ] make bird death visually notable
